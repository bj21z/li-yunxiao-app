const works=[['新龙门客栈','金镶玉 · 新国风环境式越剧'],['钱塘里','现实题材越剧 · 白玉兰新人主角奖'],['陈三两','吕派经典 · 水袖与人物张力'],['梁山伯与祝英台','经典传承 · 青春演绎']];
const interests=[['◌','吕派艺术','重视唱腔、人物气质与传统程式的当代表达。'],['水','水袖身段','以细腻身段承载人物情绪与舞台节奏。'],['剧','人物创造','公开采访中多次谈及从现代观众感受出发塑造角色。'],['花','传统新生','关注越剧守正创新，让更多年轻观众走进剧场。']];
const fallback=[
{date:'2026-07-20',title:'谈《九斤姑娘》的传承与突破',desc:'潮新闻采访：如何在经典人物中注入今天的生命感。',url:'https://tidenews.com.cn/video_detail.html?id=3506687'},
{date:'2026-06-24',title:'青春越剧《九斤姑娘》发布',desc:'浙江小百花越剧院重磅打造青春版经典。',url:'https://www.sina.cn/news/detail/5313364249018606.html'},
{date:'2026-01-18',title:'获评一级演员',desc:'公开报道显示，李云霄获一级演员任职资格。',url:'https://news.sina.cn/2026-01-18/detail-inhhthyx7728027.d.html'},
{date:'2024-11-14',title:'谈艺录：戏剧演员要有敏感力',desc:'采访分享她与传统戏剧艺术的缘分及表演思考。',url:'https://news.qq.com/rain/a/20241114A02EDA00'}];
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
$('#works').innerHTML=works.map(w=>`<article class="work"><div class="art"></div><div class="work-copy"><h3>${w[0]}</h3><p>${w[1]}</p></div></article>`).join('');
$('#interests').innerHTML=interests.map(x=>`<article class="interest"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join('');
function renderFeed(items,live=false){$('#feed').innerHTML=items.map(x=>`<article class="feed-item"><time>${x.date}</time><h3>${x.title}</h3><p>${x.desc}</p><a target="_blank" rel="noopener" href="${x.url}">阅读来源 →</a></article>`).join('');$('#feedStatus').textContent=live?'已连接公开新闻检索源':'当前显示已核验的内置动态；点击更新尝试联网检索。'}
async function refresh(){ $('#refreshBtn').disabled=true;$('#feedStatus').textContent='正在检索公开动态…';try{const q=encodeURIComponent('李云霄 越剧 when:30d');const u=`https://r.jina.ai/http://news.google.com/rss/search?q=${q}&hl=zh-CN&gl=CN&ceid=CN:zh-Hans`;const t=await fetch(u,{signal:AbortSignal.timeout(7000)}).then(r=>r.text());const rows=[...t.matchAll(/<item>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<link>(.*?)<\/link>[\s\S]*?<pubDate>(.*?)<\/pubDate>[\s\S]*?<\/item>/g)].slice(0,6).map(m=>({title:m[1].replace(/<!\[CDATA\[|\]\]>/g,''),url:m[2],date:new Date(m[3]).toLocaleDateString('zh-CN'),desc:'来自公开新闻聚合源，内容请以原始报道为准。'}));if(rows.length)renderFeed(rows,true);else throw 0}catch(e){renderFeed(fallback);$('#feedStatus').textContent='联网检索暂不可用，已回退到内置核验动态。'}finally{$('#refreshBtn').disabled=false}}
renderFeed(fallback);$('#refreshBtn').onclick=refresh;
$$('[data-go]').forEach(b=>b.onclick=()=>{const k=b.dataset.go;const target=k==='top'?document.body:k==='works'?$('#works'):k==='fan'?$('.fan-card'):$('#'+k);target.scrollIntoView({behavior:'smooth'});});
$('#themeBtn').onclick=()=>document.body.classList.toggle('dark');
$('#favBtn').onclick=()=>{const on=localStorage.getItem('fav')!=='1';localStorage.setItem('fav',on?'1':'0');$('#favBtn').textContent=on?'♥ 已收藏':'♡ 收藏'};if(localStorage.getItem('fav')==='1')$('#favBtn').textContent='♥ 已收藏';
const fortunes=['水袖起落，心有清风。','慢工守艺，自有回响。','今日宜听一段越韵。','台上一分钟，台下万千功。','花开有时，热爱长青。'];$('#fortuneBtn').onclick=()=>$('#fortune').textContent=fortunes[Math.floor(Math.random()*fortunes.length)];
let c=+(localStorage.getItem('check')||0);$('#checkCount').textContent=c+' 次';
const modal=$('#modal'),body=$('#modalBody');
function closeModal(){modal.hidden=true;document.documentElement.classList.remove('modal-open');document.body.classList.remove('modal-open')}
function openModal(){modal.hidden=false;document.documentElement.classList.add('modal-open');document.body.classList.add('modal-open')}
$('#closeModal').addEventListener('click',closeModal);
$('#closeModal').addEventListener('touchend',e=>{e.preventDefault();closeModal()},{passive:false});
modal.onclick=e=>{if(e.target===modal)closeModal()};
$$('[data-modal]').forEach(b=>b.onclick=()=>{const type=b.dataset.modal;if(type==='checkin'){c++;localStorage.setItem('check',c);$('#checkCount').textContent=c+' 次';body.innerHTML=`<h2>签到成功</h2><p>这是你在本机的第 <b>${c}</b> 次越韵签到。</p>`}if(type==='note'){body.innerHTML=`<h2>写一封云笺</h2><textarea id="noteArea" placeholder="写下你对舞台、角色或越剧的感受…">${localStorage.getItem('note')||''}</textarea><button class="action" id="saveNote">保存到本机</button>`;setTimeout(()=>$('#saveNote').onclick=()=>{localStorage.setItem('note',$('#noteArea').value);closeModal()},0)}if(type==='quiz'){body.innerHTML=`<h2>云霄小考</h2><p>李云霄主要工哪个行当？</p><button class="action" onclick="this.textContent='回答正确：花旦 ✓'">花旦</button><button class="action" style="background:#8e7d83" onclick="this.textContent='再想一想'">老生</button>`}if(type==='share'){body.innerHTML=`<h2>分享卡</h2><div style="padding:30px;border-radius:24px;background:linear-gradient(135deg,#70283b,#27131b);color:white;text-align:center"><small>云上小百花</small><h1 style="font-family:serif;font-size:48px">李云霄</h1><p>越韵新声 · 让传统被今天听见</p></div><p>可使用 iPhone 截图保存分享。正式版可接入 Canvas 导出图片。</p>`}openModal()});
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js');
