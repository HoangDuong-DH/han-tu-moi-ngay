// Evidence is attached to the skill actually tested. Thresholds are transparent
// product rules, not a calibrated probability of knowing a word or an HSK grade.
(() => {
 'use strict';
 const E=window.HAN_ENGINE,DAY=E.DAY,RETRY=E.RETRY;
 const FACETS={meaning:'Hiểu nghĩa',form:'Mặt chữ',sound:'Âm & pinyin',listening:'Nghe hiểu',syntax:'Cấu trúc & vai nghĩa',inference:'Suy luận có căn cứ',register:'Ngữ thể',source:'Đọc nguồn',production:'Tự diễn đạt'};
 const safeKey=x=>typeof x==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9:._-]{0,119}$/.test(x)&&!['__proto__','constructor','prototype'].includes(x);
 const n=(v,max=9e15)=>Number.isFinite(v)?Math.max(0,Math.min(max,v)):0;
 const str=(v,max=300)=>typeof v==='string'?v.slice(0,max):'';
 const list=(v,max=100)=>Array.isArray(v)?[...new Set(v.filter(safeKey))].slice(0,max):[];
 const dateKey=x=>/^\d{4}-\d{2}-\d{2}$/.test(x);
 const blank=()=>({schema:1,startedAt:0,nodes:{},exposures:{},events:[],journal:[],drafts:{},daily:{}});
 const newCard=()=>({due:0,last:0,first:0,lastOutcome:'untried',wins:0,wrong:0,helped:0,days:[],contexts:[],box:0,advance:0,peekUntil:0});
 const cleanCard=c=>({due:n(c?.due),last:n(c?.last),first:n(c?.first),lastOutcome:['untried','correct','wrong','helped'].includes(c?.lastOutcome)?c.lastOutcome:'untried',wins:n(c?.wins,1e7),wrong:n(c?.wrong,1e7),helped:n(c?.helped,1e7),days:Array.isArray(c?.days)?[...new Set(c.days.filter(dateKey))].sort().slice(-100):[],contexts:list(c?.contexts,100),box:Math.floor(n(c?.box,5)),advance:n(c?.advance),peekUntil:n(c?.peekUntil)});
 function sanitize(raw){
  const s=blank();if(raw?.schema!==1)return s;s.startedAt=n(raw.startedAt);
  for(const [id,v] of Object.entries(raw.nodes||{}))if(safeKey(id)&&v&&typeof v==='object'){
   const node={at:n(v.at),facets:{}};for(const [f,c] of Object.entries(v.facets||{}))if(Object.hasOwn(FACETS,f))node.facets[f]=cleanCard(c);s.nodes[id]=node;
  }
  for(const [id,t] of Object.entries(raw.exposures||{}))if(safeKey(id))s.exposures[id]=n(t);
  s.events=(Array.isArray(raw.events)?raw.events:[]).filter(x=>safeKey(x?.id)&&safeKey(x?.item)&&Object.hasOwn(FACETS,x.facet)&&['attempt','word','view','self'].includes(x.kind)).slice(-10000).map(x=>({id:x.id,item:x.item,kind:x.kind,facet:x.facet,mode:['read','listen','dictation','mixed','word','journal'].includes(x.mode)?x.mode:'word',at:n(x.at),ok:x.ok===true,helped:x.helped===true,independent:x.independent===true,targets:list(x.targets,20),context:str(x.context,100),input:str(x.input,800),reason:str(x.reason,200)}));
  s.journal=(Array.isArray(raw.journal)?raw.journal:[]).filter(x=>safeKey(x?.id)&&x.title).slice(-1000).map(x=>({id:x.id,title:str(x.title,120),type:['word','grammar','family','culture','sound','register'].includes(x.type)?x.type:'word',note:str(x.note,3000),source:str(x.source,500),at:n(x.at),updated:n(x.updated),archivedAt:n(x.archivedAt),state:['new','understood','used'].includes(x.state)?x.state:'new',linked:list(x.linked,20)}));
  for(const [id,d] of Object.entries(raw.drafts||{}))if(safeKey(id)&&d&&typeof d==='object')s.drafts[id]={text:str(d.text,5000),at:n(d.at),updated:n(d.updated),checks:list(d.checks,10),modelSeen:d.modelSeen===true};
  for(const [key,v] of Object.entries(raw.daily||{}))if(dateKey(key)){
   const seconds={};for(const [device,ms] of Object.entries(v?.devices||{}))if(safeKey(device))seconds[device]=n(ms,24*3600000);
   s.daily[key]={devices:seconds};
  }
  return s;
 }
 function touch(s,now=Date.now()){if(!s.startedAt)s.startedAt=now;}
 function see(s,targets,now=Date.now()){touch(s,now);for(const id of targets.filter(safeKey)){s.nodes[id]??={at:now,facets:{}};}}
 function grade(c,{ok,helped},context,now){
  c.first ||=now;c.last=now;
  if(!ok){c.wrong++;c.box=Math.max(0,c.box-1);c.lastOutcome='wrong';c.due=now+RETRY;c.peekUntil=now+RETRY;return false;}
  c.wins++;
  if(helped){c.helped++;c.lastOutcome='helped';c.due=now+RETRY;c.peekUntil=now+RETRY;return false;}
  const today=E.dayKey(now),separated=!c.advance||now-c.advance>=20*3600000;
  if(now>=c.due&&now>=c.peekUntil&&separated&&!c.days.includes(today)){
   c.box=Math.min(5,c.box+1);c.advance=now;c.days.push(today);if(!c.contexts.includes(context))c.contexts.push(context);c.due=now+E.INTERVALS[c.box-1]*DAY;c.lastOutcome='correct';return true;
  }
  if(c.due<=now)c.due=Math.max(now+RETRY,c.peekUntil,c.advance+DAY);
  return false;
 }
 function record(s,event,now=Date.now()){
  touch(s,now);const targets=list(event.targets||[],20);see(s,targets,now);
  const kind=event.kind||'attempt',facet=Object.hasOwn(FACETS,event.facet)?event.facet:'meaning',context=event.context||event.item;
  let advanced=false;
  if(kind==='attempt')for(const id of targets){const node=s.nodes[id];node.facets[facet]??=newCard();if(grade(node.facets[facet],event,context,now))advanced=true;}
  const entry={id:'e-'+now.toString(36)+'-'+Math.random().toString(36).slice(2,10),item:event.item,kind,facet,mode:event.mode||'read',at:now,ok:event.ok===true,helped:event.helped===true,independent:kind==='attempt'&&event.ok===true&&!event.helped&&advanced,targets,context,input:str(event.input,800),reason:str(event.reason,200)};
  s.events.push(entry);if(s.events.length>10000)s.events=s.events.slice(-10000);return entry;
 }
 function addNote(s,{title,type,note,source,state,linked=[]},now=Date.now()){
  title=String(title||'').trim();if(!title||title.length>120)throw Error('Tên kiến thức cần từ 1 đến 120 ký tự.');touch(s,now);
  if(s.journal.length>=1000)throw Error('Sổ đã có 1.000 mục. Hãy xuất bản sao trước khi thêm tiếp.');
  const x={id:'n-'+now.toString(36)+'-'+Math.random().toString(36).slice(2,9),title,type,note:str(note,3000),source:str(source,500),state:state||'new',at:now,updated:now,archivedAt:0,linked:list(linked,20)};
  s.journal.push(x);return x;
 }
 function saveDraft(s,id,text,checks,modelSeen,now=Date.now()){
  if(!safeKey(id))return;touch(s,now);s.drafts[id]={text:str(text,5000),at:s.drafts[id]?.at||now,updated:now,checks:list(checks,10),modelSeen:!!modelSeen};
 }
 function addTime(s,device,ms,now=Date.now()){
  if(!safeKey(device)||ms<=0||ms>90000)return;touch(s,now);const key=E.dayKey(now);s.daily[key]??={devices:{}};s.daily[key].devices[device]=Math.min(24*3600000,(s.daily[key].devices[device]||0)+ms);
 }
 function status(c,now=Date.now()){
  if(!c?.last)return 'untried';if(c.lastOutcome==='wrong')return 'review';if(c.lastOutcome==='helped')return 'helped';
  return c.box>=3&&c.days.length>=3&&c.contexts.length>=2&&c.due>now?'spaced':'tested';
 }
 function judge(q,answer,proof=[]){
  const answerOK=q.answer===answer,selected=[...new Set(proof)];
  const proofOK=!q.proof?.length||q.proof.some(set=>set.length===selected.length&&set.every(i=>selected.includes(i)));
  return {answerOK,proofOK,ok:answerOK&&proofOK};
 }
 function merge(a,b){
  a=sanitize(a);b=sanitize(b);a.startedAt=[a.startedAt,b.startedAt].filter(Boolean).sort((x,y)=>x-y)[0]||0;
  for(const [id,node] of Object.entries(b.nodes)){
   a.nodes[id]??={at:node.at,facets:{}};a.nodes[id].at=Math.min(a.nodes[id].at||node.at,node.at);
   for(const [f,c] of Object.entries(node.facets))if(!a.nodes[id].facets[f]||c.last>a.nodes[id].facets[f].last)a.nodes[id].facets[f]=c;
  }
  for(const [id,t] of Object.entries(b.exposures))a.exposures[id]=Math.max(a.exposures[id]||0,t);
  a.events=[...new Map([...a.events,...b.events].map(e=>[e.id,e])).values()].sort((x,y)=>x.at-y.at).slice(-10000);
  const notes=new Map(a.journal.map(n=>[n.id,n]));for(const x of b.journal)if(!notes.has(x.id)||x.updated>notes.get(x.id).updated)notes.set(x.id,x);a.journal=[...notes.values()].slice(-1000);
  for(const [id,d] of Object.entries(b.drafts))if(!a.drafts[id]||d.updated>a.drafts[id].updated)a.drafts[id]=d;
  for(const [key,v] of Object.entries(b.daily)){a.daily[key]??={devices:{}};for(const [id,ms] of Object.entries(v.devices))a.daily[key].devices[id]=Math.max(a.daily[key].devices[id]||0,ms);}
  return a;
 }
 function summary(s,learning,words,now=Date.now()){
  const start=[s.startedAt,...Object.values(learning.introduced).filter(x=>x.source!=='legacy').map(x=>x.at)].filter(Boolean).sort((a,b)=>a-b)[0]||0;
  const events=s.events.filter(x=>x.kind==='attempt'),facets=Object.entries(FACETS).map(([id,label])=>{const cards=Object.values(s.nodes).map(n=>n.facets[id]).filter(Boolean);return {id,label,tested:cards.filter(c=>c.last).length,spaced:cards.filter(c=>status(c,now)==='spaced').length,due:cards.filter(c=>c.due<=now).length};});
  return {start,elapsed:start?Math.floor((now-start)/DAY)+1:0,activeDays:new Set([...Object.keys(s.daily),...Object.keys(learning.daily)]).size,activeMs:Object.values(s.daily).reduce((sum,d)=>sum+Object.values(d.devices).reduce((a,b)=>a+b,0),0),words:E.summarize(learning,words,now),concepts:Object.keys(s.nodes).filter(x=>x.startsWith('c:')).length,notes:s.journal.filter(n=>!n.archivedAt).length,events,facets,comprehension:events.filter(x=>['read','listen'].includes(x.mode)),production:Object.values(s.drafts).filter(d=>d.text.trim()).length};
 }
 window.HAN_KNOWLEDGE={FACETS,blank,sanitize,touch,see,record,addNote,saveDraft,addTime,status,judge,merge,summary,safeKey};
})();
