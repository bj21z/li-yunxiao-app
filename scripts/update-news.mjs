import fs from 'node:fs/promises';
const queries=['李云霄','李云霄 九斤姑娘','浙江小百花 李云霄','李云霄 演出','李云霄 采访'];
const decode=s=>String(s||'').replace(/<!\[CDATA\[|\]\]>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const text=(b,t)=>decode((b.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)<\\/${t}>`,'i'))||[])[1]||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const all=[];for(const q of queries){try{const r=await fetch('https://www.bing.com/news/search?format=rss&setlang=zh-cn&q='+encodeURIComponent(q));const xml=await r.text();for(const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)){const b=m[1],title=text(b,'title'),url=text(b,'link');if(title&&url)all.push({date:new Date(text(b,'pubDate')).toISOString().slice(0,10),title,desc:text(b,'description'),source:text(b,'News:Source')||'公开网络',url,category:'全网线索',tier:'B'});}}catch{}}
const seen=new Set();const items=all.filter(x=>{const k=x.title.replace(/\s/g,'');if(seen.has(k))return false;seen.add(k);return true}).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,50);
const now=new Date().toISOString();await fs.writeFile('data/daily.json',JSON.stringify({updatedAt:now,checkedAt:now,version:now.slice(0,10),items},null,2));
