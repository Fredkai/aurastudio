import { readFileSync, mkdirSync, writeFileSync, readdirSync, cpSync } from 'node:fs';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml'};
const assets={};
for(const file of readdirSync('public')){const ext=file.slice(file.lastIndexOf('.'));if(types[ext])assets['/'+file]={type:types[ext],body:readFileSync('public/'+file,'utf8')};}
mkdirSync('dist/server',{recursive:true});mkdirSync('dist/.openai',{recursive:true});
writeFileSync('dist/server/index.js','const ASSETS = '+JSON.stringify(assets)+';\n'+readFileSync('worker/index.js','utf8'));
cpSync('.openai/hosting.json','dist/.openai/hosting.json');
console.log('Built Aura frontend and Worker backend.');
