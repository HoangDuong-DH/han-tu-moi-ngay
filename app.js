(() => {
 'use strict';
 const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
 const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const plain = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/[^a-z0-9\u3400-\u9fff]/g,'');
 const words = window.HAN_DATA.words, lessons = window.HAN_LESSONS;
 const characterGraph = window.HAN_CHARACTER_GRAPH.create(words);
 const E=window.HAN_ENGINE,K=window.HAN_KNOWLEDGE;
 const byHan = new Map(words.map(w=>[w.han,w])), byId = new Map(words.map(w=>[w.id,w]));
 const KEY='han-tu-moi-ngay.v1';
 const modes = {
  comprehension:{title:'Nghe & đọc tổng hợp',skill:'comprehension'},
  memory:{title:'Lật ô tìm cặp',skill:'memory'},journey:{title:'Hành trình một ngày',skill:'journey'},detective:{title:'Thám tử câu & ngữ pháp',skill:'detective'},
  daily:{title:'Học hôm nay',icon:'习',level:'LỘ TRÌNH',desc:'Ôn đến hạn, học ít từ mới và vận dụng.',skill:'daily'},
  flash:{title:'Lật thẻ ghi nhớ',icon:'忆',level:'LÀM QUEN',desc:'Nhìn chữ, tự nhớ nghĩa và đọc. Lật để đối chiếu.',skill:'self'},
  meaning:{title:'Nhìn chữ · hiểu nghĩa',icon:'义',level:'CƠ BẢN',desc:'Một mặt chữ, bốn nghĩa. Bạn nhận ra từ nào?',skill:'meaning'},
  character:{title:'Nhớ nghĩa · tìm chữ',icon:'字',level:'CƠ BẢN',desc:'Từ nghĩa tiếng Việt, chọn đúng chữ Hán.',skill:'recognition'},
  reading:{title:'Chữ này đọc thế nào?',icon:'音',level:'PHÁT ÂM',desc:'Chọn pinyin đúng. Chú ý âm đầu và dấu thanh.',skill:'reading'},
  listen:{title:'Nghe âm · tìm chữ',icon:'听',level:'NGHE & NHẬN DIỆN',desc:'Nghe giọng tiếng Trung rồi nhận ra mặt chữ.',skill:'listening'},
  pairs:{title:'Ghép đôi chữ & nghĩa',icon:'合',level:'GHI NHỚ',desc:'Nối năm mặt chữ với năm nghĩa tương ứng.',skill:'recognition'},
  sentence:{title:'Xếp chữ thành câu',icon:'句',level:'VẬN DỤNG 01—03',desc:'Từ câu ngắn đến nhiều mốc thời gian, vị trí.',skill:'sentence'},
  context:{title:'Chọn câu thực chiến',icon:'用',level:'VẬN DỤNG 01—03',desc:'Chọn cách nói hợp cảnh. Phân biệt các từ dễ nhầm.',skill:'context'},
  numbers:{title:'Phản xạ với số',icon:'数',level:'SỐ · GIỜ · TIỀN',desc:'Đọc số đếm, điện thoại, giá tiền, ngày và giờ.',skill:'numbers'}
 };
 const skillNames={meaning:'Chữ → nghĩa',recognition:'Nghĩa → chữ',reading:'Chữ → pinyin',listening:'Nghe → chữ',self:'Tự ôn thẻ',sentence:'Xếp câu',context:'Tình huống',numbers:'Số & giờ',usage:'Từ đích trong câu'};
 const emptyStore=()=>({version:1,words:{},skills:{},sessions:[],lastSeen:null,learning:E.blank(),investigations:window.HAN_INVESTIGATION.blank(),knowledge:K.blank(),reading:window.HAN_READER.blank(),study:window.HAN_STUDY.blank()});
 let learningUI,playUI,investigationUI,practiceUI,knowledgeUI,readerUI,pathsUI,reviewUI,wordlabUI,studyUI,hsk2UI,materialsUI,sentenceReaderUI,vocabularyFamiliesUI,deepReadingUI,learningActive=false;
 let storageOK=true;
 function validateStore(d){
  if(!d||d.version!==1||typeof d.words!=='object'||Array.isArray(d.words)||!d.words)throw Error('Tệp không đúng định dạng sổ ôn.');
  const out=emptyStore();
  for(const [id,v] of Object.entries(d.words)){
   if(!byId.has(id)||!v||typeof v!=='object')continue;
   out.words[id]={};
   for(const k of ['seen','correct','wrong','selfYes','selfNo'])out.words[id][k]=Math.min(1e7,Math.max(0,Number.isFinite(v[k])?Math.floor(v[k]):0));
   out.words[id].last=Number.isFinite(v.last)?Math.min(Date.now(),Math.max(0,v.last)):0;
   out.words[id].lastWrong=!!v.lastWrong;
  }
  for(const k of Object.keys(skillNames)){
   const v=d.skills?.[k];if(v)out.skills[k]={correct:Math.min(1e7,Math.max(0,Math.floor(Number(v.correct)||0))),total:Math.min(1e7,Math.max(0,Math.floor(Number(v.total)||0)))};
  }
  out.sessions=Array.isArray(d.sessions)?d.sessions.filter(s=>s&&typeof s.mode==='string'&&modes[s.mode]&&Number.isFinite(s.time)).slice(-100).map(s=>({mode:s.mode,time:s.time,correct:Math.max(0,Number(s.correct)||0),total:Math.max(0,Number(s.total)||0)})):[];
  out.learning=E.migrate(d.learning,out.words,words.map(w=>w.id));
  out.investigations=window.HAN_INVESTIGATION.sanitize(d.investigations);
  out.knowledge=K.sanitize(d.knowledge);
  out.reading=window.HAN_READER.sanitize(d.reading);
  out.study=window.HAN_STUDY.clean(d.study);
  return out;
 }
 let db=emptyStore();
 try {const raw=localStorage.getItem(KEY);if(raw)db=validateStore(JSON.parse(raw));}catch(e){storageOK=false;}
 function save(){try{localStorage.setItem(KEY,JSON.stringify(db));}catch(e){storageOK=false;toast('Trình duyệt không lưu được tiến độ. Bạn vẫn chơi được; hãy xuất sổ ôn trước khi đóng.');}}
 let toastTimer;
 function toast(t){$('#toast').textContent=t;$('#toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').hidden=true,4600);}
 const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 function getStats(){const s=E.summarize(db.learning,words);return {seen:s.introduced,review:s.dueWords,rounds:db.sessions.length};}
 function needsReview(w){return !!db.learning.introduced[w.id]&&E.CORE.some(k=>E.getCard(db.learning,w.id,k).due<=Date.now());}
 function track(w,ok,skill,self=false,options={}){
  db.skills[skill]??={correct:0,total:0};db.skills[skill].total++;if(ok)db.skills[skill].correct++;
  if(w){const s=db.words[w.id]??={seen:0,correct:0,wrong:0,selfYes:0,selfNo:0,last:0,lastWrong:false};s.seen++;s.last=Date.now();s.lastWrong=!ok;if(self)s[ok?'selfYes':'selfNo']++;else s[ok?'correct':'wrong']++;}
  let result=null;
  if(w){E.introduce(db.learning,w.id,Date.now(),'practice');if(E.SKILLS.includes(skill))result=E.grade(db.learning,w.id,skill,{ok,kind:'choice',...options});}
  if(!options.suppressKnowledge){const facet={recognition:'form',reading:'sound',usage:'syntax',sentence:'syntax',context:'syntax',numbers:'syntax'}[skill]||'meaning';
   const entry=K.record(db.knowledge,{kind:self?'self':'word',item:w?'word-'+w.id:'legacy-'+skill,facet,mode:'word',ok,helped:!!(self||options.helped||options.uncertain),targets:w?['w:'+w.id]:[],context:'word-'+skill});entry.independent=!!result?.advanced;
  }
  save();return result;
 }
 let voices=[], selectedVoice=null;
 function updateVoices(){
  voices='speechSynthesis' in window?window.speechSynthesis.getVoices().filter(v=>(/^(?:zh(?:[-_](?:CN|TW|SG|Hans|Hant)(?:[-_].*)?)?|cmn(?:[-_].*)?)$/i.test(v.lang)||/mandarin|普通话|普通話/i.test(v.name))&&!/cantonese|粤语|粵語|yue/i.test(v.name+' '+v.lang)):[];
  selectedVoice=voices.find(v=>/^zh[-_]CN$/i.test(v.lang))||voices.find(v=>/mandarin|普通话|普通話/i.test(v.name))||voices[0]||null;
  $$('[data-voice-status]').forEach(el=>el.textContent=voiceStatus());
 }
 function voiceStatus(){return selectedVoice?`Giọng thiết bị: ${selectedVoice.name} · ${selectedVoice.lang}`:'Chưa có giọng tiếng Trung trên trình duyệt này. Pinyin và bài đọc vẫn dùng được.';}
 function speak(t,slow=false,onFinish=null){
  updateVoices();
  if(!('speechSynthesis' in window)||!selectedVoice){toast('Thiết bị chưa có giọng tiếng Trung. Hãy bật/cài giọng 普通话 (zh-CN) trong phần giọng nói của thiết bị.');onFinish?.(false);return false;}
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang=selectedVoice.lang;u.voice=selectedVoice;u.rate=slow?.64:.84;
  u.onend=()=>onFinish?.(true);u.onerror=e=>{onFinish?.(false);if(!['interrupted','canceled'].includes(e.error))toast('Chưa phát được âm thanh. Thử lại nút nghe hoặc kiểm tra giọng tiếng Trung của thiết bị.');};speechSynthesis.speak(u);return true;
 }
 if('speechSynthesis' in window){updateVoices();speechSynthesis.addEventListener('voiceschanged',updateVoices);}
 const audioButton=(han,slow=false)=>`<button class="audio-btn" data-say="${esc(han)}" ${slow?'data-slow="1"':''} aria-label="Nghe ${esc(han)}${slow?' chậm':''}" title="Nghe${slow?' chậm':''}">♪</button>`;
 let route='',session=null,dictPage=0,dictQuery='',dictScope='daily',dictPy=true;
 const app=$('#app');
 const scopeOptions=(sel='daily')=>[
  ['daily','Giao tiếp & từ ghép'],['hsk2','HSK 2 · sáu bài đầu'],['all','Toàn bộ '+words.length+' mục'],['nov05','Bộ từ 05/11 · 26 mục'],['studies','Giải thích vừa viết lại · '+words.filter(w=>window.HAN_STUDIES?.has(w.han)).length+' mục'],['lesson13','20 mục của bài 13'],['lesson12','23 mục của bài 12'],['lesson11','25 mục của bài 11'],['extras',words.filter(w=>w.extra).length+' chữ / thành phần mở rộng'],['review','Các từ cần ôn lại'],
  ...[...new Set(words.map(w=>w.category))].filter(c=>c!=='Họ chữ mở rộng').map(c=>['cat:'+c,c])
 ].map(([v,t])=>`<option value="${esc(v)}"${v===sel?' selected':''}>${esc(t)}</option>`).join('');
 function pool(scope){if(scope==='hsk2')return words.filter(w=>w.hsk2Lessons?.length);if(scope==='all')return words;if(scope==='studies')return words.filter(w=>window.HAN_STUDIES?.has(w.han));if(scope==='nov05')return window.HAN_NOV05||[];if(scope==='extras')return words.filter(w=>w.extra);if(scope==='lesson11')return words.filter(w=>w.lesson11);if(scope==='lesson12')return words.filter(w=>w.lesson12);if(scope==='lesson13')return words.filter(w=>w.lesson13);if(scope==='review')return words.filter(needsReview);if(scope.startsWith('cat:'))return words.filter(w=>w.category===scope.slice(4));return words.filter(w=>!w.extra);}
 function go(hash){if(location.hash===hash)renderRoute();else location.hash=hash;}
 function articleGame(id){
  const library=window.HAN_DEEP_READING_DATA;
  const article=library?.byId.get(id);
  if(!article)return null;
  const pool=library.linkedWords(article,byHan);
  return pool.length?{id:article.id,title:article.title,words:pool,back:'#read/'+article.id+'/choi-tu'}:null;
 }
 function renderRoute(){
  learningUI?.cancel();playUI?.cancel();investigationUI?.cancel();practiceUI?.cancel();knowledgeUI?.cancel();readerUI?.cancel();reviewUI?.cancel();wordlabUI?.cancel();hsk2UI?.cancel();materialsUI?.cancel();if($('#word-dialog').open)$('#word-dialog').close();
  route=location.hash.slice(1)||'learn';session=null;
  const deepRoute=route==='read'||route.startsWith('read/');
  if(!deepRoute)deepReadingUI?.cancel();dictPage=0;if('speechSynthesis' in window)speechSynthesis.cancel();
  const isReading=deepRoute||/^(readings|reading|essays?|essay-practice|syntax)(\/|$)/.test(route)||(
    route.startsWith('materials')&&!route.startsWith('materials/phonetics/practice/'));
  let navGroup='practice';
  if(route==='hsk2/progress'||route==='review/progress'||['knowledge','notebook','progress','wordlab/report','review/report'].includes(route))navGroup='study-progress';
  else if(isReading)navGroup='read';
  else if(route.startsWith('dictionary')||route.startsWith('vocabulary'))navGroup='dictionary';
  else if(route==='learn'||route==='home'||(route.startsWith('hsk2')&&!route.startsWith('hsk2/all/')))navGroup='learn';
  $$('[data-nav]').forEach(a=>{const active=a.dataset.nav===navGroup;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  if(deepRoute){deepReadingUI.route(route.split('/').slice(1));return;}
  if(route==='home'||route==='learn'){hsk2UI.route([]);return;}
  if(route==='review'){studyUI.hub();return;}
  if(route==='library'){studyUI.library();return;}
  if(route==='vocabulary'||route.startsWith('vocabulary/')){vocabularyFamiliesUI.route(route.split('/').slice(1));return;}
  if(route==='readings'||route.startsWith('readings/')){sentenceReaderUI.route(route.split('/').slice(1));return;}
  if(route==='syntax'||route.startsWith('syntax/')){sentenceReaderUI.route(route.split('/').slice(1),'syntax');return;}
  if(route.startsWith('essay-practice/')){readerUI.quiz(route.split('/')[1]);return;}
  if(route==='materials'||route.startsWith('materials/')){materialsUI.route(route.split('/').slice(1));return;}
  if(route==='hsk2'||route.startsWith('hsk2/')){hsk2UI.route(route.split('/').slice(1));return;}
  if(route==='dictionary/guess'){
   dictionary();
   detail('抱',true,true);
   return;
  }
  if(route.startsWith('dictionary/graph/')){
   dictionary();
   let han;
   try { han=decodeURIComponent(route.slice('dictionary/graph/'.length)); } catch { return; }
   detail(han,true);
   return;
  }
  if(route==='review/tools'){reviewUI.hub();return;}
  if(/^review\/(continue|topic|next|progress|restart)(\/|$)/.test(route)){studyUI.route(route.split('/').slice(1));return;}
  const [gamePath,gameMode,readingId]=route.split('/');
  if(readingId&&gamePath==='game'&&gameMode==='memory'){playUI.game(gameMode,articleGame(readingId));return;}
  if(readingId&&gamePath==='play'&&gameMode==='flash'){
   const reading=articleGame(readingId);
   if(reading)setup(gameMode,reading);else playUI.hub();
   window.scrollTo(0,0);return;
  }
  if(route==='wordlab'||route.startsWith('wordlab/')){wordlabUI.route(route.split('/').slice(1));if('speechSynthesis' in window)speechSynthesis.cancel();return;}
  if(route==='review'||route.startsWith('review/')){reviewUI.route(route.split('/').slice(1));if('speechSynthesis' in window)speechSynthesis.cancel();return;}
  if('speechSynthesis' in window)speechSynthesis.cancel();
  if(route==='paths'||route.startsWith('path/'))pathsUI.open(route.split('/')[1]);else if(route==='essays')readerUI.library();else if(route.startsWith('essay/'))readerUI.open(route.split('/')[1]);else if(route==='practice')practiceUI.hub();else if(route.startsWith('practice/'))practiceUI.route(route.split('/').slice(1));else if(route==='knowledge')knowledgeUI.progress();else if(route==='notebook')knowledgeUI.notebook();else if(route==='essays')readerUI.library();else if(route==='guide')practiceUI.guide();else if(route==='game/detective')investigationUI.hub();else if(route.startsWith('case/'))investigationUI.open(route.split('/')[1]);else if(route==='game/detective-warmup')playUI.game('detective');else if(route==='games')playUI.hub();else if(route.startsWith('game/'))playUI.game(route.split('/')[1]);else if(route==='lesson12')playUI.lesson12();else if(route==='lesson13')playUI.lesson13();else if(route==='grammar'||route.startsWith('grammar/'))playUI.grammar(route.split('/')[1]||'all');else if(route==='daily')learningUI.dashboard();else if(route.startsWith('daily/'))learningUI.begin(route.split('/')[1]);else if(route==='method')learningUI.methodPage();else if(route.startsWith('play/'))setup(route.split('/')[1]);
  else if(route==='dictionary/studies'){dictScope='studies';dictQuery='';dictionary();}else if(route==='dictionary/nov05'){dictScope='nov05';dictQuery='';dictionary();}else if(route==='dictionary/hsk2'){dictScope='hsk2';dictQuery='';dictionary();}else if(route==='dictionary')dictionary();else if(route==='reading')readingPage();else if(route==='progress')progressPage();else home();
  window.scrollTo(0,0);
 }
 function home(){const s=getStats();app.innerHTML=`
  <section class="hero"><div><div class="eyebrow">KHO TỪ CỦA BẠN · HỌC QUA TRÒ CHƠI</div><h1>Nhìn chữ nhớ nghĩa.<br><em>Đọc lên thành lời.</em></h1><p class="lead">Một chút mỗi ngày, từ chữ đầu tiên đến câu chuyện của chính bạn. Ôn cả mặt chữ, nghĩa và cách đọc tiếng Trung.</p><div class="hero-actions"><a class="btn primary" href="#daily">Học hôm nay <span>↗</span></a><a class="btn" href="#dictionary">Mở kho từ</a></div><div class="tiny muted">Không giới hạn thời gian. Sai thì xem lại, hiểu rồi chơi tiếp.</div></div><div class="hero-sample"><div class="sample-top"><span>THẺ TỪ · 001</span><span>CHỮ → ÂM → NGHĨA</span></div><div class="sample-word han">学习</div><div class="sample-py">xuéxí</div><div class="sample-line"><div><strong>Học tập</strong><br><span>学 = học · 习 = tập</span></div>${audioButton('学习')}</div></div></section>
  <div class="stats-ribbon"><div class="stat"><strong>${words.length}</strong><span>Mục trong kho từ cá nhân</span></div><div class="stat"><strong>${s.seen}</strong><span>Mục đã ôn trên thiết bị này</span></div><div class="stat"><strong>${s.review}</strong><span>Mục đến lượt ôn lại</span></div><div class="stat"><strong>9</strong><span>Kiểu chơi, đi từ dễ đến khó</span></div></div>
  ${readerUI.banner()}<div class="new-content-banner practice-banner"><strong>Mới · Nghe cả câu, hiểu cả chuyện</strong><p>6 kiểu luyện, ${window.HAN_PRACTICE.passages.length} đoạn có căn cứ và bài tự viết. Ghi lại điều học thêm theo chiều rộng; kiểm tra độ sâu qua từng kỹ năng.</p><div class="chip-row"><a class="btn primary" href="#practice">Luyện nghe & đọc →</a><a class="btn" href="#knowledge">Xem tiến độ</a><a class="btn" href="#notebook">Ghi kiến thức mới</a></div></div><div class="new-content-banner"><strong>Bài 13 · Gọi món & giao tiếp</strong><p>20 mục: 11 từ mới, 9 từ ôn lại. Học chữ, nghĩa, pinyin rồi gọi bữa sáng, hỏi một câu và xin thêm trà.</p><div class="chip-row"><a class="btn primary" href="#lesson13">Học bài 13 →</a><a class="btn" href="#grammar/lesson13">Cách dùng & phân biệt</a></div></div><div class="new-content-banner"><strong>Hồ sơ đêm · Án mạng và mất tích</strong><p>Phòng 304 vẫn gọi sau giờ chết. Trong rạp cũ, có người đang chờ sau màn bạc. Hai vụ án mới để đọc, nghe và suy luận.</p><div class="chip-row"><a class="btn primary" href="#game/detective">Thám tử câu →</a><a class="btn" href="#games">Chơi mà học</a><a class="btn" href="#grammar">Ngữ pháp</a><a class="btn" href="#lesson12">Bài 12</a></div></div>${learningUI.homePanel()}<section><div class="section-top"><div><h2>Luyện tự do theo kiểu chơi</h2><p class="tiny muted">Nhận diện trước. Hiểu nghĩa, đọc đúng, rồi dùng thành câu.</p></div><span class="level-tag">TỰ CHỌN NHỊP HỌC</span></div><div class="mode-grid">${Object.entries(modes).filter(([key])=>!['daily','memory','journey','detective','comprehension'].includes(key)).map(([key,m])=>`<a class="mode-card" href="#play/${key}" style="text-decoration:none"><span class="mode-icon">${m.icon}</span><h3>${m.title}</h3><p>${m.desc}</p><span class="mode-bottom">${m.level}<span>↗</span></span></a>`).join('')}</div></section>
  <div class="note-panel"><span class="note-glyph">知</span><div><strong>Biết chữ cũng là biết cách dùng.</strong><p>Kho có ${words.filter(w=>w.extra).length} chữ/thành phần để mở rộng theo họ chữ. Các chữ này được tách khỏi lượt giao tiếp mặc định. Hán Việt là cầu nối ghi nhớ; pinyin mới là cách đọc tiếng Trung.</p></div></div>
  ${!storageOK?'<p class="warning">Trình duyệt đang chặn lưu tiến độ. Bạn có thể chơi và xuất sổ ôn thủ công.</p>':''}
  <div class="section-top"><h2>Những cặp dễ lẫn</h2><a class="text-btn" href="#reading">Đọc cách phân biệt →</a></div><div class="chip-row">${['买','卖','那','哪儿','在','再','二','两','半','班'].map(h=>`<button class="chip inline-han" data-detail="${h}">${h}</button>`).join('')}</div>`;}
 function dictionary(){
  const filtered=pool(dictScope).filter(w=>plain([w.han,w.py,w.hv,w.meaning].join(' ')).includes(plain(dictQuery)));
  const pageSize=dictScope==='nov05'?30:24;
  const pages=Math.max(1,Math.ceil(filtered.length/pageSize));dictPage=Math.min(dictPage,pages-1);
  app.innerHTML=`<div class="page-head"><div><div class="eyebrow">NHÌN · ĐỌC · HIỂU · DÙNG</div><h1>Kho từ của bạn</h1><p>${words.length} mục, gộp theo mặt chữ. Đây là lượng tư liệu đã gặp, chưa phải số từ đã thuộc. Mở một từ để hiểu cảnh dùng, nghe cách đọc, xem ví dụ, nối Hán Việt và đối chiếu họ chữ. Những bài văn hóa dài nằm riêng trong Đọc lúc rảnh.</p></div></div>
  <p><a class="btn primary" href="#vocabulary">Hán Việt & họ từ · học theo mạch →</a> <a class="btn" href="#readings">Đọc câu có phân tích →</a></p><p><a class="text-btn" href="#dictionary/nov05">Mở bộ từ 05/11 · 26 mục →</a> · <a class="text-btn" href="#essay/shuowen">Đọc Thuyết văn giải tự →</a> · <a class="text-btn" href="#dictionary/studies">Các mục vừa viết lại →</a></p>
  <p><a class="btn" href="#dictionary/guess">Đoán chữ chưa học</a> Mở <strong>Sơ đồ chữ & từ</strong> trong bất kỳ thẻ nào. Thử với <a class="text-btn" href="#dictionary/graph/学校" lang="zh-CN">学校</a>, <a class="text-btn" href="#dictionary/graph/晚饭" lang="zh-CN">晚饭</a> hoặc <a class="text-btn" href="#dictionary/graph/抱" lang="zh-CN">抱</a>.</p>
  <div class="toolbar"><input id="dict-search" type="text" inputmode="search" placeholder="Tìm chữ, pinyin không dấu, nghĩa hoặc Hán Việt…" aria-label="Tìm trong kho từ" value="${esc(dictQuery)}"><label><span class="sr-only">Phạm vi từ</span><select id="dict-scope">${scopeOptions(dictScope)}</select></label><label><input type="checkbox" id="dict-py"${dictPy?' checked':''}> Hiện pinyin</label></div>
  <div class="section-top"><span class="tiny muted">${filtered.length} mục trong bộ lọc này</span><button class="text-btn" id="practice-filter">Luyện bộ từ này →</button></div>
  <div class="word-grid">${filtered.slice(dictPage*pageSize,(dictPage+1)*pageSize).map(w=>`<button class="word-card" data-detail="${esc(w.han)}"><span class="han" lang="zh-CN">${esc(w.han)}</span>${dictPy?`<span class="py">${esc(w.py)}</span>`:''}<span class="gloss">${esc(w.gloss)}</span><span class="cat">${esc(w.category)}${db.words[w.id]?' · Đã ôn':''}</span></button>`).join('')}</div>
  ${!filtered.length?'<div class="empty">Chưa có mục phù hợp. Thử từ khóa khác hoặc chọn “Toàn bộ ${words.length} mục”.</div>':''}
  <div class="pagination"><button class="btn" id="page-prev"${dictPage===0?' disabled':''}>← Trước</button><span>${dictPage+1} / ${pages}</span><button class="btn" id="page-next"${dictPage>=pages-1?' disabled':''}>Sau →</button></div>
  <p class="support-note">Không cộng các ví dụ thành mục mới. Đã bổ sung bài 12: 24 dòng trong sách gộp thành 23 mục khác nhau; 19 mục mới, 4 mục đã có được cập nhật nghĩa. Bài 13 có 20 mục: 11 mới và 9 ôn lại; 女士 đã được bạn xác nhận.</p>`;
  $('#dict-search').addEventListener('input',e=>{const pos=e.target.selectionStart;dictQuery=e.target.value;dictPage=0;dictionary();$('#dict-search').focus();$('#dict-search').setSelectionRange(pos,pos);});
  $('#dict-scope').onchange=e=>{dictScope=e.target.value;dictPage=0;dictionary();};$('#dict-py').onchange=e=>{dictPy=e.target.checked;dictionary();};
  $('#page-prev').onclick=()=>{dictPage--;dictionary();window.scrollTo(0,0);};$('#page-next').onclick=()=>{dictPage++;dictionary();window.scrollTo(0,0);};
  $('#practice-filter').onclick=()=>{pendingPool=filtered;go('#play/meaning');};
 }
 let pendingPool=null,pendingLesson=null;
 function detail(han,expandGraph=false,startGuess=false){
  const w=byHan.get(han);
  if(!w)return;
  const s=db.words[w.id];
  const graphMarkup=characterGraph.markup(han,esc,expandGraph);
  $('#word-detail').innerHTML=window.HAN_LEXICON.render(w,{esc,audio:audioButton,graph:graphMarkup})+`<div class="chip-row"><a class="btn" href="#wordlab/recall/${esc(w.id)}">Tự nhớ lại chữ</a><a class="btn" href="#wordlab/write/${esc(w.id)}">Viết tay từ trí nhớ</a>${(w.hsk2Lessons||[]).map(n=>`<a class="btn" href="#hsk2/${n}">HSK 2 · Bài ${n}</a>`).join('')}</div><p class="tiny muted">${s?'Đã gặp '+s.seen+' lượt trong trò chơi.':'Chưa ôn mục này trên trình duyệt này.'}</p>${learningUI.showSchedule(w.id)}<p class="support-note" data-voice-status>${esc(voiceStatus())}</p>`;
  const graph=$('#word-detail .character-graph');
  const dialog=$('#word-dialog');
  if(!dialog.open)dialog.showModal();
  dialog.scrollTop=0;
  if(graph)characterGraph.bind(graph,esc,audioButton,startGuess);
 }
 $('.dialog-close').onclick=()=>$('#word-dialog').close();$('#word-dialog').addEventListener('click',e=>{if(e.target===$('#word-dialog'))$('#word-dialog').close();});
 function setup(mode,reading=null){
  const m=modes[mode];if(!m){home();return;}
  const isApplied=['sentence','context','numbers'].includes(mode);
  const back=reading?.back||'#games';
  app.innerHTML=`<div class="study-shell"><a class="back-btn" href="${esc(back)}" style="text-decoration:none">← ${reading?'Về bài đọc':'Chọn kiểu chơi khác'}</a><section class="setup"><div class="eyebrow">${m.level}</div><h1>${m.title}</h1><p>${m.desc}</p>${reading?`<p id="article-game-set"><strong>${reading.words.length} từ trong bài</strong> <span>${esc(reading.title)}</span></p>`:pendingLesson==='lesson13'?'<p class="badge">BỘ RIÊNG BÀI 13</p>':''}
  ${!isApplied&&!reading?`<label for="study-scope">Bộ từ muốn ôn</label><select id="study-scope">${pendingPool?`<option value="filtered">${pendingLesson==='lesson13'?pendingPool.length+' mục của bài 13':'Bộ từ đang lọc trong từ điển'}</option>`:scopeOptions()}</select>`:''}
  ${['sentence','context'].includes(mode)?'<label for="study-level">Độ khó</label><select id="study-level"><option value="1">01 · Cơ bản — câu ngắn, nghĩa rõ</option><option value="2">02 · Vận dụng — thời gian, vị trí, đang làm gì</option><option value="3">03 · Vận dụng cao — nhiều mốc, từ dễ nhầm</option><option value="all">Trộn cả ba mức</option></select>':''}
  ${mode==='numbers'?'<label for="number-kind">Loại số</label><select id="number-kind"><option value="all">Trộn số đếm, giờ, điện thoại, tiền, ngày, thứ tự</option><option value="time">Giờ & phút</option><option value="digits">Số điện thoại / mã số</option><option value="cardinal">Số đếm</option><option value="money">Giá tiền</option><option value="date">Tháng & ngày</option><option value="ordinal">Số thứ tự</option></select>':''}
  ${reading?'':'<label for="study-count">Độ dài lượt học</label><select id="study-count"><option value="10">10 câu / thẻ</option><option value="5">5 câu / thẻ · học nhanh</option><option value="20">20 câu / thẻ · ôn kỹ</option></select>'}
  ${mode==='flash'?'<label class="switch-label"><input id="flash-pinyin" type="checkbox"> Hiện pinyin ngay trên mặt trước</label>':''}
  ${mode==='listen'?`<div class="note-panel"><div><strong>Âm thanh do thiết bị cung cấp</strong><p data-voice-status>${esc(voiceStatus())}</p><p>Ưu tiên giọng phổ thông zh-CN. Bấm nút nghe trong mỗi câu; site không thu âm hoặc chấm giọng nói của bạn.</p></div></div>`:''}
  ${mode==='pairs'?'<p class="support-note">Mỗi vòng ghép 5 cặp. Số đã chọn ở trên là tổng cặp, làm tròn theo vòng.</p>':''}
  <button class="btn primary" id="start-session">Vào lượt học →</button><p class="support-note">Không tính giờ. Sau mỗi đáp án có chữ Hán + nghĩa + pinyin để bạn đọc lại.</p><div id="setup-error" role="status"></div></section></div>`;
  $('#start-session').onclick=()=>start(mode,reading);
 }
 function start(mode,reading){
  const count=reading?.words.length??Number($('#study-count').value),scope=$('#study-scope')?.value||'daily',level=$('#study-level')?.value||'all';
  const p=reading?.words??(scope==='filtered'?(pendingPool||[]):pool(scope));
  if(mode==='listen'){updateVoices();if(!selectedVoice){$('#setup-error').innerHTML='<p class="warning">Chưa có giọng tiếng Trung. Bật giọng 普通话 (zh-CN) của thiết bị rồi thử lại, hoặc <a href="#play/reading">luyện chữ → pinyin</a> trước.</p>';return;}}
  if(!['sentence','context','numbers'].includes(mode)&&(p.length<(mode==='flash'?1:mode==='pairs'?5:4)||(mode==='pairs'&&uniqueSample(p,5).length<5))){$('#setup-error').innerHTML='<p class="warning">Bộ lọc chưa đủ mục phân biệt được cho kiểu chơi này. Chọn bộ từ rộng hơn (ít nhất 4 từ, ghép đôi cần 5 nghĩa khác nhau), hoặc ôn bằng lật thẻ.</p>';return;}
  session={mode,count,index:0,correct:0,missed:[],answered:false,scope,level,reading,flashPy:!!$('#flash-pinyin')?.checked,selected:[],used:[],pairSelection:null,pairMatched:[],pairCount:0,roundHadError:false};
  if(['sentence','context'].includes(mode)){const source=pendingLesson==='lesson13'?window.HAN_LESSON13:lessons;const bank=mode==='sentence'?source.sentences:source.contexts;session.items=shuffle(bank.filter(x=>level==='all'||x[0]===Number(level))).slice(0,count);}
  else if(mode==='numbers')session.items=makeNumbers(count,$('#number-kind').value);
  else if(mode==='pairs'){session.items=Array.from({length:Math.ceil(count/5)},()=>uniqueSample(p,5));session.totalPairs=session.items.length*5;}
  else{session.items=weighted(p).slice(0,count);session.pool=p;}
  pendingPool=null;pendingLesson=null;renderQuestion();window.scrollTo(0,0);
 }
 function weighted(p){return shuffle(p).sort((a,b)=>Number(needsReview(b))-Number(needsReview(a))||Math.min(...E.CORE.map(k=>E.getCard(db.learning,a.id,k).due))-Math.min(...E.CORE.map(k=>E.getCard(db.learning,b.id,k).due)));}
 function uniqueSample(p,n,field='gloss'){
  const seen=new Set(),out=[];for(const w of shuffle(p)){const g=plain(w[field]);if(!seen.has(g)){seen.add(g);out.push(w);}if(out.length===n)break;}return out;
 }
 const synonymous=[['哪儿','哪里'],['那儿','那里','那边'],['这儿','这边'],['睡','睡觉'],['学','学习'],['些','一些'],['元','块'],['家','家里'],['号','号码'],['二','两']];
 const soundKey=s=>String(s).normalize('NFC').toLowerCase().replace(/[\s’'·.,/]/g,'');
 function choicesFor(w,field,mode=session?.mode,sourcePool=session?.pool||words){
  const exclude=new Set([w.han,...synonymous.filter(g=>g.includes(w.han)).flat()]);
  const key=field==='py'?soundKey:plain;
  const candidates=shuffle(sourcePool).filter(x=>!exclude.has(x.han)&&key(x[field])!==key(w[field])&&(!['listen','listening'].includes(mode)||soundKey(x.py)!==soundKey(w.py)));
  if(field==='py')candidates.sort((a,b)=>Number(plain(b.py)===plain(w.py))-Number(plain(a.py)===plain(w.py)));
  const contrasts=[['买','卖'],['在','再'],['半','班'],['那','哪','那儿','哪儿'],['有','是','在'],['会','知道','认识'],['点','分','分钟','小时']];
  const close=new Set(contrasts.filter(g=>g.includes(w.han)).flat());
  const weight=x=>(db.learning.confusions[[w.id,x.id].sort().join('|')]?.count||0)*100+(close.has(x.han)?20:0)+(field==='py'&&plain(x.py)===plain(w.py)?5:0);
  candidates.sort((a,b)=>weight(b)-weight(a));
  const seen=new Set([key(w[field])]),out=[w];for(const c of candidates){if(seen.has(key(c[field])))continue;seen.add(key(c[field]));out.push(c);if(out.length===4)break;}
  return shuffle(out);
 }
 function shell(content){const s=session,m=modes[s.mode];app.innerHTML=`<section class="study-shell"><div class="session-top"><a class="back-btn" href="${esc(s.reading?.back||'#games')}">← ${s.reading?'Về bài đọc':'Dừng lượt học'}</a><span>${m.title}</span><span>${s.index+1} / ${s.items.length}${s.mode==='pairs'?' vòng':''}</span></div><div class="progress-track" aria-label="Tiến trình"><div class="progress-fill" style="width:${s.index/s.items.length*100}%"></div></div>${content}<div id="answer-area" aria-live="polite" aria-atomic="true"></div></section>`;}
 function renderQuestion(){
  const s=session;if(!s)return;if(s.index>=s.items.length){finish();return;}s.answered=false;s.revealed=false;
  if(s.mode==='flash'){renderFlash();return;}if(s.mode==='pairs'){renderPairs();return;}if(s.mode==='sentence'){renderSentence();return;}if(s.mode==='context'){renderContext();return;}if(s.mode==='numbers'){renderNumber();return;}
  const w=s.items[s.index];let prompt,field;
  if(s.mode==='meaning'){prompt=`<div class="question-label">Chữ này có nghĩa gì?</div><div class="question-han" lang="zh-CN">${esc(w.han)}</div>`;field='gloss';}
  if(s.mode==='character'){prompt=`<div class="question-label">Chọn mặt chữ Hán phù hợp</div><div class="question-text">${esc(w.gloss)}</div>`;field='han';}
  if(s.mode==='reading'){prompt=`<div class="question-label">Chọn cách đọc pinyin đúng</div><div class="question-han" lang="zh-CN">${esc(w.han)}</div><p class="tiny muted">Hãy tự đọc một lần trước khi chọn.</p>`;field='py';}
  if(s.mode==='listen'){prompt=`<div class="question-label">Nghe rồi chọn đúng mặt chữ</div><button class="audio-prompt" id="hear-prompt" aria-label="Nghe từ cần tìm">♪</button><button class="text-btn" id="hear-slow">Nghe chậm</button><p class="tiny muted">Không hiện pinyin trước đáp án. Có thể nghe lại nhiều lần.</p>`;field='han';}
  const options=choicesFor(w,field==='han'?'gloss':field);s.options=options;
  shell(`<div class="question-card">${prompt}</div><div class="choice-grid">${options.map((o,i)=>`<button class="choice ${field==='han'?'han-choice':''}" data-answer="${i}"><span class="num">${i+1}</span><span class="answer-label">${esc(o[field])}</span></button>`).join('')}</div><p class="support-note">Phím 1–${options.length} để chọn · Enter để sang câu sau khi xem đáp án.</p>`);
  $$('[data-answer]').forEach(b=>b.onclick=()=>answerWord(Number(b.dataset.answer)));
  if(s.mode==='listen'){$('#hear-prompt').onclick=()=>speak(w.han);$('#hear-slow').onclick=()=>speak(w.han,true);}
 }
 function markChoices(correct,chosen){$$('[data-answer]').forEach((b,i)=>{b.disabled=true;if(i===correct)b.classList.add('correct');if(i===chosen&&i!==correct)b.classList.add('wrong');});}
 function answerWord(i){const s=session;if(s.answered)return;const w=s.items[s.index],ok=s.options[i].id===w.id;if(!ok)E.confuse(db.learning,w.id,s.options[i].id);s.answered=true;markChoices(s.options.findIndex(x=>x.id===w.id),i);track(w,ok,modes[s.mode].skill);if(ok)s.correct++;else s.missed.push(w);feedback(ok,wordFeedback(w));}
 function wordFeedback(w){return `<div class="han" lang="zh-CN">${esc(w.han)}</div><p class="py">${esc(w.py)}</p><p><strong>${esc(w.meaning)}</strong></p><p class="tiny muted">Hán Việt: ${esc(w.hv)} · ${esc(w.note||'Đọc thành tiếng rồi thử dùng trong một câu ngắn.')}</p><div class="chip-row" style="margin-top:12px">${audioButton(w.han)}<button class="btn" data-say="${esc(w.han)}" data-slow="1">Nghe chậm</button><button class="text-btn" data-detail="${esc(w.han)}">Xem thẻ từ</button></div>`;}
 function feedback(ok,html,heading){$('#answer-area').innerHTML=`<div class="feedback ${ok?'':'error'}"><h3>${heading||(ok?'Đúng rồi. Đọc lại để nhớ nhé.':'Chưa đúng. Cùng nhìn lại một lần.')}</h3>${html}<div class="feedback-actions"><span class="tiny muted">Nhìn chữ → đọc âm → nhắc nghĩa</span><button class="btn primary" id="next-question">${session.index+1>=session.items.length?'Xem lượt ôn':'Tiếp theo'} →</button></div></div>`;$('#next-question').onclick=next;}
 function next(){if(!session?.answered)return;session.index++;renderQuestion();window.scrollTo({top:0,behavior:'instant'});}
 function renderFlash(){const s=session,w=s.items[s.index];shell(`<div class="question-card"><div class="question-label">Tự nói nghĩa và cách đọc trước khi lật thẻ</div><button class="flash-word" id="flip-card" aria-label="Lật thẻ ${esc(w.han)}"><div><div class="question-han" lang="zh-CN">${esc(w.han)}</div>${s.flashPy?`<p class="question-py">${esc(w.py)}</p>`:''}<span class="flash-hint">Bấm thẻ hoặc phím cách để lật</span></div></button><div id="flash-back" hidden></div></div>`);$('#flip-card').onclick=flipFlash;}
 function flipFlash(){const s=session;if(s.revealed)return;s.revealed=true;const w=s.items[s.index];$('#flash-back').hidden=false;$('#flash-back').innerHTML=`<div class="flash-detail">${wordFeedback(w)}<div class="flash-actions"><button class="btn" id="flash-no">Cần học lại</button><button class="btn primary" id="flash-yes">Đã tự nhớ được ✓</button></div><p class="support-note">Đây là tự đánh giá, không phải kết quả kiểm tra phát âm.</p></div>`;$('#flash-no').onclick=()=>gradeFlash(false);$('#flash-yes').onclick=()=>gradeFlash(true);}
 function gradeFlash(ok){const s=session;if(s.answered)return;s.answered=true;const w=s.items[s.index];track(w,ok,'self',true);if(ok)s.correct++;else s.missed.push(w);next();}
 function renderPairs(){const s=session;s.pairSelection=null;s.pairMatched=[];s.pairCount=0;s.roundHadError=false;s.pairRight=shuffle(s.items[s.index]);shell(`<div class="question-card"><div class="question-label">Chọn một chữ bên trái, rồi chọn nghĩa bên phải</div><h2>Ghép 5 cặp chữ & nghĩa</h2><p class="tiny muted">Đúng một cặp sẽ hiện pinyin để bạn đọc lại.</p><div class="pair-board"><div class="pair-column">${s.items[s.index].map((w,i)=>`<button class="pair-tile han" data-pair-side="left" data-pair="${i}">${esc(w.han)}</button>`).join('')}</div><div class="pair-column">${s.pairRight.map((w,i)=>`<button class="pair-tile" data-pair-side="right" data-pair="${i}">${esc(w.gloss)}</button>`).join('')}</div></div><div id="pair-feedback" aria-live="polite" class="support-note">Còn 5 cặp.</div></div>`);
  $$('[data-pair]').forEach(b=>b.onclick=()=>pairClick(b));
 }
 function pairClick(b){const s=session;if(s.answered)return;const side=b.dataset.pairSide,i=Number(b.dataset.pair),w=side==='left'?s.items[s.index][i]:s.pairRight[i];if(s.pairMatched.includes(w.id))return;
  const prior=s.pairSelection;if(!prior||prior.side===side){$$('.pair-tile').forEach(t=>t.classList.remove('selected','error'));b.classList.add('selected');s.pairSelection={side,i,w,b};return;}
  const ok=prior.w.id===w.id;track(prior.side==='left'?prior.w:w,ok,'recognition');$$('.pair-tile').forEach(t=>t.classList.remove('selected','error'));s.pairSelection=null;
  if(ok){s.correct++;s.pairMatched.push(w.id);s.pairCount++;for(const t of [prior.b,b]){t.classList.add('matched');t.disabled=true;}$('#pair-feedback').innerHTML=`<strong class="inline-han">${esc(w.han)}</strong> · ${esc(w.py)} · ${esc(w.gloss)} ${audioButton(w.han)}<br>Còn ${5-s.pairCount} cặp.`;
   if(s.pairCount===5){s.answered=true;feedback(true,'<p>Đã ghép đủ 5 cặp. Thử đọc lại tất cả trước khi sang vòng tiếp.</p>');}}
  else{s.roundHadError=true;s.missed.push(prior.side==='left'?prior.w:w);prior.b.classList.add('error');b.classList.add('error');$('#pair-feedback').textContent='Hai thẻ này chưa khớp. Hãy chọn lại một chữ bên trái và một nghĩa bên phải.';}
 }
 function renderSentence(){const s=session,q=s.items[s.index];s.selected=[];s.tokens=shuffle(q[2].split(' ').map((text,id)=>({text,id})));shell(`<div class="question-card"><div class="question-label">MỨC ${q[0]} · Xếp thành câu tiếng Trung</div><h2 class="question-text">${esc(q[1])}</h2><p class="tiny muted">Bấm các mảnh từ theo thứ tự. Bấm mảnh trong câu để trả lại.</p><div class="sentence-slot" id="sentence-slot"></div><div class="token-bank" id="token-bank"></div><div class="sentence-actions"><button class="btn" id="clear-sentence">Xếp lại</button><button class="btn primary" id="check-sentence">Kiểm tra câu</button></div><p class="support-note">Chấp nhận các trật tự tương đương đã được soạn cho bài này.</p></div>`);renderTokens();$('#clear-sentence').onclick=()=>{s.selected=[];renderTokens();};$('#check-sentence').onclick=checkSentence;}
 function renderTokens(){const s=session;$('#sentence-slot').innerHTML=s.selected.length?s.selected.map((t,i)=>`<button class="token" data-remove-token="${i}" aria-label="Trả lại ${esc(t.text)}">${esc(t.text)}</button>`).join(''):'<span class="placeholder">Câu của bạn sẽ xuất hiện ở đây</span>';
  $('#token-bank').innerHTML=s.tokens.map((t,i)=>`<button class="token" data-add-token="${i}"${s.selected.some(x=>x.id===t.id)?' disabled':''}>${esc(t.text)}</button>`).join('');
  $$('[data-add-token]').forEach(b=>b.onclick=()=>{if(!s.answered){s.selected.push(s.tokens[Number(b.dataset.addToken)]);renderTokens();}});$$('[data-remove-token]').forEach(b=>b.onclick=()=>{if(!s.answered){s.selected.splice(Number(b.dataset.removeToken),1);renderTokens();}});
 }
 function checkSentence(){const s=session;if(s.answered)return;if(s.selected.length!==s.tokens.length){toast('Hãy dùng hết các mảnh từ rồi kiểm tra.');return;}
  const q=s.items[s.index],answer=s.selected.map(t=>t.text).join(''),valid=[q[2],...(q[5]||[])].map(x=>x.replace(/ /g,'')),ok=valid.includes(answer);s.answered=true;track(null,ok,'sentence');if(ok)s.correct++;else s.missed.push({han:q[2].replace(/ /g,''),py:q[3],gloss:q[1]});$$('.token,.sentence-actions button').forEach(b=>b.disabled=true);
  feedback(ok,`<div class="han">${esc(q[2].replace(/ /g,''))}。</div><p class="py">${esc(q[3])}</p><p>${esc(q[1])}</p><p>${esc(q[4])}</p>${audioButton(q[2].replace(/ /g,''))}`,ok?undefined:'Chưa khớp trật tự mẫu. Xem cách tổ chức câu:');
 }
 function renderContext(){const s=session,q=s.items[s.index];s.contextOptions=shuffle(q[2].map((text,id)=>({text,id})));shell(`<div class="question-card"><div class="question-label">MỨC ${q[0]} · Chọn cách nói hợp tình huống</div><h2 class="question-text">${esc(q[1])}</h2></div><div class="choice-grid">${s.contextOptions.map((c,i)=>`<button class="choice" data-answer="${i}"><span class="num">${i+1}</span><span class="answer-label ${/[\u3400-\u9fff]/.test(c.text)?'inline-han':''}">${esc(c.text)}</span></button>`).join('')}</div>`);$$('[data-answer]').forEach(b=>b.onclick=()=>{if(s.answered)return;const i=Number(b.dataset.answer),ok=s.contextOptions[i].id===q[3];s.answered=true;markChoices(s.contextOptions.findIndex(c=>c.id===q[3]),i);track(null,ok,'context');if(ok)s.correct++;else s.missed.push({han:q[2][q[3]],py:q[5],gloss:q[1]});feedback(ok,`<div class="han">${esc(q[2][q[3]])}</div><p class="py">${esc(q[5])}</p><p>${esc(q[4])}</p>${/[\u3400-\u9fff]/.test(q[2][q[3]])?audioButton(q[2][q[3]]):''}`);});}
 const digits=['零','一','二','三','四','五','六','七','八','九'];
 function cn(n){if(n<10)return digits[n];if(n<20)return '十'+(n%10?digits[n%10]:'');if(n<100)return digits[Math.floor(n/10)]+'十'+(n%10?digits[n%10]:'');return digits[Math.floor(n/100)]+'百'+(n%100?(n%100<10?'零'+digits[n%100]:n%100<20?'一'+cn(n%100):cn(n%100)):'');}
 const pyd=['líng','yī','èr','sān','sì','wǔ','liù','qī','bā','jiǔ'];
 function pyNumber(n){if(n<10)return pyd[n];if(n<20)return 'shí'+(n%10?' '+pyd[n%10]:'');if(n<100)return pyd[Math.floor(n/10)]+' shí'+(n%10?' '+pyd[n%10]:'');return pyd[Math.floor(n/100)]+' bǎi'+(n%100?' '+(n%100<10?'líng ':n%100<20?'yī ':'')+pyNumber(n%100):'');}
 const rand=(lo,hi)=>Math.floor(Math.random()*(hi-lo+1))+lo;
 function makeNumbers(count,kind){const kinds=['time','digits','cardinal','money','date','ordinal'];return Array.from({length:count},(_,i)=>{
  const k=kind==='all'?kinds[i%kinds.length]:kind;
  if(k==='time'){const pm=rand(0,1),h=pm?rand(1,11):rand(6,11),min=[0,5,7,15,20,25,30,40,50][rand(0,8)],period=pm?(h>=6?'晚上':'下午'):'上午',minute=min===30?'半':min===0?'':(min<10?'零':'')+cn(min)+'分';return {kind:k,han:period+(h===2?'两':cn(h))+'点'+minute,py:(pm?(h>=6?'wǎnshang':'xiàwǔ'):'shàngwǔ')+' '+(h===2?'liǎng':pyNumber(h))+' diǎn'+(min===30?' bàn':min?' '+(min<10?'líng ':'')+pyNumber(min)+' fēn':''),answer:String(h+(pm?12:0)).padStart(2,'0')+':'+String(min).padStart(2,'0'),hint:'Nhập giờ 24 giờ, ví dụ 14:05',note:'点 là mốc giờ. 两点 = 2 giờ; 半 = 30 phút. 上午 sáng / 下午 chiều / 晚上 tối.'};}
  if(k==='digits'){const val=Array.from({length:5},()=>rand(0,9));val[1]=1;return {kind:k,han:val.map(n=>n===1?'幺':digits[n]).join(''),py:val.map(n=>n===1?'yāo':pyd[n]).join(' '),answer:val.join(''),hint:'Nhập đủ 5 chữ số (giữ cả số 0 ở đầu)',note:'Số điện thoại/mã đọc từng chữ số. 1 thường đọc 幺 yāo; 2 là 二 èr, không dùng 两.'};}
  if(k==='money'){const yuan=rand(1,29),jiao=[0,2,5,8][rand(0,3)],fen=jiao===0?[2,5][rand(0,1)]:0;return {kind:k,han:(yuan===2?'两':cn(yuan))+'块'+(jiao?(jiao===2?'两':cn(jiao))+'毛':'零'+cn(fen)+'分'),py:(yuan===2?'liǎng':pyNumber(yuan))+' kuài '+(jiao?(jiao===2?'liǎng':pyNumber(jiao))+' máo':'líng '+pyNumber(fen)+' fēn'),answer:(yuan+jiao/10+fen/100).toFixed(2),hint:'Nhập số tiền, ví dụ 6.02 (dấu chấm hoặc phẩy)',note:'1元/块 = 10角/毛 = 100分. 六块两毛 = 6.20元; 六块零二分 = 6.02元.'};}
  if(k==='date'){const m=rand(1,12),d=rand(1,28);return {kind:k,han:cn(m)+'月'+cn(d)+'号',py:pyNumber(m)+' yuè '+pyNumber(d)+' hào',answer:m+'/'+d,hint:'Nhập tháng/ngày, ví dụ 8/20',note:'Tiếng Trung: tháng trước, ngày sau. 二月 = tháng 2, không dùng 两月 để gọi tháng 2.'};}
  const n=rand(0,399);if(k==='ordinal')return {kind:k,han:'第'+cn(n+1),py:'dì '+pyNumber(n+1),answer:String(n+1),hint:'Nhập số thứ tự bằng chữ số, ví dụ 32',note:'第 + số đếm tạo số thứ tự. 第二 dì èr = thứ hai; không dùng 第两.'};
  return {kind:k,han:cn(n),py:pyNumber(n),answer:String(n),hint:'Nhập số lượng bằng chữ số, ví dụ 102',note:'Số lượng đọc theo hàng trăm, chục, đơn vị. 一百零二 = 102; khác chuỗi số 幺零二.'};
 });}
 function normalNumber(v,kind){v=String(v).trim().normalize('NFKC').replace(/\s/g,'');if(kind==='money'){v=v.replace(',','.');return /^\d+(\.\d{1,2})?$/.test(v)?Number(v).toFixed(2):'';}if(kind==='time'){const m=v.match(/^(\d{1,2})[:hH](\d{1,2})$/);return m?m[1].padStart(2,'0')+':'+m[2].padStart(2,'0'):'';}if(kind==='date'){const m=v.match(/^(\d{1,2})[/-](\d{1,2})$/);return m?Number(m[1])+'/'+Number(m[2]):'';}return /^\d+$/.test(v)?(kind==='digits'?v:String(Number(v))):'';}
 function renderNumber(){const s=session,q=s.items[s.index],labels={time:'MỐC GIỜ',digits:'ĐIỆN THOẠI / MÃ',cardinal:'SỐ ĐẾM',money:'GIÁ TIỀN',date:'THÁNG / NGÀY',ordinal:'SỐ THỨ TỰ'};shell(`<div class="question-card"><div class="question-label">${labels[q.kind]} · Đọc chữ, hiểu con số</div><div class="question-han" style="font-size:clamp(37px,7vw,62px)">${q.han}</div><p class="tiny muted">${q.hint}</p><form id="number-form"><label class="sr-only" for="number-answer">Đáp án bằng chữ số</label><input class="number-input" id="number-answer" inputmode="${q.kind==='money'?'decimal':'text'}" autocomplete="off" placeholder="${q.kind==='time'?'HH:MM':q.kind==='date'?'tháng/ngày':'…'}"><button class="btn primary" type="submit">Kiểm tra →</button></form></div>`);$('#number-form').onsubmit=e=>{e.preventDefault();if(s.answered)return;const value=$('#number-answer').value;if(!value.trim()){toast('Nhập con số bạn đọc được rồi kiểm tra nhé.');return;}const ok=normalNumber(value,q.kind)===normalNumber(q.answer,q.kind);s.answered=true;track(null,ok,'numbers');if(ok)s.correct++;else s.missed.push({han:q.han,py:q.py,gloss:q.answer});$('#number-answer').disabled=true;$('#number-form button').disabled=true;feedback(ok,`<div class="han">${q.han} → ${q.answer}</div><p class="py">${q.py}</p><p>${q.note}</p>${audioButton(q.han)}`);};}
 function finish(){const s=session,total=s.mode==='pairs'?s.totalPairs:s.items.length;db.sessions.push({mode:s.mode,time:Date.now(),correct:s.correct,total});db.sessions=db.sessions.slice(-100);save();const missed=[...new Map(s.missed.map(w=>[w.han,w])).values()];app.innerHTML=`<section class="study-shell result"><div class="result-seal">学</div><div class="eyebrow">ĐÃ HOÀN THÀNH MỘT LƯỢT ÔN</div><h1>Thêm một lần gặp, thêm một lần nhớ.</h1><div class="result-score">${s.correct}<span class="muted" style="font-size:24px"> / ${total}</span></div><p class="muted">${s.mode==='flash'?'Thẻ bạn tự đánh giá nhớ được.':s.mode==='pairs'?'Cặp đã ghép hoàn tất. Các lần ghép sai được lưu riêng vào sổ ôn.':'Câu trả lời đúng trong lượt này.'}<br>Đây là kết quả luyện tập, không phải chứng nhận đã thuộc hoặc phát âm chuẩn.</p>${missed.length?`<h3 style="margin-top:30px">Dành thêm một lần cho những mục này</h3><div class="review-list" style="justify-content:center">${missed.slice(0,20).map(w=>byHan.has(w.han)?`<button data-detail="${esc(w.han)}" title="${esc(w.py+' · '+w.gloss)}">${esc(w.han)}</button>`:`<span class="review-static"><span class="inline-han">${esc(w.han)}</span><br><small>${esc(w.py)}</small></span>`).join('')}</div>`:'<p class="tiny muted">Lần sau thử một kiểu chơi khác để kiểm tra trí nhớ theo chiều ngược lại.</p>'}<div class="result-actions"><button class="btn primary" id="replay">Chơi thêm một lượt</button><a class="btn" href="${esc(s.reading?.back||'#games')}">${s.reading?'Về bài đọc':'Chọn trò khác'}</a><a class="btn" href="#progress">Xem sổ ôn</a></div></section>`;$('#replay').onclick=()=>{session=null;setup(s.mode,s.reading);window.scrollTo(0,0);};}
 function readingPage(){app.innerHTML=`<div class="page-head"><div><div class="eyebrow">ĐỌC BẰNG PINYIN · HIỂU QUA HÁN VIỆT</div><h1>Chữ có hình. Âm có cách.</h1><p>Đọc từng từ thành tiếng: âm đầu → vần → thanh điệu. Dùng nút nghe để đối chiếu; site chưa nghe và chấm được phát âm của bạn.</p></div><a class="btn primary" href="#play/reading">Luyện cách đọc →</a></div><p class="support-note" data-voice-status>${esc(voiceStatus())}</p><div class="tone-list"><div class="tone-box"><strong>mā →</strong><span>Thanh 1 · cao, ngang</span></div><div class="tone-box"><strong>má ↗</strong><span>Thanh 2 · đi lên</span></div><div class="tone-box"><strong>mǎ ∨</strong><span>Thanh 3 · thấp</span></div><div class="tone-box"><strong>mà ↘</strong><span>Thanh 4 · hạ nhanh</span></div></div><div class="reading-grid">
  <article class="reading-card"><h3>j / q: cùng vị trí, khác luồng hơi</h3><p>Đầu lưỡi tựa gần mặt sau răng dưới. Mặt trước của lưỡi nâng gần ngạc cứng; không cuộn đầu lưỡi như zh / ch.</p><p><strong>j</strong>: tắc rồi xát, ít bật hơi. <strong>q</strong>: cùng vị trí, bật hơi rõ. Để mảnh giấy trước miệng: q làm giấy rung rõ hơn j. Đây không phải đối lập “có tiếng / không tiếng”.</p><div class="reading-demo"><span class="inline-han">几</span> jǐ ${audioButton('几')}<span class="inline-han">七</span> qī ${audioButton('七')}</div><p class="tiny muted">Luyện cặp jī — qī trước, rồi mới thêm thanh. Không đọc j thành “gi” tiếng Việt một cách máy móc.</p></article>
  <article class="reading-card"><h3>ü: giữ lưỡi của i, tròn môi</h3><p>Đọc i, giữ vị trí lưỡi phía trước rồi chu môi như u. Âm tạo ra là ü. Sau <strong>j, q, x</strong>, hai chấm được lược trong chữ viết pinyin nhưng âm vẫn là ü.</p><div class="reading-demo"><span class="inline-han">去</span> qù ${audioButton('去')}<span class="inline-han">女</span> nǚ ${audioButton('女')}</div><p class="tiny muted">qù không có vần u như trong 不 bù. Với n / l, dấu hai chấm cần giữ để phân biệt: nǚ khác nǔ.</p></article>
  <article class="reading-card"><h3>z / c · zh / ch</h3><p>z / c dùng đầu lưỡi ở vùng răng — lợi. zh / ch lùi ra sau hơn, đầu lưỡi nâng lên. Trong từng cặp, <strong>c / ch bật hơi</strong> rõ hơn z / zh.</p><div class="reading-demo"><span class="inline-han">字 / 吃</span>${audioButton('字，吃')}<span class="inline-han">这</span>${audioButton('这')}</div><p class="tiny muted">i trong zi, ci, zhi, chi không giống nguyên âm i trong 七 qī. Nghe theo cả âm tiết, tránh ghép từng chữ cái như tiếng Việt.</p></article>
  <article class="reading-card"><h3>Thanh nhẹ và biến điệu</h3><p>子 trong 杯子 bēizi, 弟 thứ hai trong 弟弟 dìdi thường đọc nhẹ, ngắn. Dấu không ghi ở âm nhẹ.</p><p>Hai thanh 3 đi liền: âm đầu thường đọc thành thanh 2. Ví dụ 你好 viết <strong>nǐ hǎo</strong>, khi nói thường gần <strong>ní hǎo</strong>. Thanh 3 trước thanh khác thường chỉ xuống thấp, không cần uốn đầy đủ.</p><div class="reading-demo"><span class="inline-han">你好 · 杯子</span>${audioButton('你好，杯子')}</div><p class="tiny muted">不 bù trước thanh 4 thường thành bú; 一 yī thay đổi theo âm sau. Pinyin từ điển và cách đọc trong câu có thể khác ở đây.</p></article></div>
  <div class="section-top"><h2>Hiểu cả họ, nhớ từng chữ</h2><span class="level-tag">GHÉP TỪ ≠ PHÂN TÍCH CHỮ</span></div><div class="reading-grid">${lessons.families.map(f=>`<article class="reading-card"><h3>${f.title}</h3><div class="network">${f.words.filter(h=>byHan.has(h)).map(h=>`<button data-detail="${h}">${h}</button>`).join('')}</div><p>${f.text}</p></article>`).join('')}</div>
  <div class="section-top"><h2>Cùng gần nghĩa, khác cách dùng</h2></div><div class="reading-grid">${lessons.confusions.map(c=>`<article class="reading-card"><h3>${c[0]}</h3><p class="inline-han">${c[1]}</p><p style="color:var(--orange)">${c[2]}</p><p>${c[3]}</p><p class="definition">${c[4]}</p>${audioButton(c[1])}</article>`).join('')}</div><p class="support-note">Phần gợi nhớ dựa vào cấu tạo và cách dùng, không dựng chuyện nguồn gốc chữ. Âm Hán Việt dùng để liên hệ vốn từ; không phải mọi tổ hợp đều là từ người Việt thường nói.</p>`;}
 function progressPage(){const s=getStats(),total=Object.values(db.skills).reduce((a,v)=>a+v.total,0),review=words.filter(needsReview);app.innerHTML=`<div class="page-head"><div><div class="eyebrow">TỪNG LƯỢT NHỎ, TIẾN BỘ THẬT</div><h1>Sổ ôn của bạn</h1><p>Chỉ ghi lại những lượt đã làm trên site. Chọn đúng nghĩa, nhận ra chữ và tự nhớ thẻ là các kỹ năng khác nhau.</p></div><a class="btn primary" href="#play/flash">Ôn một lượt →</a></div>
  <div class="progress-grid"><div class="progress-card"><h3>MỤC ĐÃ GẶP</h3><strong>${s.seen}<span> / ${words.length}</span></strong><span>Có ít nhất một lượt ôn</span></div><div class="progress-card"><h3>CẦN ÔN LẠI</h3><strong>${s.review}</strong><span>Có phần kỹ năng đến lịch ôn riêng</span></div><div class="progress-card"><h3>LƯỢT TRẢ LỜI</h3><strong>${total}</strong><span>Cả câu, số và tự đánh giá</span></div></div>
  <div class="note-panel"><span class="note-glyph">存</span><div><strong>Lưu trên trình duyệt này</strong><p>Mở site trên điện thoại vẫn học được khi máy tính tắt. Tiến độ không tự đồng bộ giữa hai thiết bị. Xuất sổ ôn rồi nhập ở thiết bị khác để mang theo kết quả.</p></div></div>
  <div class="chip-row"><button class="btn" id="export-progress">↓ Xuất sổ ôn (.json)</button><button class="btn" id="import-progress">↑ Nhập sổ ôn</button><button class="text-btn danger" id="reset-progress">Xóa tiến độ trên thiết bị này</button></div>
  <div class="chip-row"><a class="btn primary" href="#knowledge">Bản đồ tiến độ theo chiều sâu →</a><a class="btn" href="#notebook">Sổ kiến thức & bài tự viết</a></div>${learningUI.progressPanel()}<div class="section-top"><h2>Lịch sử lượt trả lời (cả bản cũ)</h2></div>${Object.entries(skillNames).map(([k,t])=>{const v=db.skills[k]||{correct:0,total:0};return `<div class="summary-row"><span>${t}</span><span>${v.total?`${v.correct} / ${v.total} ${k==='self'?'lượt tự đánh giá nhớ':'lượt đúng'}`:'Chưa luyện'}</span></div>`;}).join('')}
  <p class="support-note">Ghép đôi có thể thử nhiều lần, nên tỉ lệ của kỹ năng chữ/nghĩa tính cả lần thử sai. “Xếp câu” đối chiếu mẫu đã soạn, không chấm mọi khả năng diễn đạt. Không tự gắn nhãn “đã thành thạo”.</p>
  <div class="section-top"><h2>Gặp lại các chữ này</h2>${review.length?'<button class="text-btn" id="review-now">Ôn các chữ này →</button>':''}</div>${review.length?`<div class="review-list">${review.slice(0,60).map(w=>`<button data-detail="${w.han}">${w.han}</button>`).join('')}</div>`:'<div class="empty">Chưa có chữ đến lượt ôn. Bắt đầu một trò chơi để sổ ghi lại các mục bạn đã gặp.</div>'}
  <div class="section-top"><h2>Lượt học gần đây</h2></div>${db.sessions.length?db.sessions.slice(-6).reverse().map(x=>`<div class="summary-row"><span>${modes[x.mode]?.title||'Lượt ôn'}<br><span class="tiny muted">${new Date(x.time).toLocaleString('vi-VN')}</span></span><span>${x.correct} / ${x.total}</span></div>`).join(''):'<p class="muted tiny">Hoàn thành một lượt để xem lịch sử tại đây.</p>'}`;
  $('#export-progress').onclick=exportProgress;$('#import-progress').onclick=()=>$('#import-file').click();$('#reset-progress').onclick=()=>{if(confirm('Xóa toàn bộ tiến độ trên trình duyệt này? Bạn có thể xuất sổ ôn trước để giữ bản sao.')){db=emptyStore();save();progressPage();toast('Đã xóa tiến độ trên trình duyệt này.');}};if($('#review-now'))$('#review-now').onclick=()=>{pendingPool=review;go('#play/flash');};
 }
 function exportProgress(){const blob=new Blob([JSON.stringify(db,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='han-tu-so-on-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('Đã xuất sổ ôn. Giữ tệp để nhập trên thiết bị khác.');}
 $('#import-file').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>20e6)throw Error('Tệp quá lớn (tối đa 20 MB).');const incoming=validateStore(JSON.parse(await f.text()));
  // Merge per word from the newest device observation; use maxima for aggregate counters.
  for(const [id,s] of Object.entries(incoming.words)){const old=db.words[id];if(!old||s.last>old.last)db.words[id]=s;}
  for(const [k,s] of Object.entries(incoming.skills)){const old=db.skills[k]||{correct:0,total:0};if(s.total>old.total)db.skills[k]=s;}
  db.learning=E.merge(db.learning,incoming.learning,words.map(w=>w.id));
  db.investigations=window.HAN_INVESTIGATION.merge(db.investigations,incoming.investigations);
  db.knowledge=K.merge(db.knowledge,incoming.knowledge);
  db.reading=window.HAN_READER.merge(db.reading,incoming.reading);
  db.study=window.HAN_STUDY.merge(db.study,incoming.study);
  db.sessions=[...new Map([...db.sessions,...incoming.sessions].map(s=>[s.time+'-'+s.mode,s])).values()].sort((a,b)=>a.time-b.time).slice(-100);save();toast('Đã nhập sổ ôn. Với cùng một từ, giữ lần ôn mới hơn.');if(route==='progress')progressPage();else if(route==='knowledge')knowledgeUI.progress();else if(route==='notebook')knowledgeUI.notebook();
 }catch(err){toast(err.message==='Tệp quá lớn (tối đa 20 MB).'?err.message:'Không đọc được sổ ôn. Hãy chọn tệp .json đã xuất từ site này.');}e.target.value='';};
 document.addEventListener('click',e=>{if(e.target.closest('.skip-link')){e.preventDefault();app.focus();app.scrollIntoView({block:'start'});return;}const link=e.target.closest('a[href^="#"]');if(link&&link.getAttribute('href')===location.hash){e.preventDefault();renderRoute();return;}const say=e.target.closest('[data-say]');if(say){speak(say.dataset.say,!!say.dataset.slow);return;}const card=e.target.closest('[data-detail]');if(card)detail(card.dataset.detail);});
 document.addEventListener('keydown',e=>{if($('#word-dialog').open||['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName))return;if(learningActive||!session)return;if(/^[1-4]$/.test(e.key)&&!session.answered){const b=$(`[data-answer="${Number(e.key)-1}"]`);if(b){e.preventDefault();b.click();}}if(e.key==='Enter'&&session.answered&&$('#next-question')){e.preventDefault();next();}if(e.code==='Space'&&session.mode==='flash'&&!session.revealed){e.preventDefault();flipFlash();}});
 learningUI=window.createHanLearning({
  words,esc,db:()=>db,save,toast,shuffle,audio:audioButton,speak,readingBanner:()=>readerUI.banner(),hasVoice:()=>{updateVoices();return !!selectedVoice;},
  mount:html=>{app.innerHTML=html;},setLearningSession:value=>{learningActive=value;},
  choices:(w,field,type)=>choicesFor(w,field,type,words.filter(x=>!x.extra)),
  record:(w,ok,skill,options={})=>track(w,ok,skill,false,options),wordFeedback,
  addSession:(mode,correct,total)=>{db.sessions.push({mode,time:Date.now(),correct,total});db.sessions=db.sessions.slice(-100);save();}
 });
 playUI=window.createHanPlay({words,legacyModes:Object.entries(modes).filter(([id])=>!['daily','memory','journey','detective','comprehension'].includes(id)),esc,db:()=>db,save,shuffle,audio:audioButton,
  mount:html=>{app.innerHTML=html;},record:(w,ok,skill,options)=>track(w,ok,skill,false,options),
  practice:(ws,mode='meaning',lesson=null)=>{pendingPool=ws;pendingLesson=lesson;go('#play/'+mode);},
  finish:(mode,correct,total)=>{db.sessions.push({mode,time:Date.now(),correct,total});db.sessions=db.sessions.slice(-100);save();}
 });
 investigationUI=window.createHanInvestigation({words,esc,db:()=>db,save,toast,audio:audioButton,
  mount:html=>{app.innerHTML=html;},
  finish:(mode,correct,total)=>{db.sessions.push({mode,time:Date.now(),correct,total});db.sessions=db.sessions.slice(-100);save();}
 });
 // Estimate interaction time only between recent visible-page actions. No background timer.
 let device='device-'+Math.random().toString(36).slice(2,14);
 try{const old=localStorage.getItem('han-tu-device.v1');if(K.safeKey(old))device=old;else localStorage.setItem('han-tu-device.v1',device);}catch{}
 let lastAction=0,lastTimeSave=0;
 function activeAction(){
  const now=Date.now();if(document.visibilityState==='hidden'||['knowledge','notebook','progress'].includes(route)){lastAction=0;return;}
  const delta=lastAction?now-lastAction:0;if(delta>0&&delta<=90000)K.addTime(db.knowledge,device,delta,now);lastAction=now;
  if(now-lastTimeSave>15000){lastTimeSave=now;save();}
 }
 document.addEventListener('pointerdown',activeAction,{passive:true});document.addEventListener('keydown',activeAction,{passive:true});document.addEventListener('scroll',activeAction,{passive:true});
 document.addEventListener('visibilitychange',()=>{lastAction=0;save();});window.addEventListener('pagehide',save);
 practiceUI=window.createHanPractice({words,esc,db:()=>db,save,toast,shuffle,audio:audioButton,speak,voiceStatus,
  practiceWords:ws=>{pendingPool=ws;pendingLesson=null;go('#play/meaning');},
  hasVoice:()=>{updateVoices();return !!selectedVoice;},mount:html=>{app.innerHTML=html+(window.HAN_PATHS?.forPractice(location.hash.split('/').pop(),esc)||'');},
  gradeListening:(id,ok,options)=>{const word=byId.get(id);if(word)track(word,ok,'listening',false,{...options,suppressKnowledge:true});},
  finish:(_kind,correct,total)=>{db.sessions.push({mode:'comprehension',time:Date.now(),correct,total});db.sessions=db.sessions.slice(-100);save();}
 });
 wordlabUI=window.createHanWordlab({words,esc,db:()=>db,save,shuffle,mount:html=>{app.innerHTML=html;}});
 reviewUI=window.createHanReview({words,esc,db:()=>db,save,shuffle,audio:audioButton,speak,voiceStatus,hasVoice:()=>{updateVoices();return !!selectedVoice;},gradeWord:(w,ok,skill,options)=>track(w,ok,skill,false,options),mount:html=>{app.innerHTML=html;}});
 knowledgeUI=window.createHanKnowledge({words,esc,db:()=>db,save,toast,audio:audioButton,mount:html=>{app.innerHTML=html;},exportProgress,importProgress:()=>$('#import-file').click()});
 readerUI=window.createHanReader({words,esc,db:()=>db,save,audio:audioButton,mount:html=>{app.innerHTML=html;}});
 pathsUI=window.createHanPaths({words,esc,db:()=>db,mount:html=>{app.innerHTML=html;}});
 studyUI=window.createHanStudyHub({words,esc,db:()=>db,save,review:()=>reviewUI,wordlab:()=>wordlabUI,mount:html=>{app.innerHTML=html;}});
 materialsUI=window.createHanMaterials?.({words,esc,speak,db:()=>db,save,mount:html=>{app.innerHTML=html;}});
 vocabularyFamiliesUI=window.createHanVocabularyFamilies({words,esc,db:()=>db,save,speak,voiceStatus,mount:html=>{app.innerHTML=html;}});
 sentenceReaderUI=window.createHanSentenceReader({words,esc,db:()=>db,save,speak,voiceStatus,mount:html=>{app.innerHTML=html;}});
 deepReadingUI=window.createHanDeepReading({words,esc,db:()=>db,save,mount:html=>{app.innerHTML=html;}});
 hsk2UI=window.createHanHsk2({words,esc,db:()=>db,save,shuffle,speak,voiceStatus,mount:html=>{app.innerHTML=html;}});
 window.addEventListener('hashchange',()=>{lastAction=0;renderRoute();});
 window.HAN_APP={getWords:()=>words,cn,pyNumber,normalNumber,makeNumbers,validateStore,getProgress:()=>JSON.parse(JSON.stringify(db))};
 renderRoute();
})();
