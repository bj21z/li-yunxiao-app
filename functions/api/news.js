const QUERIES=['李云霄','李云霄 九斤姑娘','浙江小百花 李云霄','李云霄 演出','李云霄 采访'];
const decode=s=>String(s||'').replace(/<!\[CDATA\[|\]\]>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const text=(block,tag)=>decode((block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`,'i'))||[])[1]||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const parse=xml=>[...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map(m=>{const b=m[1];return {title:text(b,'title'),url:text(b,'link'),desc:text(b,'description'),source:text(b,'News:Source')||text(b,'source')||'公开网络',date:new Date(text(b,'pubDate')).toISOString().slice(0,10),category:'全网线索',tier:'B'}}).filter(x=>x.title&&x.url);
export async function onRequestGet(){
 const all=[];
 await Promise.all(QUERIES.map(async q=>{try{const u='https://www.bing.com/news/search?format=rss&setlang=zh-cn&q='+encodeURIComponent(q);const r=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0'}});if(r.ok) all.push(...parse(await r.text()));}catch{}}));
 const seen=new Set(); const items=all.filter(x=>{const k=x.title.replace(/\s/g,'');if(seen.has(k))return false;seen.add(k);return true}).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,40);
 return new Response(JSON.stringify({updatedAt:new Date().toISOString(),checkedAt:new Date().toISOString(),version:'live',items}),{headers:{'content-type':'application/json;charset=UTF-8','cache-control':'public,max-age=900','access-control-allow-origin':'*'}});
}
