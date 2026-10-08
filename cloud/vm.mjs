import {Miniflare} from 'miniflare';
import {readFileSync,readdirSync,mkdirSync} from 'node:fs';
const state=process.env.DATA_DIR||'/data';mkdirSync(state,{recursive:true});
if(!process.env.PUBLIC_ORIGIN||!process.env.ADMIN_EMAILS)throw Error('PUBLIC_ORIGIN and ADMIN_EMAILS are required.');
const origin=new URL(process.env.PUBLIC_ORIGIN);if(origin.protocol!=='https:')throw Error('Production PUBLIC_ORIGIN must use HTTPS.');
// Nginx owns TLS and authentication. Only its loopback proxy can reach this port.
let script=readFileSync('dist/server/index.js','utf8');
script=script.replace('export async function handle(request,env){','export async function handle(request,env){if(env.PUBLIC_ORIGIN){const incoming=new URL(request.url);request=new Request(env.PUBLIC_ORIGIN+incoming.pathname+incoming.search,request);}');
script=script.replace('/signout-with-chatgpt?return_to=%2F','/').replace('Sign out</a>','Back to website</a>');
const mf=new Miniflare({modules:true,script,compatibilityDate:'2024-12-01',d1Databases:{DB:'aura-production'},r2Buckets:['BUCKET'],bindings:{PUBLIC_ORIGIN:origin.origin,ADMIN_EMAILS:process.env.ADMIN_EMAILS},d1Persist:state+'/database',r2Persist:state+'/photos',host:'0.0.0.0',port:Number(process.env.PORT||8787)});
const db=await mf.getD1Database('DB');await db.prepare('CREATE TABLE IF NOT EXISTS aura_local_migrations (name TEXT PRIMARY KEY)').run();
for(const name of readdirSync('drizzle').filter(n=>n.endsWith('.sql')).sort()){if(await db.prepare('SELECT name FROM aura_local_migrations WHERE name = ?').bind(name).first())continue;for(const statement of readFileSync('drizzle/'+name,'utf8').split('--> statement-breakpoint').map(s=>s.trim()).filter(Boolean))await db.prepare(statement).run();await db.prepare('INSERT INTO aura_local_migrations (name) VALUES (?)').bind(name).run();}
console.log('Aura production backend ready: '+await mf.ready);
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,async()=>{await mf.dispose();process.exit(0);});
