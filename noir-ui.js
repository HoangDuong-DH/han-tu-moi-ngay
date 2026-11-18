(() => {
 'use strict';
 window.createHanNoir=host=>{
  const esc=host.esc,$$=s=>[...document.querySelectorAll(s)];
  let sound=null,starting=false,soundEpoch=0;
  function theme(c){document.body?.classList.toggle('case-noir',!!c?.atmosphere);}
  function soundLabels(){$$('[data-ambience-toggle]').forEach(b=>{b.textContent=sound?'Tắt âm nền':'Bật âm nền';b.setAttribute('aria-pressed',String(!!sound));});}
  function stop(){soundEpoch++;starting=false;if(sound){const old=sound;sound=null;old.close().catch(()=>{});}soundLabels();}
  async function toggle(c){
   if(sound||starting){stop();return;}
   const AC=window.AudioContext||window.webkitAudioContext;
   if(!AC){host.toast('Trình duyệt này chưa phát được âm nền. Bạn vẫn đọc và nghe tiếng Trung bằng nút ♪.');return;}
   const epoch=++soundEpoch;starting=true;
   try{
    const ctx=new AC();await ctx.resume();
    if(epoch!==soundEpoch||document.hidden){await ctx.close();return;}
    if(ctx.state!=='running'){await ctx.close();host.toast('Chạm lại nút để bật âm thanh trên thiết bị.');return;}
    const buffer=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate),samples=buffer.getChannelData(0);
    for(let i=0;i<samples.length;i++)samples[i]=Math.random()*2-1;
    const noise=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
    noise.buffer=buffer;noise.loop=true;filter.type='lowpass';filter.frequency.value=c.atmosphere==='rain'?1200:650;gain.gain.value=.025;
    noise.connect(filter);filter.connect(gain);gain.connect(ctx.destination);noise.start();
    if(c.atmosphere==='projector'){const hum=ctx.createOscillator(),quiet=ctx.createGain();hum.frequency.value=48;quiet.gain.value=.008;hum.connect(quiet);quiet.connect(ctx.destination);hum.start();}
    sound=ctx;soundLabels();
   }catch{stop();host.toast('Âm nền chưa bật được. Các phần chơi khác vẫn dùng được.');}finally{if(epoch===soundEpoch)starting=false;}
  }
  function art(c,controls=false){if(!c.atmosphere)return '';return `<div class="noir-art art-${c.id}" aria-hidden="true">${c.id==='room304'?'<div class="noir-window"></div><div class="noir-door"><span>304</span><i></i></div><span class="noir-art-time">22:15</span><span class="noir-art-word">别上来。</span>':'<div class="noir-screen"><span>00:07:12</span><i></i></div><div class="noir-seats"><i></i><i></i><i></i><i></i><i></i></div><span class="noir-art-word">她还在后边。</span>'}</div>${controls?soundControl(c):''}`;}
  function soundControl(c){return `<div class="noir-sound"><span>${c.atmosphere==='rain'?'Mưa ngoài hiên':'Tiếng máy chiếu'} · âm nền nhẹ</span><button data-ambience-toggle class="btn" aria-pressed="${!!sound}">${sound?'Tắt âm nền':'Bật âm nền'}</button></div>`;}
  function hub(library,progress,count,crossCase){
   const night=library.filter(c=>c.atmosphere),old=library.filter(c=>!c.atmosphere),closed=night.filter(c=>progress(c).decision).length;
   const card=(c,i)=>{const p=progress(c),n=count(c);return `<a class="dossier-cover ${c.atmosphere?'noir-cover':'dossier-'+c.id}" href="#case/${c.id}">${art(c)}<div class="noir-cover-body"><span class="badge">${esc(c.genre||'HỒ SƠ ĐỜI SỐNG')}</span><h2>${esc(c.title)}</h2><p class="noir-tagline">${esc(c.subtitle)}</p><p class="dossier-blurb">${esc(c.blurb)}</p><small>${esc(c.duration)} · ${c.evidence.length} chứng cứ · ${c.stages.length} chương</small><span class="dossier-bottom">${p.decision?'Xem lại đêm đã qua':n?`Tiếp tục · ${n}/4 chương`:'Bước vào vụ án'} <b>↗</b></span></div></a>`;};
   return `<section class="noir-library"><div class="noir-library-head"><div><div class="eyebrow">THÁM TỬ CÂU · HỒ SƠ ĐÊM</div><h1>Có người vẫn ở trong đó.</h1><p>Một cuộc gọi sau giờ chết. Một người mất tích sau màn bạc. Đọc những gì còn lại, dựng chuyện đã xảy ra và tìm xem điều gì đang bị che khuất.</p></div><span class="noir-stamp" aria-hidden="true">夜</span></div><div class="dossier-grid noir-grid">${night.map(card).join('')}</div><div class="noir-how"><b>Khám phá cảnh → Đọc dấu vết → Ghép lời giải → Mở lớp tiếp theo</b><p>Mỗi chương mở thêm chứng cứ. Có sơ đồ, ghi chú, âm nền tùy bật và gợi ý khi mắc. Chữ Hán đi cùng nút nghe, pinyin và nghĩa để bạn vừa đọc truyện vừa học.</p></div></section>
   <p class="support-note">Đã khép ${closed}/${night.length} hồ sơ đêm. Đây là các câu chuyện hư cấu; tên, truyền thuyết và chứng cứ được sáng tác cho game.</p>
   ${closed===night.length?'<section class="cross-case"><div class="eyebrow">SAU HAI ĐÊM</div><h2>Một dấu vết chỉ có nghĩa khi đặt đúng mốc</h2><p>Giọng nói có mốc thu và mốc phát. “Phía sau” cần một vật làm mốc. Một con số có thể đo thời lượng thay vì giờ trong ngày. Nỗi sợ thường đến trước lúc ta kịp giữ riêng những điều ấy.</p><p>Đã giải được chuyện xảy ra không có nghĩa đã biết hết cuộc đời của mọi người. Hãy giữ cả phần đã chứng minh và phần vẫn cần tìm.</p></section>':''}
   <details class="invest-help"><summary>Cách chơi, pinyin và gợi ý</summary><ol><li>Đọc cảnh mới, chọn một nơi trên sơ đồ để lọc các dấu vết đã mở.</li><li>Mở chứng cứ, nghe chữ Hán hoặc mở pinyin và nghĩa. Từ vượt kho có chú thích riêng.</li><li>Điền giả thuyết và dẫn nhóm nguồn phù hợp. Chỉ đáp án đúng mà chưa có căn cứ chưa đủ chốt.</li><li>Nếu mắc, mở gợi ý từng nấc hoặc xem lời giải mẫu. App lưu rõ lượt có trợ giúp.</li><li>Chốt chương để mở cảnh sau. Sau bốn chương có ba đoạn kết để khám phá.</li></ol><p>Ghi chú tự viết được lưu, không chấm tự động. Tiến độ ở trình duyệt và được giữ trong tệp xuất sổ ôn. Những từ bổ trợ của truyện không tự cộng vào kho từ đã học.</p></details>
   <details class="invest-help older-files"><summary>Ba hồ sơ đời sống đã có · giữ nguyên tiến độ</summary><div class="dossier-grid">${old.map(card).join('')}</div>${old.every(c=>progress(c).decision)?crossCase():''}</details>
   <details class="invest-help"><summary>Tham khảo thiết kế và tác giả</summary><p>Truyện được sáng tác mới. Cơ chế đối chiếu và ghép các phần lời giải tham khảo nguyên tắc điều tra của <a href="https://www.playstack.com/games/goldenidol/" target="_blank" rel="noopener">The Case of the Golden Idol</a>; tra lời khai theo từ khóa tham khảo <a href="https://www.herstorygame.com/about/" target="_blank" rel="noopener">Her Story</a>; tái dựng bằng nhiều dấu vết tham khảo <a href="https://obradinn.com/media/prerelease.html" target="_blank" rel="noopener">Return of the Obra Dinn</a>. Không sử dụng cốt truyện hay nhân vật của các game ấy.</p></details>
   <div class="chip-row"><a class="btn" href="#game/detective-warmup">Hồ sơ làm quen · Chiếc điện thoại</a><a class="btn" href="#games">Các game khác</a><a class="btn" href="#daily">Ôn từ hôm nay</a></div>`;
  }
  function scene(c,index,place){if(!c.atmosphere)return '';const s=c.scenes[index];return `<section class="noir-scene"><div class="noir-scene-top"><span class="eyebrow">CHƯƠNG 0${index+1} / 04</span><span>${esc(s.place)}</span></div><p class="noir-scene-quote" lang="zh-CN">${esc(s.han)} ${host.audio(s.han)}</p><details data-language-help><summary>Pinyin & nghĩa của câu trong cảnh</summary><p class="py">${esc(s.py)}</p><p>${esc(s.vn)}</p></details><p class="noir-scene-narrative">${esc(s.text)}</p>${soundControl(c)}<div class="noir-jump"><button class="btn" data-case-jump="archive">Đọc chứng cứ ↓</button><button class="btn primary" data-case-jump="desk">Đến bàn suy luận ↓</button></div><details class="noir-map" open><summary>Sơ đồ điều tra · chạm một nơi để lọc chứng cứ</summary><p>${esc(c.mapCaption)}</p><div class="noir-locations"><button data-case-place="all" class="${place==='all'?'active':''}" aria-pressed="${place==='all'}"><b>全部</b><small>quánbù</small><span>Tất cả nơi</span></button>${c.locations.map(x=>`<button data-case-place="${x.id}" class="${place===x.id?'active':''}" aria-pressed="${place===x.id}"><b lang="zh-CN">${esc(x.han)}</b><small>${esc(x.py)}</small><span>${esc(x.label)}</span></button>`).join('')}</div><p class="tiny muted">Sơ đồ quan hệ vị trí, không biểu diễn khoảng cách. Chỉ lọc tài liệu đã mở khóa.</p></details></section>`;}
  function bind(c,onPlace){if(!c?.atmosphere)return;$$('[data-ambience-toggle]').forEach(b=>b.onclick=()=>toggle(c));$$('[data-case-place]').forEach(b=>b.onclick=()=>{$$('[data-case-place]').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active));});onPlace?.(b.dataset.casePlace);});$$('[data-case-jump]').forEach(b=>b.onclick=()=>document.querySelector(b.dataset.caseJump==='desk'?'.deduction-desk':'.invest-archive')?.scrollIntoView({behavior:'smooth',block:'start'}));}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  return {theme,art,hub,scene,bind,stop};
 };
})();
