(() => {
 'use strict';const L=window.HAN_READING_LAB;
 // These are real occurrences in authored examples, not a substring character match.
 const occurrences=new Map();
 for(const r of L.readings)for(const l of r.lines)for(const t of l.tokens)for(const h of t.links||[]){if(!L.byHan.has(h))continue;const rows=occurrences.get(h)||new Map();rows.set(r.id,r);occurrences.set(h,rows);}
 L.occurrences=occurrences;
 const render=window.HAN_LEXICON.render;
 window.HAN_LEXICON.render=(word,host)=>{const rows=[...(occurrences.get(word.han)?.values()||[])];return render(word,host)+(rows.length?`<section class="lab-dictionary-connections"><h2>Gặp từ trong câu hoàn chỉnh</h2><p>Mở đoạn để xem ai làm gì, từ nhận nghĩa nào và nối với cấu trúc đã học.</p>${rows.slice(0,5).map(r=>`<p><a href="#readings/${r.id}">${host.esc(r.title)} →</a></p>`).join('')}</section>`:'');};
 const grammarRender=window.HAN_GRAMMAR_DEPTH.render;
 window.HAN_GRAMMAR_DEPTH.render=(g,esc,audio)=>grammarRender(g,esc,audio)+`<p><a class="essay-language-link" href="#syntax/${encodeURIComponent(g.id)}">Xem cách phân vai, phủ định & thay từ quen →</a></p>`;
})();
