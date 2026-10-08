import { Miniflare } from 'miniflare';
import { readFileSync,readdirSync,mkdirSync } from 'node:fs';
const mf=new Miniflare({modules:true,script:readFileSync('dist/server/index.js','utf8'),compatibilityDate:'2024-12-01',d1Databases:{DB:'aura-local'},r2Buckets:['BUCKET'],bindings:{LOCAL_DEV:'1'},d1Persist:'.local-state/d1',r2Persist:'.local-state/r2',host:'127.0.0.1',port:8787});
const db=await mf.getD1Database('DB');
await db.prepare('CREATE TABLE IF NOT EXISTS aura_local_migrations (name TEXT PRIMARY KEY)').run();
for(const name of readdirSync('drizzle').filter(n=>n.endsWith('.sql')).sort()){if(await db.prepare('SELECT name FROM aura_local_migrations WHERE name = ?').bind(name).first())continue;for(const statement of readFileSync('drizzle/'+name,'utf8').split('--> statement-breakpoint').map(s=>s.trim()).filter(Boolean))await db.prepare(statement).run();await db.prepare('INSERT INTO aura_local_migrations (name) VALUES (?)').bind(name).run();}
console.log('Aura Studio Warsaw: '+await mf.ready);console.log('Studio dashboard: http://127.0.0.1:8787/admin');
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,async()=>{await mf.dispose();process.exit(0);});
