/* Transparent, deterministic study rules. The intervals are product defaults,
   not fitted memory probabilities or a claim of clinical/educational validation. */
(() => {
 'use strict';
 const DAY=86400000, RETRY=5*60000, INTERVALS=[1,3,7,14,30];
 const CORE=['meaning','recognition','reading'];
 const SKILLS=[...CORE,'listening','usage'];
 const dayKey=ms=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(ms));
 const num=(v,max=1e7)=>Number.isFinite(v)?Math.min(max,Math.max(0,Math.floor(v))):0;
 const blank=()=>({schema:2,cards:{},introduced:{},exercises:{},confusions:{},prefs:{newPerDay:3,includeExtras:false},daily:{}});
 const card=()=>({box:0,due:0,last:0,lastOutcome:'untried',wins:0,lapses:0,days:[],typedDays:[],peekUntil:0,lastAdvance:0});
 function validate(raw,ids){
  const out=blank();if(!raw||raw.schema!==2)return out;
  const known=new Set(ids), validDate=x=>/^\d{4}-\d{2}-\d{2}$/.test(x);
  const clean=c=>({box:num(c.box,5),due:num(c.due,9e15),last:num(c.last,9e15),lastOutcome:['correct','wrong','helped','untried','self'].includes(c.lastOutcome)?c.lastOutcome:'untried',wins:num(c.wins),lapses:num(c.lapses),days:[...new Set((Array.isArray(c.days)?c.days:[]).filter(validDate))].sort().slice(-30),typedDays:[...new Set((Array.isArray(c.typedDays)?c.typedDays:[]).filter(validDate))].sort().slice(-30),peekUntil:num(c.peekUntil,9e15),lastAdvance:num(c.lastAdvance,9e15)});
  for(const [id,v] of Object.entries(raw.introduced||{}))if(known.has(id)&&v&&typeof v==='object')out.introduced[id]={at:num(v.at,9e15),day:validDate(v.day)?v.day:dayKey(num(v.at,9e15)),source:['guided','practice','legacy','diagnostic'].includes(v.source)?v.source:'legacy'};
  for(const [id,v] of Object.entries(raw.cards||{}))if(known.has(id)&&v&&typeof v==='object'){
   out.cards[id]={};for(const k of SKILLS)if(v[k]&&typeof v[k]==='object')out.cards[id][k]=clean(v[k]);
  }
  for(const [id,v] of Object.entries(raw.exercises||{}))if(/^(sentence|context|cloze|transfer)-[\w-]+$/.test(id)&&v&&typeof v==='object')out.exercises[id]=clean(v);
  for(const [pair,v] of Object.entries(raw.confusions||{}))if(pair.split('|').length===2&&pair.split('|').every(x=>known.has(x)))out.confusions[pair]={count:num(v?.count),last:num(v?.last,9e15)};
  out.prefs.newPerDay=[0,3,5].includes(raw.prefs?.newPerDay)?raw.prefs.newPerDay:3;out.prefs.includeExtras=raw.prefs?.includeExtras===true;
  for(const [d,v] of Object.entries(raw.daily||{}))if(validDate(d))out.daily[d]={answers:num(v?.answers),independent:num(v?.independent)};
  return out;
 }
 function introduce(s,id,now=Date.now(),source='guided'){if(!s.introduced[id])s.introduced[id]={at:now,day:dayKey(now),source};}
 function migrate(learning,legacy,ids,now=Date.now()){
  const out=validate(learning,ids);
  for(const [id,v] of Object.entries(legacy||{}))if(ids.includes(id)&&!out.introduced[id]&&v.seen>0)introduce(out,id,v.last||now,'legacy');
  return out;
 }
 function getCard(s,id,skill){return s.cards[id]?.[skill]||card();}
 function dueCards(s,words,now=Date.now()){
  const out=[];
  for(const w of words)if(s.introduced[w.id])for(const skill of CORE){const c=getCard(s,w.id,skill);if(c.due<=now)out.push({word:w,skill,card:c,overdue:now-c.due});}
  // Failed / assisted cards before untested dimensions, then older due times.
  return out.sort((a,b)=>Number(['wrong','helped'].includes(b.card.lastOutcome))-Number(['wrong','helped'].includes(a.card.lastOutcome))||a.card.due-b.card.due||a.word.id.localeCompare(b.word.id));
 }
 function gradeCard(c,attempt,now){
  const {ok,helped=false,kind='choice',uncertain=false}=attempt;
  const before=JSON.parse(JSON.stringify(c));c.last=now;
  if(kind==='self'){c.lastOutcome='self';return {advanced:false,reason:'self',before,after:c};}
  if(!ok){c.lapses++;c.box=Math.max(0,c.box-1);c.due=now+RETRY;c.peekUntil=now+RETRY;c.lastOutcome='wrong';return {advanced:false,reason:'wrong',before,after:c};}
  c.wins++;
  if(helped||uncertain){c.lastOutcome='helped';c.peekUntil=Math.max(c.peekUntil,now+RETRY);c.due=now+RETRY;return {advanced:false,reason:'helped',before,after:c};}
  const day=dayKey(now);
  const canAdvance=now>=before.due&&now>=c.peekUntil&&day!==dayKey(c.lastAdvance||0)&&(c.lastAdvance===0||now-c.lastAdvance>=20*3600000);
  if(canAdvance){c.box=Math.min(5,c.box+1);c.lastAdvance=now;c.days=[...new Set([...c.days,day])].slice(-30);if(kind==='typed')c.typedDays=[...new Set([...c.typedDays,day])].slice(-30);c.due=now+INTERVALS[c.box-1]*DAY;c.lastOutcome='correct';return {advanced:true,reason:'scheduled',before,after:c};}
  // Correct after seeing the answer is useful practice, not another spaced success.
  if(c.lastOutcome!=='wrong'&&c.lastOutcome!=='helped')c.lastOutcome='correct';
  if(c.due<=now)c.due=Math.max(now+RETRY,c.peekUntil,c.lastAdvance?c.lastAdvance+DAY:0);
  return {advanced:false,reason:now<c.peekUntil?'recent-feedback':'early',before,after:c};
 }
 function grade(s,id,skill,attempt,now=Date.now()){
  if(!SKILLS.includes(skill))return null;
  introduce(s,id,now,'practice');s.cards[id]??={};s.cards[id][skill]??=card();
  const result=gradeCard(s.cards[id][skill],attempt,now),d=dayKey(now);
  s.daily[d]??={answers:0,independent:0};s.daily[d].answers++;if(result.advanced)s.daily[d].independent++;
  return result;
 }
 function peek(s,id,skill,now=Date.now()){introduce(s,id,now,'practice');s.cards[id]??={};s.cards[id][skill]??=card();const c=s.cards[id][skill];c.peekUntil=Math.max(c.peekUntil,now+RETRY);}
 function gradeExercise(s,id,attempt,now=Date.now()){s.exercises[id]??=card();return gradeCard(s.exercises[id],attempt,now);}
 function confuse(s,target,chosen,now=Date.now()){if(!target||!chosen||target===chosen)return;const pair=[target,chosen].sort().join('|');s.confusions[pair]??={count:0,last:0};s.confusions[pair].count++;s.confusions[pair].last=now;}
 function level(s,id){
  const c=CORE.map(k=>getCard(s,id,k));
  if(!s.introduced[id])return 0;
  if(c.every(x=>x.box>=3&&x.days.length>=3)&&c[2].typedDays.length>=2&&c.every(x=>x.lastOutcome==='correct'))return 3;
  if(c.every(x=>x.box>=1&&x.days.length>=1))return 2;
  return 1;
 }
 function summarize(s,words,now=Date.now()){
  const due=dueCards(s,words,now),introduced=words.filter(w=>s.introduced[w.id]),stable=words.filter(w=>level(s,w.id)===3);
  const dates=[];for(const c of Object.values(s.cards))for(const k of CORE)if(c[k]?.due>now)dates.push(c[k].due);
  return {dueCards:due.length,dueWords:new Set(due.map(x=>x.word.id)).size,introduced:introduced.length,stable:stable.length,nextDue:dates.length?Math.min(...dates):null,newToday:Object.values(s.introduced).filter(x=>x.day===dayKey(now)&&x.source==='guided').length};
 }
 function plan(s,ordered,now=Date.now(),hasVoice=false){
  const eligible=ordered.filter(w=>s.prefs.includeExtras||!w.extra),due=dueCards(s,eligible,now),seen=new Map();
  // One overdue dimension per word first, then fill with other overdue dimensions.
  const prioritized=[];for(const t of due){if(!seen.has(t.word.id)){prioritized.push(t);seen.set(t.word.id,true);}}
  for(const t of due)if(!prioritized.includes(t))prioritized.push(t);
  const reviews=prioritized.slice(0,8),today=summarize(s,eligible,now).newToday;
  const budget=due.length>12?0:Math.max(0,s.prefs.newPerDay-today);
  const fresh=eligible.filter(w=>!s.introduced[w.id]).slice(0,budget);
  const tasks=reviews.map(x=>({type:x.skill,wordId:x.word.id,reason:x.card.lastOutcome==='wrong'?'Ôn phần bạn vừa nhầm':x.card.box===0?'Kiểm tra kỹ năng chưa có bằng chứng':'Đã đến lịch ôn riêng của kỹ năng này',isReview:true}));
  for(const w of fresh)tasks.push({type:'intro',wordId:w.id,reason:'Từ mới trong lộ trình'});
  // Separate directions and words; do not ask the same word consecutively.
  for(const skill of CORE)for(const w of fresh)tasks.push({type:skill,wordId:w.id,reason:'Tập tự nhớ sau phần giới thiệu'});
  if(hasVoice){const w=[...fresh,...reviews.map(r=>r.word)].find(w=>getCard(s,w.id,'listening').due<=now);if(w)tasks.push({type:'listening',wordId:w.id,reason:'Đối chiếu cách đọc bằng tai'});}
  return {tasks,fresh: fresh.map(w=>w.id),reviewCount:reviews.length,backlog:due.length,today,budget};
 }
 const tones={a:['a','ā','á','ǎ','à'],e:['e','ē','é','ě','è'],i:['i','ī','í','ǐ','ì'],o:['o','ō','ó','ǒ','ò'],u:['u','ū','ú','ǔ','ù'],'ü':['ü','ǖ','ǘ','ǚ','ǜ']};
 function numberedToMarked(text){
  return String(text).toLowerCase().normalize('NFC').replace(/u:|v/g,'ü').replace(/([a-zü]+)([0-5])/g,(_,syllable,t)=>{
   const tone=Number(t);syllable=syllable.replace(/^([jqx])ü/,'$1u');if(!tone||tone===5)return syllable;
   let pos=syllable.indexOf('a');if(pos<0)pos=syllable.indexOf('e');if(pos<0&&syllable.includes('ou'))pos=syllable.indexOf('o');if(pos<0){for(let i=syllable.length-1;i>=0;i--)if(tones[syllable[i]]){pos=i;break;}}
   return pos<0?syllable:syllable.slice(0,pos)+tones[syllable[pos]][tone]+syllable.slice(pos+1);
  });
 }
 const pyKey=s=>numberedToMarked(s).replace(/[\s’'·.,;:!?()\-]/g,'').normalize('NFC');
 const noTones=s=>pyKey(s).normalize('NFD').replace(/[\u0300-\u0304\u030c]/g,'').normalize('NFC');
 function readingAnswer(input,expected){
  const variants=String(expected).split(/[\/／；;]/).map(x=>x.replace(/（.*?）|\(.*?\)/g,'').trim()).filter(Boolean),got=pyKey(input);
  if(!got)return {ok:false,reason:'empty'};
  if(variants.some(x=>pyKey(x)===got))return {ok:true,reason:'exact'};
  if(variants.some(x=>noTones(x)===noTones(input)))return {ok:false,reason:'tone'};
  return {ok:false,reason:'sound'};
 }
 const hanKey=s=>String(s).normalize('NFKC').replace(/[\s，。！？,.!?]/g,'');
 function merge(a,b,ids){
  a=validate(a,ids);b=validate(b,ids);
  for(const [id,v] of Object.entries(b.introduced))if(!a.introduced[id]||v.at<a.introduced[id].at)a.introduced[id]=v;
  for(const [id,skills] of Object.entries(b.cards)){a.cards[id]??={};for(const [k,c] of Object.entries(skills))if(!a.cards[id][k]||c.last>a.cards[id][k].last)a.cards[id][k]=c;}
  for(const [id,c] of Object.entries(b.exercises))if(!a.exercises[id]||c.last>a.exercises[id].last)a.exercises[id]=c;
  for(const [id,c] of Object.entries(b.confusions))if(!a.confusions[id]||c.last>a.confusions[id].last)a.confusions[id]=c;
  for(const [d,c] of Object.entries(b.daily))if(!a.daily[d]||c.answers>a.daily[d].answers)a.daily[d]=c;
  return a;
 }
 window.HAN_ENGINE={DAY,RETRY,INTERVALS,CORE,SKILLS,blank,validate,migrate,introduce,getCard,dueCards,grade,peek,gradeExercise,confuse,level,summarize,plan,dayKey,readingAnswer,numberedToMarked,pyKey,hanKey,merge};
})();
