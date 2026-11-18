(() => {
 'use strict';
 window.createHanKnowledge=host=>{
  const K=window.HAN_KNOWLEDGE,E=window.HAN_ENGINE,D=window.HAN_PRACTICE,C=window.HAN_CURRICULUM;
  const esc=host.esc,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const words=host.words,byId=new Map(words.map(w=>[w.id,w])),concepts=new Map(D.concepts.map(c=>[c.id,c]));
  const state=()=>host.db().knowledge,learning=()=>host.db().learning;
  const atlas=window.createHanKnowledgeMap?.(host);
  const types={word:'Từ / nghĩa mới',grammar:'Ngữ pháp',family:'Họ chữ / họ từ',culture:'Văn hoá / lịch sử',sound:'Âm & cách đọc',register:'Ngữ thể / cách dùng'};
  const states={new:'Mới ghi nhận',understood:'Tự thấy đã hiểu',used:'Tự thấy đã vận dụng'};
  const statusNames={untried:'Chưa kiểm tra',review:'Cần học lại',helped:'Đúng có hỗ trợ',tested:'Đã có kết quả',spaced:'Qua nhiều ngày'};
  const date=ms=>ms?new Date(ms).toLocaleString('vi-VN',{timeZone:'Asia/Bangkok',dateStyle:'short',timeStyle:'short'}):'Chưa ghi nhận';
  const minutes=ms=>ms<60000?Math.floor(ms/1000)+' giây':Math.floor(ms/3600000)?Math.floor(ms/3600000)+' giờ '+Math.floor(ms%3600000/60000)+' phút':Math.floor(ms/60000)+' phút';
  const textKey=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();
  const links=()=>'<div class="chip-row knowledge-links"><a class="btn" href="#practice">Luyện nghe & đọc</a><a class="btn" href="#knowledge">Bản đồ tiến độ</a><a class="btn" href="#notebook">Sổ kiến thức</a><a class="btn" href="#guide">Chuẩn học & nguồn</a></div>';
  const head=(title,note)=>`<div class="page-head"><div><div class="eyebrow">ĐỘ RỘNG · ĐỘ SÂU · BẰNG CHỨNG</div><h1>${esc(title)}</h1><p>${esc(note)}</p></div></div>${links()}`;
  let windowDays=7,query='',page=0,noteQuery='',noteType='all',showArchived=false,editing=null;
  function skillStatus(card,skill,now){
   if(!card.last)return 'untried';if(card.lastOutcome==='wrong'||card.due<=now)return 'review';if(card.lastOutcome==='helped'||card.lastOutcome==='self')return 'helped';
   if(card.due<=now)return 'review';
   return card.box>=3&&card.days.length>=3&&(skill!=='reading'||card.typedDays.length>=2)?'spaced':'tested';
  }
  function badge(status,card){return `<span class="evidence-badge ${status}" title="${esc(card?.due?'Ôn tiếp: '+date(card.due):'Chưa có lịch')}">${statusNames[status]}</span>`;}
  function progress(){
   const k=state(),now=Date.now();
   host.mount(`<div class="knowledge-page"><header class="progress-page-head"><div><span class="progress-label">Hán tự mỗi ngày / Hồ sơ học tập</span><h1>Tiến độ của bạn</h1></div><div><p>Chữ · nghĩa · âm · nghe · dùng trong câu</p><div class="progress-page-actions"><button id="knowledge-export">↓ Xuất sổ</button><button id="knowledge-import">↑ Nhập sổ</button><a href="#notebook">Sổ kiến thức ↗</a></div></div></header>${atlas?.html()||''}
    <section class="progress-records"><span class="progress-label">Tra cứu khi cần</span><h2>Hồ sơ học tập chi tiết</h2><div class="progress-record-tabs" role="group" aria-label="Loại hồ sơ"><button class="active" data-record-tab="words" aria-pressed="true">Từng từ</button><button data-record-tab="concepts" aria-pressed="false">Câu & ngữ pháp</button><button data-record-tab="history" aria-pressed="false">Theo ngày</button></div>
    <div class="progress-record-pane" data-record-pane="words"><label class="sr-only" for="knowledge-search">Tìm từ đã ôn</label><input id="knowledge-search" class="search-input" value="${esc(query)}" placeholder="Tìm trong những từ đã ôn…"><div id="knowledge-words"></div></div>
    <div class="progress-record-pane" data-record-pane="concepts" hidden><div class="concept-list">${D.concepts.map(c=>{const cards=Object.entries(k.nodes['c:'+c.id]?.facets||{});return `<article><details><summary><b>${esc(c.title)}</b><span class="tiny muted">${cards.length?cards.map(([f,x])=>K.FACETS[f]+': '+statusNames[K.status(x,now)]).join(' · '):'Chưa kiểm tra'}</span></summary><p>${esc(c.text)}</p>${c.example?`<p class="inline-han">${esc(c.example[0])}</p><p class="py">${esc(c.example[1])}</p><p>${esc(c.example[2])}</p>`:''}${cards.map(([f,x])=>`<p>${esc(K.FACETS[f])}: ${badge(K.status(x,now),x)}<small> ${x.days.length} ngày độc lập · ${x.contexts.length} bối cảnh</small></p>`).join('')}<a href="${window.HAN_GRAMMAR.cards.some(g=>g.id===c.id)?'#grammar/'+c.id:'#practice'}">Luyện & xem cách dùng →</a></details></article>`;}).join('')}</div></div>
    <div class="progress-record-pane" data-record-pane="history" hidden><label class="compact-label" for="knowledge-window">Khoảng xem <select id="knowledge-window"><option value="7" ${windowDays===7?'selected':''}>7 ngày</option><option value="30" ${windowDays===30?'selected':''}>30 ngày</option><option value="0" ${windowDays===0?'selected':''}>Tất cả</option></select></label><div id="knowledge-timeline"></div></div></section>
    <footer class="progress-save-foot"><span>Tiến độ lưu trên trình duyệt này. Xuất sổ trước khi đổi thiết bị hoặc xóa dữ liệu duyệt web.</span><a href="#method">Cách tính mức nhớ & lịch ôn ↗</a></footer></div>`);
   $('#knowledge-export').onclick=host.exportProgress;$('#knowledge-import').onclick=host.importProgress;
   $('#knowledge-search').oninput=e=>{query=e.target.value;page=0;wordTable();};$('#knowledge-window').onchange=e=>{windowDays=Number(e.target.value);timeline();};
   $$('[data-record-tab]').forEach(b=>b.onclick=()=>{$$('[data-record-tab]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});$$('[data-record-pane]').forEach(p=>p.hidden=p.dataset.recordPane!==b.dataset.recordTab);});
   wordTable();timeline();atlas?.bind();
  }
  function eventTitle(e){
   const word=e.targets?.find(x=>x.startsWith('w:'));if(word&&byId.has(word.slice(2)))return byId.get(word.slice(2)).han;
   const p=D.passages.find(p=>p.questions.some(q=>q.id===e.item));if(p)return p.title;
   return D.sourceQuiz.find(q=>q.id===e.item)?.prompt||D.sentences.find(s=>e.item.startsWith(s.id+'-'))?.han||'Bài tập vận dụng';
  }
  function wordTable(){
   const l=learning(),now=Date.now(),pool=words.filter(w=>l.introduced[w.id]&&textKey([w.han,w.py,w.meaning,w.hv].join(' ')).includes(textKey(query)));
   const pages=Math.max(1,Math.ceil(pool.length/20));page=Math.min(page,pages-1);const shown=pool.slice(page*20,(page+1)*20);
   $('#knowledge-words').innerHTML=pool.length?`<p class="tiny muted">${pool.length} mục phù hợp. Trên điện thoại có thể vuốt ngang bảng.</p><div class="skill-table-wrap"><table class="skill-table evidence-table"><thead><tr><th>Từ / lần đầu</th>${E.SKILLS.map(k=>`<th>${esc(C.skillName(k))}</th>`).join('')}</tr></thead><tbody>${shown.map(w=>`<tr><th><button class="text-btn inline-han" data-detail="${esc(w.han)}">${esc(w.han)}</button><small>${l.introduced[w.id].source==='legacy'?'Từ bản cũ; chưa rõ ngày đầu':date(l.introduced[w.id].at)}</small></th>${E.SKILLS.map(k=>{const c=E.getCard(l,w.id,k);return `<td>${badge(skillStatus(c,k,now),c)}<small>${c.days.length} ngày tự trả lời${k==='reading'?' · '+c.typedDays.length+' ngày tự gõ':''}</small></td>`;}).join('')}</tr>`).join('')}</tbody></table></div><div class="knowledge-pagination"><button class="btn" id="knowledge-prev" ${page===0?'disabled':''}>← Trước</button><span>Trang ${page+1}/${pages}</span><button class="btn" id="knowledge-next" ${page+1>=pages?'disabled':''}>Sau →</button></div>`:'<p class="empty">Chưa có từ đã ôn phù hợp. Bạn có thể bắt đầu ở Học hôm nay.</p>';
   if($('#knowledge-prev'))$('#knowledge-prev').onclick=()=>{page--;wordTable();};if($('#knowledge-next'))$('#knowledge-next').onclick=()=>{page++;wordTable();};
  }
  function timeline(){
   const s=state(),l=learning(),rows=new Map(),now=Date.now(),cutoff=windowDays?E.dayKey(now-(windowDays-1)*E.DAY):'';
   const row=key=>{if(!rows.has(key))rows.set(key,{date:key,words:0,concepts:0,notes:0,answers:0,ms:0});return rows.get(key);};
   for(const x of Object.values(l.introduced))if(x.source!=='legacy'&&x.at)row(E.dayKey(x.at)).words++;
   for(const [id,x] of Object.entries(s.nodes))if(id.startsWith('c:')&&x.at)row(E.dayKey(x.at)).concepts++;
   for(const n of s.journal)if(n.at)row(E.dayKey(n.at)).notes++;
   for(const e of s.events)if(['attempt','word','self'].includes(e.kind)&&e.at)row(E.dayKey(e.at)).answers++;
   for(const [key,d] of Object.entries(s.daily))row(key).ms=Object.values(d.devices).reduce((a,b)=>a+b,0);
   const data=[...rows.values()].filter(r=>r.date>=cutoff).sort((a,b)=>b.date.localeCompare(a.date));
   const total=data.reduce((s,r)=>({words:s.words+r.words,concepts:s.concepts+r.concepts,notes:s.notes+r.notes,answers:s.answers+r.answers,ms:s.ms+r.ms}),{words:0,concepts:0,notes:0,answers:0,ms:0});
   $('#knowledge-timeline').innerHTML=`<p>Trong khoảng này: <b>${total.words} từ lần đầu ôn</b> · ${total.concepts} khái niệm mới mở · ${total.notes} ghi chú mới · ${total.answers} lượt ở nhật ký mới · ${minutes(total.ms)} tương tác ước tính.</p>${data.length?`<div class="skill-table-wrap"><table class="timeline-table"><thead><tr><th>Ngày</th><th>Từ lần đầu ôn</th><th>Khái niệm mở</th><th>Ghi chú mới</th><th>Lượt ghi mới</th><th>Tương tác</th></tr></thead><tbody>${data.map(r=>`<tr><th>${esc(r.date)}</th><td>${r.words}</td><td>${r.concepts}</td><td>${r.notes}</td><td>${r.answers}</td><td>${minutes(r.ms)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">Chưa có dữ liệu trong khoảng này. Các mục từ nhập từ bản cũ không bị gán ngày học mới.</div>'}<p class="tiny muted">Đây là ngày có dữ liệu, không phải chuỗi bắt buộc học hằng ngày. Mở kiến thức mới và nhớ vững là hai việc khác nhau.</p>`;
  }
  function notebook(){
   const s=state();host.mount(head('Sổ kiến thức · Giữ lại điều vừa hiểu.','Mỗi nhánh mới có ngày ghi, nguồn, ví dụ và mối nối về vốn từ cũ. Tự ghi nhận không tự nâng thành kết quả đã kiểm tra.')+`
    <div class="chip-row"><button class="btn primary" id="note-new">+ Ghi một điều mới</button><button class="btn" id="note-export">↓ Xuất sổ & tiến độ</button><button class="btn" id="note-import">↑ Nhập sổ</button></div>
    <div id="note-editor"></div><div class="notebook-filters"><label for="note-search">Tìm trong sổ<input id="note-search" value="${esc(noteQuery)}" placeholder="Từ, họ chữ, ví dụ, nguồn…"></label><label for="note-type-filter">Nhánh<select id="note-type-filter"><option value="all">Tất cả</option>${Object.entries(types).map(([id,name])=>`<option value="${id}" ${noteType===id?'selected':''}>${name}</option>`).join('')}</select></label><label class="archive-toggle"><input type="checkbox" id="note-show-archived" ${showArchived?'checked':''}> Xem mục đã cất</label></div><div id="note-list"></div>
    <section class="knowledge-section"><div class="section-top"><h2>Bài tự viết đã lưu</h2></div>${Object.entries(s.drafts).filter(([,d])=>d.text.trim()).sort((a,b)=>b[1].updated-a[1].updated).map(([id,d])=>`<article class="saved-draft"><span class="tiny muted">${date(d.updated)} · ${d.modelSeen?'Đã mở mẫu':'Chưa mở mẫu'} · Chưa được chấm</span><h3>${esc(D.passages.find(p=>p.id===id)?.title||id)}</h3><p class="inline-han">${esc(d.text)}</p><a class="btn" href="#practice/write/${esc(id)}">Mở để sửa →</a></article>`).join('')||'<p class="empty">Mở một đoạn nghe/đọc, chọn Tự viết và lưu câu của bạn. Bài sẽ nằm ở đây.</p>'}</section>`);
   $('#note-new').onclick=()=>editor(null);$('#note-export').onclick=host.exportProgress;$('#note-import').onclick=host.importProgress;
   $('#note-search').oninput=e=>{noteQuery=e.target.value;noteList();};$('#note-type-filter').onchange=e=>{noteType=e.target.value;noteList();};$('#note-show-archived').onchange=e=>{showArchived=e.target.checked;noteList();};
   noteList();
  }
  function noteList(){
   const notes=state().journal.filter(n=>!!n.archivedAt===showArchived&&(noteType==='all'||n.type===noteType)&&textKey([n.title,n.note,n.source].join(' ')).includes(textKey(noteQuery))).sort((a,b)=>b.updated-a.updated);
   $('#note-list').innerHTML=notes.length?notes.map(n=>`<article class="knowledge-note"><div class="section-top"><span class="badge">${esc(types[n.type])}</span><span class="tiny muted">Ghi ${date(n.at)}</span></div><h2>${esc(n.title)}</h2><p class="note-content">${esc(n.note)}</p>${n.source?`<p class="note-source"><b>Nguồn tự ghi:</b> ${esc(n.source)}</p>`:'<p class="tiny muted">Chưa ghi nguồn. Nếu là lịch sử hoặc từ nguyên, cần đối chiếu trước khi coi là kết luận.</p>'}<p class="tiny muted">${esc(states[n.state])} · Chưa được app kiểm tra · Sửa lần cuối ${date(n.updated)}</p>${n.linked.length?`<div class="chip-row">${n.linked.filter(id=>byId.has(id)).map(id=>`<button class="chip inline-han" data-detail="${esc(byId.get(id).han)}">${esc(byId.get(id).han)}</button>`).join('')}</div>`:''}<div class="chip-row"><button class="btn" data-note-edit="${n.id}">Sửa ghi chú</button><button class="text-btn" data-note-archive="${n.id}">${n.archivedAt?'Đưa lại sổ':'Cất vào mục đã lưu'}</button></div></article>`).join(''):'<div class="empty">Chưa có ghi chú phù hợp. Ví dụ: ghi họ chữ 包–抱–跑, nêu thành phần chung và nguồn đối chiếu; rồi thêm một câu bạn tự dùng.</div>';
   $$('[data-note-edit]').forEach(b=>b.onclick=()=>editor(b.dataset.noteEdit));$$('[data-note-archive]').forEach(b=>b.onclick=()=>{const n=state().journal.find(n=>n.id===b.dataset.noteArchive);n.archivedAt=n.archivedAt?0:Date.now();n.updated=Date.now();host.save();noteList();});
  }
  function editor(id){
   editing=id;const old=state().journal.find(n=>n.id===id)||{};
   $('#note-editor').innerHTML=`<form id="note-form" class="writing-studio"><h2>${id?'Sửa ghi chú':'Một nhánh mới bạn vừa học'}</h2><label for="note-title">Tên kiến thức<input id="note-title" required maxlength="120" value="${esc(old.title||'')}" placeholder="Ví dụ: 给我打电话 · ai gọi cho ai?"></label><div class="note-form-pair"><label for="note-type">Nhánh kiến thức<select id="note-type">${Object.entries(types).map(([k,v])=>`<option value="${k}" ${old.type===k?'selected':''}>${v}</option>`).join('')}</select></label><label for="note-state">Bạn tự ghi nhận<select id="note-state">${Object.entries(states).map(([k,v])=>`<option value="${k}" ${old.state===k?'selected':''}>${v}</option>`).join('')}</select></label></div><label for="note-body">Điều hiểu + ví dụ + điều còn chưa chắc<textarea id="note-body" maxlength="3000" rows="6" placeholder="Tôi hiểu…\nVí dụ tôi tự đặt…\nTôi cần kiểm tra thêm…">${esc(old.note||'')}</textarea></label><label for="note-source">Nguồn (link / tên sách / phần trong session)<input id="note-source" maxlength="500" value="${esc(old.source||'')}" placeholder="Nguồn nào giúp xác nhận? Có phải chỉ là mẹo nhớ?"></label><label for="note-linked">Nối về từ trong kho<input id="note-linked" value="${esc((old.linked||[]).filter(id=>byId.has(id)).map(id=>byId.get(id).han).join(' '))}" placeholder="给 打电话 手机 · cách nhau bằng dấu cách hoặc dấu phẩy"></label><div class="chip-row"><button class="btn primary" type="submit">Lưu ghi chú</button><button class="btn" type="button" id="note-cancel">Đóng</button></div><p id="note-form-status" role="status"></p><p class="support-note">Đây là hồ sơ học tập do bạn ghi. Nguồn và tự đánh giá chưa được kiểm chứng tự động.</p></form>`;
   $('#note-cancel').onclick=()=>{$('#note-editor').innerHTML='';editing=null;};
   $('#note-form').onsubmit=e=>{e.preventDefault();const title=$('#note-title').value.trim(),tokens=$('#note-linked').value.split(/[\s,，、·]+/).filter(Boolean),linked=tokens.map(h=>D.byHan.get(h)?.id).filter(Boolean),unmatched=tokens.filter(h=>!D.byHan.has(h));
    if(unmatched.length){$('#note-form-status').textContent='Chưa có trong kho: '+unmatched.join(', ')+'. Giữ từ mới trong phần nội dung; ô nối chỉ dùng từ đã có.';return;}
    const fields={title,type:$('#note-type').value,state:$('#note-state').value,note:$('#note-body').value,source:$('#note-source').value,linked:[...new Set(linked)].slice(0,20)};
    try{if(editing){const n=state().journal.find(n=>n.id===editing);Object.assign(n,fields,{updated:Date.now()});}else K.addNote(state(),fields);host.save();$('#note-editor').innerHTML='';editing=null;noteList();host.toast('Đã lưu kiến thức và ngày ghi nhận.');}catch(err){$('#note-form-status').textContent=err.message;}
   };
   $('#note-editor').scrollIntoView?.({behavior:'smooth',block:'start'});$('#note-title').focus?.();
  }
  return {progress,notebook,cancel:()=>{editing=null;atlas?.cancel();}};
 };
})();
