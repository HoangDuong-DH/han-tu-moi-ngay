(() => {
 'use strict';
 const A=window.HAN_ESSAYS,ids=new Set(A.articles.map(a=>a.id));
 const blank=()=>({schema:1,prefs:{font:19,updated:0},articles:{}});
 const time=t=>Number.isFinite(t)?Math.min(Date.now()+60000,Math.max(0,t)):0;
 function sanitize(data){const out=blank();if(!data||typeof data!=='object')return out;
  if(data.prefs)out.prefs={font:[17,19,21,23].includes(data.prefs.font)?data.prefs.font:19,updated:time(data.prefs.updated)};
  for(const [id,v] of Object.entries(data.articles||{})){if(!ids.has(id)||!v||typeof v!=='object')continue;out.articles[id]={position:Math.min(1,Math.max(0,Number(v.position)||0)),opened:time(v.opened),updated:time(v.updated),finished:time(v.finished),bookmark:!!v.bookmark,bookmarkAt:time(v.bookmarkAt)};}
  return out;
 }
 function merge(left,right){const a=sanitize(left),b=sanitize(right);if(b.prefs.updated>a.prefs.updated)a.prefs=b.prefs;
  for(const [id,v] of Object.entries(b.articles)){const old=a.articles[id];if(!old){a.articles[id]=v;continue;}a.articles[id]={...(v.updated>old.updated?v:old),opened:Math.max(old.opened,v.opened),finished:Math.max(old.finished,v.finished),bookmark:v.bookmarkAt>old.bookmarkAt?v.bookmark:old.bookmark,bookmarkAt:Math.max(old.bookmarkAt,v.bookmarkAt)};}
  return a;
 }
 window.HAN_READER={blank,sanitize,merge};
 window.createHanReader=host=>{
  const {esc}=host;let current=null,scrollTimer=null,restoreTimer=null,enabled=false;
  const state=()=>host.db().reading;
  const record=id=>state().articles[id]??={position:0,opened:0,updated:0,finished:0,bookmark:false,bookmarkAt:0};
  const htmlLink=(url,title)=>`<a href="${esc(url)}"${url.startsWith('https://')?' target="_blank" rel="noopener noreferrer"':''}>${esc(title)}</a>`;
  function banner(){return `<section class="essay-banner"><span class="essay-banner-glyph" aria-hidden="true">阅</span><div><span class="eyebrow">ĐỌC LÚC RẢNH</span><h2>Một chữ, một câu chuyện đáng đọc.</h2><p>${A.articles.length} bài về Hán Việt, lịch sử, văn chương và đời sống. Mở một bài, đọc chậm, nối điều mới với những chữ đã quen.</p><a class="btn primary" href="#essays">Mở chuyên mục →</a><p><a href="#paths">Nối chữ → từ → câu → bài đọc → luyện tập</a></p></div></section>`;}
  function tile(a){const r=state().articles[a.id];return `<a class="essay-tile" href="#essay/${a.id}"><span class="essay-tile-top"><span>${esc(a.category)}</span><span>${a.minutes} phút đọc</span></span><span class="essay-tile-glyph" aria-hidden="true">${a.glyph}</span><h2>${esc(a.title)}</h2><p>${esc(a.deck)}</p><span class="essay-tile-bottom">${r?.finished?'Đã đánh dấu đọc xong':r?.position>0?'Đọc tiếp':'Mở bài'}${r?.bookmark?' · Đã lưu':''}<b>↗</b></span></a>`;}
  function library(){current=null;const read=Object.entries(state().articles).filter(([,v])=>v.opened&&!v.finished).sort((a,b)=>b[1].updated-a[1].updated)[0],saved=A.articles.filter(a=>state().articles[a.id]?.bookmark);
   host.mount(`<div class="essay-library"><header class="essay-library-head"><span class="eyebrow">HÁN TỰ MỖI NGÀY · CHUYÊN MỤC ĐỌC</span><h1>Đọc lúc rảnh<span>.</span></h1><p class="lead">Một câu chuyện đủ dài để hiểu, một mối liên hệ đủ rõ để nhớ. Tiếng Việt dẫn đường; chữ Hán đi cùng câu chuyện.</p><div class="chip-row"><span class="badge">${A.articles.length} bài đọc hoàn chỉnh</span><a class="text-btn" href="#readings">Đọc câu có phân tích →</a><a class="text-btn" href="#dictionary">Tra kho từ →</a><a class="text-btn" href="#materials">Tư liệu & audio gốc →</a></div></header>${read?`<a class="essay-resume" href="#essay/${esc(read[0])}"><span>ĐỌC TIẾP</span><strong>${esc(A.byId.get(read[0]).title)}</strong><span>↗</span></a>`:''}${saved.length?`<details class="essay-saved"><summary>Bài đã lưu · ${saved.length}</summary>${saved.map(a=>`<p><a href="#essay/${a.id}">${esc(a.title)}</a></p>`).join('')}</details>`:''}<aside class="paths-entry"><a href="#paths">Học theo mạch →</a><p>Chọn một câu hỏi, đi từ chữ và họ từ đến ngữ pháp, bài đọc rồi bài luyện. Mỗi bước có đường quay lại bước trước.</p><a href="#path/request">Bắt đầu với 请: từ chữ “thỉnh” đến cách mở lời →</a></aside><div class="essay-grid">${A.articles.map(tile).join('')}</div><p class="support-note">Chỗ đọc dở, bài đã lưu và dấu đọc xong được giữ trong trình duyệt này, mang theo khi xuất/nhập Sổ ôn. Đọc bài không tự cộng điểm thuộc từ.</p></div>`);
  }
  function remember(){if(!current||!enabled)return;const body=document.getElementById('essay-body');if(!body)return;const rect=body.getBoundingClientRect(),range=Math.max(1,rect.height-window.innerHeight*.45);const r=record(current);r.position=Math.min(1,Math.max(0,(90-rect.top)/range));r.updated=Date.now();host.save();}
  function onScroll(){if(!current||!enabled)return;clearTimeout(scrollTimer);scrollTimer=setTimeout(remember,500);}
  function cancel(){clearTimeout(scrollTimer);clearTimeout(restoreTimer);remember();enabled=false;current=null;}

  function quizMarkup(quiz) {
    const questions = quiz.questions.map((q, i) => `<li>
      <label for="essay-answer-${i}" lang="zh-CN">${esc(q.before)}<span class="essay-quiz-blank">＿</span>${esc(q.after)}</label>
      <select id="essay-answer-${i}" name="answer-${i}" required>
        <option value="">Chọn từ</option>
        ${quiz.options.map(word => `<option lang="zh-CN" value="${esc(word)}">${esc(word)}</option>`).join('')}
      </select>
      <div class="essay-quiz-feedback" id="essay-feedback-${i}" hidden>
        <strong></strong><span lang="zh-CN">${esc(q.before + q.answer + q.after)}</span>
        <span>${esc(q.translation)}</span><span>${esc(q.reason)}</span>
      </div>
    </li>`).join('');
    return `<section class="essay-quiz" aria-labelledby="essay-quiz-title">
      <h2 id="essay-quiz-title">${esc(quiz.title)}</h2>
      <form id="essay-quiz"><ol>${questions}</ol>
        <div class="essay-quiz-actions"><button class="btn primary" type="submit">Chấm bài</button>
          <button class="btn" type="reset">Làm lại</button></div>
        <p id="essay-quiz-score" role="status"></p>
      </form>
    </section>`;
  }

  function bindQuiz(form, quiz) {
    const score = form.querySelector('#essay-quiz-score');
    const feedback = quiz.questions.map((_, i) => form.querySelector('#essay-feedback-' + i));
    const clear = () => {
      score.textContent = '';
      feedback.forEach(result => { result.hidden = true; });
    };
    form.addEventListener('submit', event => {
      event.preventDefault();
      const answers = new FormData(form);
      let correct = 0;
      quiz.questions.forEach((q, i) => {
        const isCorrect = answers.get('answer-' + i) === q.answer;
        if (isCorrect) correct++;
        const result = feedback[i];
        result.dataset.correct = String(isCorrect);
        result.firstElementChild.textContent = isCorrect ? 'Đúng' : 'Chưa đúng';
        result.hidden = false;
      });
      score.textContent = 'Bạn làm đúng ' + correct + '/' + quiz.questions.length + ' câu.';
    });
    form.addEventListener('change', clear);
    form.addEventListener('reset', clear);
  }

  function open(id){const a=A.byId.get(id);if(!a){host.mount('<div class="empty"><h1>Chưa có bài này</h1><a class="btn" href="#essays">Về chuyên mục đọc</a></div>');return;}
   current=id;enabled=false;const r=record(id),resume=r.position;r.opened=Date.now();r.updated=Date.now();host.save();
   host.mount(`<div class="essay-reader"><div class="essay-toolbar"><a href="#essays" class="back-btn">← Chuyên mục đọc</a><div class="essay-tools"><button class="btn" id="essay-smaller" aria-label="Giảm cỡ chữ">A−</button><button class="btn" id="essay-larger" aria-label="Tăng cỡ chữ">A+</button><button class="btn" id="essay-save" aria-pressed="${r.bookmark}">${r.bookmark?'Đã lưu':'Lưu bài'}</button></div></div><article class="essay-paper" style="--essay-size:${state().prefs.font}px"><header class="essay-title"><div class="eyebrow">${esc(a.category)} · ${a.minutes} PHÚT ĐỌC</div><span class="essay-cover-glyph" aria-hidden="true">${a.glyph}</span><h1>${esc(a.title)}</h1><p class="essay-subtitle">${esc(a.subtitle)}</p></header>${resume>.03?'<div class="essay-position"><span>Đã trở lại gần chỗ bạn đọc dở.</span><button class="text-btn" id="essay-start">Đọc từ đầu ↑</button></div>':''}<nav class="essay-reader-toc" aria-label="Mục trong bài"><label for="essay-jump">Đến phần muốn đọc</label><select id="essay-jump"><option value="">Chọn một phần…</option>${a.sections.map((s,i)=>`<option value="essay-section-${i}">${i+1}. ${esc(s.title)}</option>`).join('')}${a.languageCase?'<option value="essay-language-case">Câu minh họa & cách đọc</option>':''}</select></nav><div id="essay-body" class="essay-prose">${a.sections.map((s,i)=>`<section id="essay-section-${i}"><h2>${esc(s.title)}</h2>${s.html}</section>`).join('')}${a.languageCase?`<section class="essay-case" id="essay-language-case"><h2>${esc(a.languageCase.heading)}</h2><p>${esc(a.languageCase.argument)}</p><a class="essay-language-link" href="#readings/${a.languageCase.readerId}">Mở câu minh họa · chạm từ & xem vai cụm →</a>${a.vocabularyFamilies?.map(f=>`<a class="essay-language-link" href="#vocabulary/${f.id}">Mở họ từ · ${esc(f.title)} →</a>`).join('')||''}</section>`:''}</div><div class="essay-endmark" aria-hidden="true">●</div><section class="essay-glossary"><h2>Những từ đi cùng bài đọc</h2><p>Mở ra xem khi cần. Từ mở rộng chưa tự được tính là đã học thuộc.</p><dl>${a.words.map(w=>`<div><dt lang="zh-CN">${host.words.some(x=>x.han===w.han)?`<button class="text-btn inline-han" data-detail="${esc(w.han)}">${esc(w.han)}</button>`:esc(w.han)} ${host.audio(w.han)}</dt><dd><span class="py">${esc(w.py)}</span><br>${esc(w.meaning)}</dd></div>`).join('')}</dl></section><details class="essay-sources"><summary>Nguồn & ghi chú biên soạn · ${a.sources.length}</summary><ol>${a.sources.map(s=>`<li>${htmlLink(s.url,s.title)}${s.note?`<p>${esc(s.note)}</p>`:''}</li>`).join('')}</ol><p>Ví dụ giao tiếp và phần suy ngẫm do ứng dụng biên soạn. Nguồn được dùng cho khẳng định lịch sử, cấu tạo hoặc cách dùng tương ứng, không phải để gán mọi diễn giải cho tác giả được dẫn.</p></details><div class="essay-complete"><button class="btn primary" id="essay-finish">${r.finished?'Đã đánh dấu đọc xong ✓':'Đánh dấu đã đọc xong'}</button><span>${r.finished?'Bạn có thể đọc lại bất cứ lúc nào.':'Dấu đọc xong là nhật ký của bạn, không phải điểm kiểm tra.'}</span></div>${window.HAN_PATHS?.forArticle(a.id,esc)||''}${a.quiz?`<p><a class="btn" href="#essay-practice/${a.id}">Sang trang luyện từ của bài →</a></p>`:''}${a.practiceHref?`<section class="essay-practice-link"><h2>Đọc xong, thử phân biệt trong ngữ cảnh</h2><p>Phần luyện ở trang riêng; không làm gián đoạn bài đọc.</p><a class="btn primary" href="${esc(a.practiceHref)}">Luyện 6 câu có lời giải →</a></section>`:''}<section class="essay-next"><h2>Bài đọc khác có liên quan</h2>${a.related.map(id=>A.byId.get(id)).filter(Boolean).map(x=>`<a href="#essay/${x.id}"><span>${esc(x.title)}</span><b>↗</b></a>`).join('')}</section></article></div>`);
   const $=s=>document.querySelector(s);
   $('#essay-jump').onchange=e=>{const section=document.getElementById(e.target.value);section?.scrollIntoView({behavior:'smooth',block:'start'});};
   $('#essay-save').onclick=()=>{const v=record(id);v.bookmark=!v.bookmark;v.bookmarkAt=Date.now();host.save();$('#essay-save').textContent=v.bookmark?'Đã lưu':'Lưu bài';$('#essay-save').setAttribute('aria-pressed',String(v.bookmark));};
   const font=delta=>{const p=state().prefs;p.font=Math.min(23,Math.max(17,p.font+delta));p.updated=Date.now();$('.essay-paper').style.setProperty('--essay-size',p.font+'px');host.save();};
   $('#essay-smaller').onclick=()=>font(-2);$('#essay-larger').onclick=()=>font(2);
   $('#essay-finish').onclick=()=>{const v=record(id);v.finished=Date.now();host.save();$('#essay-finish').textContent='Đã đánh dấu đọc xong ✓';$('#essay-finish').nextElementSibling.textContent='Bạn có thể đọc lại bất cứ lúc nào.';};
   if($('#essay-start'))$('#essay-start').onclick=()=>{window.scrollTo({top:0,behavior:'smooth'});record(id).position=0;host.save();};
   restoreTimer=setTimeout(()=>{if(current!==id)return;const body=document.getElementById('essay-body');if(body&&resume>.03){const top=body.getBoundingClientRect().top+window.scrollY,range=Math.max(1,body.getBoundingClientRect().height-window.innerHeight*.45);window.scrollTo(0,Math.max(0,top+resume*range-90));}enabled=true;},100);
  }
  window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('pagehide',remember);
  function quiz(id){cancel();const a=A.byId.get(id);if(!a?.quiz){library();return;}host.mount(`<div class="essay-quiz-separate"><a href="#essay/${a.id}">← Trở lại bài đọc</a><h1>Luyện từ: ${esc(a.title)}</h1><p>Phần luyện riêng sau khi đọc; chưa dùng để chấm thuộc từ.</p>${quizMarkup(a.quiz)}</div>`);bindQuiz(document.querySelector('#essay-quiz'),a.quiz);window.scrollTo(0,0);}
  return {library,open,cancel,banner,quiz};
 };
})();
