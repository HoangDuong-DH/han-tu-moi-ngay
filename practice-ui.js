(() => {
 'use strict';
 window.createHanPractice=host=>{
  const D=window.HAN_PRACTICE,K=window.HAN_KNOWLEDGE,E=window.HAN_ENGINE,C=window.HAN_CURRICULUM;
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],esc=host.esc;
  const state=()=>host.db().knowledge,learning=()=>host.db().learning;
  const labels={'read':'Đọc đoạn','listen':'Nghe đoạn','mixed':'Bài tổng hợp','read-sentence':'Đọc câu','listen-sentence':'Nghe câu','dictation':'Nghe & viết chữ','source':'Hiểu và kiểm chứng'};
  const facetLabels={...K.FACETS};
  let run=null;
  function cancel(){run=null;}
  const mount=html=>{host.mount(html);window.scrollTo(0,0);};
  const date=ms=>ms?new Date(ms).toLocaleString('vi-VN',{timeZone:'Asia/Bangkok',dateStyle:'short',timeStyle:'short'}):'Chưa có';
  const links=()=>`<div class="chip-row"><a class="btn" href="#practice">Nghe & đọc</a><a class="btn" href="#knowledge">Bản đồ tiến độ</a><a class="btn" href="#notebook">Sổ kiến thức</a><a class="btn" href="#guide">Chuẩn học & nguồn</a></div>`;
  const head=(title,sub)=>`<div class="page-head"><div><div class="eyebrow">HIỂU CÂU · NỐI DỮ KIỆN · DÙNG ĐƯỢC</div><h1>${esc(title)}</h1><p>${esc(sub)}</p></div></div>${links()}`;
  function hub(){
   cancel();mount(head('Đọc được một câu. Hiểu được cả chuyện.','Từ vốn từ đã gửi, luyện nghe–đọc câu và đoạn, đổi góc nhìn, rồi tự diễn đạt. Bài do app biên soạn, có lời giải và căn cứ.')+`
    <section class="new-content-banner"><strong>Đã học xong HSK 1? Ôn để dùng được.</strong><p>Khảo sát 12 điểm nền, rà toàn kho từ và làm 8 nhiệm vụ có nghe, sửa câu, tự nói và viết. Ưu tiên những lỗi bạn từng gặp.</p><a class="btn primary" href="#review">Mở bộ ôn tổng hợp →</a></section><p><a class="btn primary" href="#readings">Đọc chậm · hiểu từ & cụm trước khi luyện →</a></p><div class="practice-modes">${[
     ['listen-sentence','听','Nghe câu → hiểu nghĩa','Nghe trước, chọn ý; xem chữ và pinyin sau.'],
     ['dictation','写','Nghe rồi viết chữ','Tự gõ câu nghe được; đối chiếu đúng mẫu, không chấm phát âm.'],
     ['read-sentence','读','Đọc câu → hiểu ý','Nhận chữ trong câu, đừng chỉ tìm một từ khóa.'],
     ['read','文','Đọc đoạn & tìm căn cứ','Trả lời rồi dẫn đúng dòng chứng minh lựa chọn.'],
     ['listen','声','Nghe đoạn & nối ý','Theo người, thời điểm, phủ định và thay đổi trong câu chuyện.'],
     ['mixed','用','Bài tập tổng hợp','Trộn nghe, đọc và suy luận; ưu tiên câu đã nhầm.']
    ].map(([id,glyph,title,note])=>`<a class="practice-mode" href="#practice/${id}"><span class="han">${glyph}</span><h2>${title}</h2><p>${note}</p><b>Bắt đầu →</b></a>`).join('')}</div>
    <div class="note-panel"><div><strong>Ba nấc, không phải ba nhãn trình độ HSK</strong><p>01: lấy thông tin trực tiếp. 02: theo vai và thứ tự. 03: nối nhiều dòng, xét điều chưa biết, chọn cách nói phù hợp. Chọn mức vừa sức; có thể mở trợ giúp bất cứ lúc nào.</p><p>Âm thanh là giọng đọc tổng hợp của thiết bị. Khi chưa có giọng Quan thoại, phần đọc vẫn dùng được.</p></div></div>
    <div class="new-content-banner"><strong>Mở rộng có mục đích · 15 từ nối vốn cũ với câu tự nhiên hơn</strong><p>先 → 然后: xếp việc. 因为 → 所以: nêu lý do. 如果 và 可能: giữ điều kiện, mức chắc chắn. Chọn 3–5 từ mỗi lần; không cần học hết cùng lúc.</p><a class="btn" href="#practice/extensions">Mở ba nhánh từ mới →</a></div>
    <div class="section-top"><h2>${D.passages.length} đoạn · ${D.passages.reduce((n,p)=>n+p.questions.length,0)} câu hỏi có căn cứ</h2></div><div class="passage-library">${D.passages.map(p=>`<article class="passage-card"><span class="badge">Mức ${p.level} · ${esc(p.topic)}</span><h3>${esc(p.title)}</h3><p class="inline-han">${p.focus.map(esc).join(' · ')}</p><p>${p.lines.length} dòng · 3 câu hỏi · 1 đề tự viết${p.extra.length?' · Có từ mở rộng được chú giải':''}</p><div class="chip-row"><a class="btn" href="#readings/p-${p.id}">Học cách đọc</a><a class="btn" href="#practice/read/${p.id}">Đọc đoạn</a><a class="btn" href="#practice/listen/${p.id}">Nghe đoạn</a><a class="text-btn" href="#practice/write/${p.id}">Tự viết →</a></div></article>`).join('')}</div>
    <div class="note-panel"><div><strong>Học sâu cũng cần học cách kiểm tra điều mình vừa tin</strong><p>Từ cách giải chữ 爱 đến khinh thanh và ngữ thể: giữ câu chuyện có ích, nhưng kiểm tra giới hạn của quy luật.</p><a class="btn" href="#practice/source">Thử 4 câu về cách học</a></div></div>
   `);
  }
  function setup(kind){
   cancel();const audio=['listen','listen-sentence','dictation','mixed'].includes(kind),voice=host.hasVoice();
   mount(head(labels[kind]||'Luyện tổng hợp','Chọn một nhóm vừa đủ. Có phản hồi sau mỗi câu; những lần dùng gợi ý được ghi riêng.')+`
    <section class="setup"><label for="com-level">Mức độ</label><select id="com-level"><option value="1">01 · Câu rõ, lấy thông tin</option><option value="2">02 · Vai nghĩa và thứ tự</option><option value="3">03 · Suy luận và giới hạn</option><option value="all">Trộn cả ba mức</option></select>
    <label for="com-focus">Trọng tâm</label><select id="com-focus"><option value="all">Toàn bộ chủ đề</option><option value="lesson13">Bài 13 · Gọi món & giao tiếp</option><option value="extensions">15 từ mở rộng · Nối câu & lập luận</option><option value="review">Câu gần đây cần học lại</option></select>
    <label for="com-count">Lượt ngắn hay kỹ?</label><select id="com-count"><option value="6">6 câu</option><option value="3">3 câu · học nhanh</option><option value="12">12 câu · ôn kỹ</option></select>
    ${audio?`<div class="voice-box"><strong>Nghe bằng giọng Quan thoại trên thiết bị</strong><p>${esc(host.voiceStatus())}</p><button id="com-voice-test" class="btn">Thử giọng: 你好</button><p class="tiny muted">Giọng tổng hợp không thay bản ghi người bản ngữ. Nghe chậm, mở văn bản/pinyin hoặc xem đáp án trước đều được ghi là hỗ trợ.</p></div>`:''}
    <button id="com-start" class="btn primary">Vào lượt luyện →</button><p id="com-error" role="status"></p>${audio&&!voice?'<p>Thiết bị chưa có giọng Quan thoại. Bạn vẫn có thể <a href="#practice/read">đọc đoạn</a> hoặc <a href="#practice/read-sentence">đọc câu</a>.</p>':''}
    </section>`);
   if($('#com-voice-test'))$('#com-voice-test').onclick=()=>host.speak('你好');
   $('#com-focus').onchange=()=>{if(['extensions','lesson13'].includes($('#com-focus').value)&&$('#com-level').value==='1')$('#com-level').value='all';};
   $('#com-start').onclick=()=>begin(kind,{level:$('#com-level').value,focus:$('#com-focus').value,count:Number($('#com-count').value)});
  }
  function recentWrong(item){const e=state().events.filter(e=>e.item===item).at(-1);return e&&(!e.ok||e.helped||e.targets.some(id=>{const c=state().nodes[id]?.facets[e.facet];return c?.last&&c.due<=Date.now();}));}
  const itemKey=x=>x.q?.id||(x.s.id+'-'+x.mode);
  function prioritized(items,focus){return host.shuffle(items).sort((a,b)=>Number(!!recentWrong(itemKey(b)))-Number(!!recentWrong(itemKey(a)))).filter(x=>focus!=='review'||recentWrong(itemKey(x)));}
  function begin(kind,{level='all',focus='all',count=6,pid=null}={}){
   let items=[];
   if(kind==='source')items=D.sourceQuiz.map(q=>({q,mode:'read',source:true}));
   else if(['read-sentence','listen-sentence','dictation'].includes(kind)){
    const candidates=D.sentences.filter(s=>(level==='all'||s.level<=Number(level))&&(focus!=='lesson13'||window.HAN_DATA.words.find(w=>w.id===s.target)?.lesson13)&&(focus!=='extensions'||window.HAN_DATA.words.find(w=>w.id===s.target)?.extension));
    items=prioritized(candidates.map(s=>({s,mode:kind})),focus).slice(0,count);
   }else{
    const paragraphs=D.passages.filter(p=>(!pid||p.id===pid)&&(level==='all'||p.level<=Number(level))&&(focus!=='lesson13'||['breakfast','polite'].includes(p.id))&&(focus!=='extensions'||p.id.startsWith('bridge-')));
    for(const p of paragraphs){const qs=pid?p.questions:host.shuffle(p.questions).slice(0,1);for(const q of qs)items.push({p,q,mode:kind==='mixed'?'read':kind});}
    items=prioritized(items,focus).slice(0,count);
    if(kind==='mixed')items.forEach((x,i)=>x.mode=host.hasVoice()&&i%2===0?'listen':'read');
   }
   if(!items.length){if($('#com-error'))$('#com-error').textContent='Bộ lọc chưa có câu phù hợp. Chọn toàn bộ chủ đề hoặc mức khác.';else setup(kind);return;}
   if(items.some(x=>x.mode==='listen'||['listen-sentence','dictation'].includes(x.mode))&&!host.hasVoice()){
    setup(kind);$('#com-error').textContent='Chưa có giọng Quan thoại. Hãy chọn phần đọc, hoặc bật giọng tiếng Trung trên thiết bị rồi thử lại.';return;
   }
   run={kind,items,index:0,correct:0,assisted:0,heard:new Set(),replays:{},hints:new Set(),answered:false,proof:new Set(),written:'',responses:[]};
   step();
  }
  const isAudio=t=>t.mode==='listen'||['listen-sentence','dictation'].includes(t.mode);
  function script(t,withTranslation=false){
   if(t.s)return `<p class="reading-line inline-han" lang="zh-CN">${esc(t.s.han)}</p>${withTranslation?`<p class="py">${esc(t.s.py)}</p><p>${esc(t.s.vn)}</p>`:''}`;
   return t.p.lines.map((l,i)=>`<div class="reading-line"><span class="line-number">${i+1}</span><div><p class="inline-han" lang="zh-CN">${esc(l.han)}</p>${withTranslation?`<p class="py">${esc(l.py)}</p><p>${esc(l.vn)}</p>`:''}</div></div>`).join('');
  }
  function step(){
   const r=run;if(!r)return;if(r.index>=r.items.length){finish();return;}
   const t=r.items[r.index],audio=isAudio(t),key=t.p?.id||t.s?.id||'source';r.answered=false;r.proof=new Set();r.written='';
   r.currentHelped=r.hints.has(key)||(state().exposures['reader-analysis:'+key]||0)>Date.now()-E.RETRY||(audio&&(state().exposures[key]||0)>Date.now()-E.RETRY)||(t.source&&(state().exposures.guide||0)>Date.now()-E.RETRY);
   r.currentKey=key;
   if(!audio&&t.p){state().exposures[key]=Date.now();K.see(state(),t.q.concepts.map(id=>'c:'+id));host.save();}
   const title=t.p?.title||(t.source?'Kiểm tra điều vừa học':'Một câu, một ý');
   mount(`<section class="comprehension-session"><div class="session-top"><a href="#practice">← Dừng, giữ phần đã làm</a><span>${esc(labels[t.mode]||labels[r.kind]||title)}</span><span>${r.index+1}/${r.items.length}</span></div><div class="progress-track"><div class="progress-fill" style="width:${r.index/r.items.length*100}%"></div></div><h1 class="passage-title">${esc(title)}</h1>
    ${!t.source?`<div class="com-material">${audio?`<div class="listen-stage"><span class="han">听</span><p>Nghe trước khi mở chữ. Có thể nghe lại.</p><div class="chip-row"><button id="com-play" class="btn primary">▶ Nghe bình thường</button><button id="com-slow" class="btn">Nghe chậm · có hỗ trợ</button></div><p id="com-audio-status" role="status">${r.heard.has(key)?'Đã phát xong đoạn này trong lượt học.':'Bấm nghe rồi chờ phát xong.'}</p></div>`:`<div class="com-script">${script(t)}</div>`}
    <div class="chip-row">${audio?'<button id="com-reveal" class="text-btn">Mở chữ Hán · tính có hỗ trợ</button>':''}<button id="com-help" class="text-btn">Pinyin & nghĩa · có hỗ trợ</button></div><div id="com-hint" class="com-hint" hidden></div>
    ${t.p?.extra.length?`<details class="com-gloss"><summary>Chú giải từ mở rộng · trợ giúp</summary>${t.p.extra.map(x=>`<p><span class="inline-han">${esc(x[0])}</span> · ${esc(x[1])} · ${esc(x[2])}</p>`).join('')}</details>`:''}</div>`:''}
    <div class="question-card">${t.s?sentenceQuestion(t):paragraphQuestion(t,audio)}<p id="com-answer-error" role="status"></p></div><div id="com-feedback" aria-live="polite"></div></section>`);
   bindMaterial(t);
   if(t.s)bindSentence(t);else bindParagraph(t,audio);
  }
  function markHelp(t){const r=run;r.currentHelped=true;r.hints.add(r.currentKey);state().exposures[r.currentKey]=Date.now();host.save();}
  function bindMaterial(t){
   const r=run;if(t.source)return;
   const reveal=translation=>{markHelp(t);$('#com-hint').hidden=false;$('#com-hint').innerHTML=script(t,translation);};
   if($('#com-reveal'))$('#com-reveal').onclick=()=>reveal(false);
   $('#com-help').onclick=()=>reveal(true);
   if($('.com-gloss'))$('.com-gloss').addEventListener('toggle',e=>{if(e.target.open)markHelp(t);});
   const play=slow=>{
    if(run!==r)return;if(slow)markHelp(t);r.replays[r.currentKey]=(r.replays[r.currentKey]||0)+1;if(r.replays[r.currentKey]>2)markHelp(t);
    const status=$('#com-audio-status');if(status)status.textContent='Đang phát…';const key=r.currentKey;
    const started=host.speak(t.s?.han||t.p.lines.map(l=>l.han).join(''),slow,ok=>{if(run!==r||r.currentKey!==key)return;if(ok){r.heard.add(key);if(status)status.textContent='Đã phát xong. Hãy tự trả lời.';}else if(status)status.textContent='Chưa phát xong. Thử lại hoặc dùng phần đọc.';});
    if(!started&&status)status.textContent='Chưa có giọng Quan thoại. Mở phần đọc để tiếp tục học.';
   };
   if($('#com-play'))$('#com-play').onclick=()=>play(false);
   if($('#com-slow'))$('#com-slow').onclick=()=>play(true);
  }
  function paragraphQuestion(t,audio){
   const q=t.q;return `<p class="question-label">${esc(facetLabels[q.facet])}${audio?' · QUA NGHE':''}</p><h2 class="question-text">${esc(q.prompt)}</h2><div id="com-options" class="story-choices"></div>
    ${!audio&&q.proof?.length?`<div class="proof-task"><h3>Dẫn căn cứ</h3><p class="tiny muted">Chọn đúng những dòng cần để chứng minh; chọn tất cả không tự được tính đúng.</p><div class="proof-lines">${t.p.lines.map((l,i)=>`<button class="proof-line" data-proof="${i}" aria-pressed="false"><b>Dòng ${i+1}</b><span class="inline-han">${esc(l.han)}</span></button>`).join('')}</div><button class="btn primary" id="com-check">Kiểm tra lựa chọn & căn cứ</button></div>`:''}`;
  }
  function bindParagraph(t,audio){
   const r=run,q=t.q,options=host.shuffle(q.options);r.choice=null;
   $('#com-options').innerHTML=options.map((text,i)=>`<button class="story-choice" data-com-option="${i}" aria-pressed="false"><span>${String.fromCharCode(65+i)}</span><span>${esc(text)}</span></button>`).join('');
   $$('[data-com-option]').forEach(b=>b.onclick=()=>{if(r.answered)return;r.choice=options[Number(b.dataset.comOption)];$$('[data-com-option]').forEach(x=>{const selected=x===b;x.classList.toggle('selected',selected);x.setAttribute('aria-pressed',String(selected));});if(audio||!q.proof?.length)check();});
   $$('[data-proof]').forEach(b=>b.onclick=()=>{if(r.answered)return;const i=Number(b.dataset.proof);if(r.proof.has(i))r.proof.delete(i);else r.proof.add(i);b.classList.toggle('selected',r.proof.has(i));b.setAttribute('aria-pressed',String(r.proof.has(i)));});
   if($('#com-check'))$('#com-check').onclick=check;
   function check(){
    if(r.answered)return;if(!r.choice){$('#com-answer-error').textContent='Chọn một đáp án trước nhé.';return;}
    if(audio&&!r.heard.has(r.currentKey)&&!r.currentHelped){$('#com-answer-error').textContent='Bấm nghe, chờ phát xong rồi trả lời. Nếu âm thanh không chạy, mở chữ và luyện có hỗ trợ.';return;}
    const result=K.judge(audio?{...q,proof:[]}:q,r.choice,[...r.proof]);
    const facet=t.mode==='read'&&q.facet==='listening'?'syntax':q.facet;
    const entry=K.record(state(),{kind:'attempt',item:q.id,facet,mode:audio?'listen':'read',ok:result.ok,helped:r.currentHelped,targets:q.concepts.map(id=>'c:'+id),context:t.p?.id||q.id,input:r.choice,reason:result.answerOK&&!result.proofOK?'Đáp án đúng nhưng căn cứ chưa đúng/đủ.':''});
    r.answered=true;r.responses.push(entry);if(result.ok)r.correct++;if(r.currentHelped)r.assisted++;host.save();
    $$('[data-com-option],[data-proof],#com-check').forEach(b=>b.disabled=true);
    const evidence=t.p&&q.proof?.length?`<p><strong>Căn cứ mẫu: ${q.proof[0].map(i=>'dòng '+(i+1)).join(' + ')}.</strong></p>${q.proof[0].map(i=>`<p class="inline-han">${esc(t.p.lines[i].han)}</p><p class="py">${esc(t.p.lines[i].py)}</p>`).join('')}`:'';
    if(t.p){state().exposures[t.p.id]=Date.now();host.save();}
    feedback(result.ok,`<h3>${result.ok?'Có căn cứ.':result.answerOK?'Ý đúng; hãy sửa phần dẫn chứng.':'Cùng đọc lại phạm vi câu.'}</h3><p><b>${esc(q.answer)}</b></p><p>${esc(q.why)}</p>${evidence}${t.p?`<p><a href="#readings/p-${t.p.id}">Xem cách chia từ, vai cụm & ngữ pháp của đoạn →</a></p>`:''}<p class="tiny muted">Ghi cho ${esc(facetLabels[facet])} qua ${audio?'nghe':'đọc'}${r.currentHelped?', có hỗ trợ':''}. Không tự cộng toàn bộ từ trong đoạn thành từ đã thuộc.</p>`);
   }
  }
  function sentenceQuestion(t){
   if(t.mode==='dictation')return `<p class="question-label">NGHE → TỰ VIẾT CHỮ</p><h2 class="question-text">Viết câu bạn vừa nghe.</h2><form id="com-dictation-form"><label class="sr-only" for="com-dictation">Câu chữ Hán</label><textarea id="com-dictation" lang="zh-CN" rows="3" autocomplete="off" spellcheck="false" placeholder="Gõ chữ Hán…"></textarea><button class="btn primary" type="submit">Đối chiếu câu</button></form><p class="support-note">Bài chép theo mẫu: bỏ qua dấu câu/khoảng trắng. Không dùng bài này để đánh giá mọi cách diễn đạt khác.</p>`;
   return `<p class="question-label">${t.mode==='read-sentence'?'ĐỌC':'NGHE'} → HIỂU Ý</p><h2 class="question-text">Câu này nói điều gì?</h2><div id="com-options" class="story-choices"></div>`;
  }
  function bindSentence(t){
   const r=run,s=t.s;
   function submit(input){
    if(r.answered)return;
    if(isAudio(t)&&!r.heard.has(r.currentKey)&&!r.currentHelped){$('#com-answer-error').textContent='Hãy nghe hết câu, hoặc mở chữ để luyện có hỗ trợ.';return;}
    if(!input.trim()){$('#com-answer-error').textContent='Thử viết câu trước khi đối chiếu nhé.';return;}
    const ok=t.mode==='dictation'?[s.han,...(s.variants||[])].some(x=>E.hanKey(x)===E.hanKey(input)):input===s.vn;
    if(s.target)E.introduce(learning(),s.target,Date.now(),'practice');
    const facet=t.mode==='read-sentence'?'meaning':'listening';
    const entry=K.record(state(),{kind:'attempt',item:s.id+'-'+t.mode,facet,mode:t.mode==='dictation'?'dictation':t.mode==='read-sentence'?'read':'listen',ok,helped:r.currentHelped,targets:s.target?['w:'+s.target]:[],context:s.id,input});
    if(s.target&&isAudio(t))host.gradeListening(s.target,ok,{helped:r.currentHelped,kind:t.mode==='dictation'?'typed':'choice'});
    r.responses.push(entry);r.answered=true;if(ok)r.correct++;if(r.currentHelped)r.assisted++;
    state().exposures[s.id]=Date.now();host.save();$$('[data-sentence-choice],#com-dictation-form button,#com-dictation').forEach(b=>b.disabled=true);
    feedback(ok,`<h3>${ok?'Đúng mẫu.':'Đối chiếu từng phần.'}</h3><p class="inline-han">${esc(s.han)}</p><p class="py">${esc(s.py)}</p><p>${esc(s.vn)}</p>${host.audio(s.han)}${!ok&&t.mode==='dictation'?`<p>Câu bạn viết: <span class="inline-han">${esc(input)}</span></p><p class="tiny muted">Nếu câu của bạn diễn đạt cùng ý nhưng khác mẫu, lưu ở phần tự viết để xem lại; bộ chấm này chỉ kiểm tra chép theo mẫu đã có.</p>`:''}<p class="tiny muted">${r.currentHelped?'Lượt có gợi ý/đã xem gần đây: dùng để luyện, chưa tăng bậc độc lập.':'Một lần làm đúng là một bằng chứng, cần ôn lại qua ngày.'}</p>`);
   }
   if(t.mode==='dictation'){$('#com-dictation-form').onsubmit=e=>{e.preventDefault();submit($('#com-dictation').value);};return;}
   const seen=new Set([s.vn]),others=host.shuffle(D.sentences).filter(x=>{if(seen.has(x.vn)||E.hanKey(x.han)===E.hanKey(s.han))return false;seen.add(x.vn);return true;}).slice(0,3).map(x=>x.vn),options=host.shuffle([s.vn,...others]);
   $('#com-options').innerHTML=options.map((x,i)=>`<button class="story-choice" data-sentence-choice="${i}"><span>${String.fromCharCode(65+i)}</span><span>${esc(x)}</span></button>`).join('');
   $$('[data-sentence-choice]').forEach(b=>b.onclick=()=>submit(options[Number(b.dataset.sentenceChoice)]));
  }
  function feedback(ok,body){
   const r=run;$('#com-feedback').innerHTML=`<div class="feedback ${ok?'':'error'}">${body}<button id="com-next" class="btn primary">${r.index+1<r.items.length?'Câu tiếp →':'Xem kết quả →'}</button></div>`;
   $('#com-next').onclick=()=>{r.index++;step();};$('#com-feedback').scrollIntoView?.({behavior:'smooth',block:'nearest'});
  }
  function finish(){
   const r=run;host.finish(r.kind,r.correct,r.items.length);
   const p=r.items.find(x=>x.p)?.p;
   mount(head('Đã có thêm bằng chứng để ôn đúng chỗ.','Xem lại chỗ nhầm rồi thử một tình huống khác. Kết quả trắc nghiệm chưa thay cho tự nói/viết.')+`
    <div class="knowledge-metrics"><article><b>${r.correct}/${r.items.length}</b><span>Câu đúng cả điều kiện bài</span></article><article><b>${r.assisted}</b><span>Câu có hỗ trợ</span></article><article><b>${r.responses.filter(x=>x.independent).length}</b><span>Bằng chứng đến hạn, không gợi ý</span></article></div>
    <div class="session-review">${r.items.map((x,i)=>`<p><b>${r.responses[i]?.ok?'✓':'↻'} ${esc(x.p?.title||x.s?.han||x.q.prompt)}</b><br><span class="tiny muted">${esc(x.q?.why||x.s?.vn||'')}</span></p>`).join('')}</div>
    <div class="chip-row"><a class="btn primary" href="#knowledge">Xem chiều rộng & chiều sâu →</a>${p?`<a class="btn" href="#practice/write/${p.id}">Tự diễn đạt từ đoạn này</a>`:''}<a class="btn" href="#practice">Chọn bài khác</a></div>`);
   run=null;
  }
  function write(pid){
   const p=D.passages.find(p=>p.id===pid)||D.passages[0],old=state().drafts[p.id]||{};cancel();
   mount(head('Tự viết · '+p.title,'Giữ một sản phẩm để thấy mình diễn đạt được đến đâu. App chưa tự chấm toàn bộ ngữ pháp hoặc phát âm.')+`
    <section class="writing-studio"><h2>${esc(p.writing)}</h2><div class="chip-row">${p.focus.map(h=>`<button class="chip inline-han" data-detail="${esc(h)}">${esc(h)}</button>`).join('')}</div>
    <label for="writing-draft">Câu của bạn</label><textarea id="writing-draft" rows="6" maxlength="5000" lang="zh-CN" placeholder="Tự viết trước, chưa cần mở bài mẫu…">${esc(old.text||'')}</textarea>
    <div class="writing-rubric">${[['roles','Tôi đã kiểm tra ai làm gì cho ai'],['time','Tôi đã kiểm tra thời gian, nơi chốn và phủ định'],['words','Tôi đã kiểm tra nghĩa và lượng từ'],['register','Cách nói phù hợp người nghe']].map(([id,text])=>`<label><input type="checkbox" data-write-check="${id}" ${(old.checks||[]).includes(id)?'checked':''}> ${text}</label>`).join('')}</div>
    <div class="chip-row"><button class="btn primary" id="writing-save">Lưu bài tự viết</button><button class="btn" id="writing-model">Mở một bài mẫu · có hỗ trợ</button></div><p id="writing-status" role="status">${old.updated?'Đã lưu '+date(old.updated)+' · tự đánh giá, chưa được chấm.':''}</p><div id="writing-model-content" hidden></div>
    <p class="support-note">Lưu không tự tính là đã thành thạo. Bạn có thể sao chép câu này gửi vào session để mình sửa từng câu; những ô đánh dấu trên là tự đánh giá.</p></section>`);
   let modelSeen=!!old.modelSeen;
   $('#writing-save').onclick=()=>{K.saveDraft(state(),p.id,$('#writing-draft').value,$$('[data-write-check]').filter(e=>e.checked).map(e=>e.dataset.writeCheck),modelSeen);host.save();$('#writing-status').textContent='Đã lưu '+date(Date.now())+' · tự đánh giá, chưa được chấm.';};
   $('#writing-model').onclick=()=>{modelSeen=true;$('#writing-model-content').hidden=false;$('#writing-model-content').innerHTML=`<div class="feedback"><p class="inline-han">${esc(p.model)}</p>${host.audio(p.model)}<p>Một cách viết tham khảo, không phải đáp án duy nhất cho đề mở.</p></div>`;};
  }
  function guide(){
   const extended=D.concepts.filter(c=>!window.HAN_GRAMMAR.cards.some(g=>g.id===c.id));
   cancel();state().exposures.guide=Date.now();K.see(state(),extended.map(c=>'c:'+c.id));host.save();
   mount(head('Một chữ mở ra một mạng hiểu biết.','Chuẩn dạy đã lưu cho session: có mạch dẫn, gợi tò mò, nối Hán Việt và văn hóa; luôn giữ ranh giới giữa bằng chứng, phân tích và mẹo nhớ.')+`
    <div class="standard-grid">${D.standards.map(([title,text],i)=>`<article><span>0${i+1}</span><h2>${esc(title)}</h2><p>${esc(text)}</p></article>`).join('')}</div>
    <div class="section-top"><h2>Giữ cái hay của mẫu, sửa điều chưa chắc</h2></div><div class="reading-grid">${extended.map(c=>`<article class="reading-card"><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p>${c.example?`<p class="inline-han">${esc(c.example[0])}</p><p class="py">${esc(c.example[1])}</p><p>${esc(c.example[2])}</p>`:''}${c.source.map(url=>`<p><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">Mở nguồn đối chiếu ↗</a></p>`).join('')}</article>`).join('')}</div>
    <div class="note-panel"><div><strong>Ngưỡng theo dõi của app</strong><p>Một kỹ năng khái niệm có nhãn “qua nhiều ngày” khi trả lời đúng không gợi ý ở ít nhất 3 ngày, cách các lần tăng bậc ít nhất 20 giờ, qua ít nhất 2 bối cảnh, đang còn trong hạn và lần gần nhất không sai/có trợ giúp. Đây là quy tắc sản phẩm có thể kiểm tra, không phải thang đo học thuật đã chuẩn hóa.</p><p>Chưa có kiểm tra giọng nói hay tự do chấm văn. Tự viết và tự khai “đã hiểu” không được biến thành điểm thành thạo.</p></div></div>
    <a class="btn primary" href="#practice/source">Thử tự nhớ 4 điểm →</a><div class="section-top"><h2>Căn cứ thiết kế và tài liệu đối chiếu</h2></div><div class="source-list">${D.references.map(r=>`<article><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)} ↗</a><p>${esc(r.note)}</p></article>`).join('')}</div>
   `);
  }
  function extensions(){
   cancel();const X=window.HAN_EXTENSION;
   mount(head('Mở thêm từ, để nói được thêm một điều.','15 từ cầu nối được bổ sung theo nhu cầu. Mỗi từ có một chỗ dùng, một điểm dễ lẫn và một ví dụ nối về vốn cũ; xem thẻ chưa tính là đã thuộc.')+X.groups.map((g,i)=>`<section class="knowledge-section"><div class="section-top"><div><span class="eyebrow">NHÁNH 0${i+1} · CHỌN 3–5 TỪ</span><h2>${esc(g.title)}</h2></div><button class="btn primary" data-bridge-group="${i}">Ôn nhóm này →</button></div><p>${esc(g.reason)}</p><div class="reading-grid">${g.hans.map(h=>{const w=D.byHan.get(h),ex=X.examples[h];return `<article class="reading-card"><h3 class="inline-han">${esc(h)} ${host.audio(h)}</h3><p class="py">${esc(w.py)} · Hán Việt đối chiếu: ${esc(w.hv)}</p><p><strong>${esc(w.gloss)}</strong></p><p>${esc(w.note)}</p><p class="inline-han">${esc(ex[0])}</p><p class="py">${esc(ex[1])}</p><p>${esc(ex[2])} ${host.audio(ex[0])}</p><button class="text-btn" data-detail="${esc(h)}">Xem lịch ôn của từ</button></article>`;}).join('')}</div></section>`).join('')+'<p class="support-note">Hán Việt là cầu liên hệ, không phải công thức đổi âm hoặc bảo đảm hai ngôn ngữ dùng từ giống nhau. Những từ mới được đưa vào kho; tiến độ vẫn bắt đầu từ chưa kiểm tra.</p>');
   $$('[data-bridge-group]').forEach(b=>b.onclick=()=>host.practiceWords(X.groups[Number(b.dataset.bridgeGroup)].hans.map(h=>D.byHan.get(h))));
  }
  function route(parts){
   const [kind,pid]=parts;
   if(kind==='write')write(pid);else if(kind==='extensions')extensions();else if(kind==='source')begin('source');else if(kind==='review')begin('mixed',{focus:'review',count:6});else if(labels[kind]){if(pid)begin(kind,{pid,count:12});else setup(kind);}else hub();
  }
  return {hub,route,write,guide,cancel};
 };
})();
