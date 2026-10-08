import { readFileSync, mkdirSync, writeFileSync, readdirSync, cpSync } from 'node:fs';
import { extname, join } from 'node:path';
const textTypes={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml'};
const imageTypes={'.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.avif':'image/avif'};
const assets={};
function collect(directory,prefix=''){
 for(const entry of readdirSync(directory,{withFileTypes:true})){
  const filename=join(directory,entry.name),url=prefix+'/'+entry.name;
  if(entry.isDirectory()){collect(filename,url);continue;}
  const ext=extname(entry.name).toLowerCase(),type=textTypes[ext]||imageTypes[ext];
  if(!type)continue;
  assets[url]={type,body:readFileSync(filename,imageTypes[ext]?'base64':'utf8'),...(imageTypes[ext]?{binary:true}:{})};
 }
}
collect('public');
mkdirSync('dist/server',{recursive:true});mkdirSync('dist/.openai',{recursive:true});
writeFileSync('dist/server/index.js','const ASSETS = '+JSON.stringify(assets)+';\n'+readFileSync('worker/index.js','utf8'));
cpSync('.openai/hosting.json','dist/.openai/hosting.json');
console.log('Built Aura frontend, photos and Worker backend.');
