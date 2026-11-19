(() => {
 'use strict';
 const byHan=new Map(window.HAN_DATA.words.map(w=>[w.han,w]));
 const terms=new Map(),readings=[],grammar=new Map();
 const term=(key,py,meaning,kind='Từ',note='',links=[])=>{
  const han=key.split('@')[0];terms.set(key,{key,han,py,meaning,kind,note,links:links.length?links:[han]});
 };
 const punctuation=s=>/^[\s，。？！：；、“”‘’（）—…,.?!:;]+$/.test(s);
 function resolve(key){
  if(punctuation(key))return {key,han:key,punctuation:true};
  if(terms.has(key))return {...terms.get(key)};
  const w=byHan.get(key);return w?{key,han:key,py:w.py,meaning:w.gloss||w.meaning,kind:'Từ trong kho',note:'',links:[key]}:{key,han:key,missing:true,links:[]};
 }
 function line(seg,chunks,explain,patterns=[],override={}){
  const keys=seg.split('|'),tokens=keys.map(resolve),han=tokens.map(t=>t.han).join('');
  return {han,tokens,chunks:chunks.map(([text,role,why])=>({text,role,why})),explain,patterns,...override};
 }
 function add(r){
  if(readings.some(x=>x.id===r.id))throw Error('Duplicate reader '+r.id);
  readings.push(r);return r;
 }
 function practice(id,goal,analyses,connection,contrast){
  const p=window.HAN_PRACTICE.passages.find(x=>x.id===id);if(!p)throw Error(id);
  if(analyses.length!==p.lines.length)throw Error('Incomplete reader '+id);
  const lines=analyses.map((a,i)=>({...line(...a),py:p.lines[i].py,vn:p.lines[i].vn}));
  for(let i=0;i<lines.length;i++)if(lines[i].han!==p.lines[i].han)throw Error('Reader text differs '+id+' '+i);
  return add({id:'p-'+id,sourceId:id,group:'foundation',title:p.title,goal,lines,connection,contrast,focus:p.focus,exposures:[id,...p.questions.map(q=>q.id)],practiceHref:'#practice/read/'+id,backHref:'#practice',backTitle:'Bộ nghe & đọc',origin:'Đoạn luyện do ứng dụng biên soạn'});
 }
 function hsk(id,title,goal,analyses,connection,contrast){
  const u=window.HAN_HSK2.units.find(x=>x.id===id),lines=analyses.map(a=>line(...a));
  // The revised passage and sentence analyses share one source of truth.
  u.passage.han=lines.map(l=>l.han).join('');u.passage.py=lines.map(l=>l.py).join(' ');u.passage.vn=lines.map(l=>l.vn).join(' ');
  u.passage.readerId='hsk-'+id;
  return add({id:'hsk-'+id,sourceId:String(id),group:'hsk',title,goal,lines,connection,contrast,focus:[...u.oldWords,...u.words.map(w=>w.han)],exposures:['hsk2:passage:'+id,...u.passage.questions.flatMap(q=>[q.id+':read',q.id+':listen'])],practiceHref:'#hsk2/'+id+'/read',backHref:'#hsk2/'+id,backTitle:'Bài HSK 2 số '+id,origin:'Đoạn tự biên soạn để luyện từ và cấu trúc của bài; không phải bài khóa trích từ sách'});
 }
 const linkWord=han=>byHan.get(han);
 window.HAN_READING_LAB={terms,readings,grammar,byHan,term,line,add,practice,hsk,resolve,linkWord,
  sources:{words:{title:'MIT · Chữ, từ và khoảng cách trong văn bản',url:'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/5d7516aefe6bf45dfb045687830fe27f_MITRES_21G_003S11_char01.pdf',section:'Character Lesson 1, §1.1.2 và §1.3'},foundation:{title:'MIT · Learning Chinese, các mục ngữ pháp nền',url:'https://ocw.mit.edu/courses/res-21g-003-learning-chinese-a-foundation-course-in-mandarin-spring-2011/pages/online-textbook/part-i-introduction-units-1-4-character-lessons-1-3/'},hsk:{title:'Giáo trình đối chiếu 新HSK教程2, bài 1–6',url:window.HAN_HSK2.book.source}}};
})();
