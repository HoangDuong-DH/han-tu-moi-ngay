(() => {
  'use strict';

  const draftKey = 'tea:best';
  const fieldNames = {base:'Nền',temp:'Nhiệt độ',sugar:'Đường'};
  const timeText = seconds => String(Math.floor(seconds/60)).padStart(2,'0') + ':' + String(Math.floor(seconds)%60).padStart(2,'0');

  window.createHanNightTea = host => {
    const {esc,root,audio} = host;
    const T = window.HAN_NIGHT_TEA;
    const bank = window.HAN_TEA_ORDERS;
    const byHan = new Map(host.words.map(word => [word.han,word]));
    const $ = selector => root.querySelector(selector);
    let run = null, timer = null, lastTick = 0;

    const button = (id,label,action,extra = '',disabled = false) => '<button type="button" id="' + id + '" class="tea-btn' + extra
      + '" data-tea-act="' + action + '"' + (disabled ? ' disabled' : '') + '>' + esc(label) + '</button>';
    const vietnamese = (key,value) => T.fields[key][value]?.[1] || '';
    const cupLabel = cup => T.keys.map(key => vietnamese(key,cup[key])).filter(Boolean).join(' · ');
    const cupHan = cup => T.keys.map(key => T.fields[key][cup[key]][0]).join(' · ');
    const best = () => Math.max(0,Math.min(250,Number.parseInt(host.db().knowledge.drafts[draftKey]?.text || '0',10) || 0));
    const goBack = '<a class="tea-back" href="#games">← Chơi &amp; luyện</a>';

    function lobby() {
      return '<a class="tea-feature" href="#game/tea"><span><strong>Quầy trà đêm</strong>'
        + '<small>Pha từng ly, xoay đơn và phục vụ trước khi khách bỏ đi.</small>'
        + '<span class="tea-feature-cta">Mở quầy →</span></span></a>';
    }

    function mount(markup,classes = '',focus = '') {
      host.mount('<section class="tea ' + classes + '">' + markup + '</section>');
      root.querySelectorAll('[data-tea-act]').forEach(control => {control.onclick = () => action(control);});
      const next = focus && document.getElementById(focus);
      if (next && !next.disabled) next.focus({preventScroll:true});
    }

    function intro() {
      cancel();
      run = null;
      mount(goBack + '<header class="tea-cover"><div><h1 id="tea-title" tabindex="-1">Quầy trà đêm</h1>'
        + '<p>Khách gọi bằng tiếng Trung. Bạn pha, chọn bàn và giữ quầy chạy qua giờ cao điểm.</p></div></header>'
        + '<div class="tea-intro-body"><div class="tea-actions">'
        + button('tea-start','Mở ca đông khách','rush',' tea-primary') + button('tea-practice','Tập pha tự do','practice') + '</div>'
        + (best() ? '<p class="tea-best">Kỷ lục ca đông khách <strong>' + best() + ' xu</strong></p>' : '')
        + '<details class="tea-how"><summary>Cách chơi</summary><p>Chọn phiếu của khách, rồi chọn đồ uống, nhiệt độ và đường. Mỗi lần phục vụ giao một ly. Bạn có thể cất ly lên khay khi cần pha đơn khác trước.</p>'
        + '<p>Khách có thể đổi món. Nghe lại hoặc mở nghĩa ngay trên phiếu. Ca tập cho bạn thời gian đọc và pha theo ý mình.</p></details></div>',
        'tea-entry','tea-title');
      window.scrollTo(0,0);
    }

    function open() {
      if (run && !run.shift.done) {
        paint('tea-title');
        startClock();
        window.scrollTo(0,0);
      } else intro();
    }

    function start(rush) {
      const order = T.pickShift(bank,host.reviewedWords(),byHan,host.shuffle);
      run = {shift:T.createShift(order,rush),paused:false,selected:'',help:'',notice:null,finished:false};
      paint('tea-title');
      startClock();
      window.scrollTo(0,0);
    }

    function orderLine(paper,ticket = '') {
      return '<span lang="zh-CN" data-study-text data-study-py="' + esc(paper.py) + '" data-study-vi="' + esc(paper.vi)
        + '"' + (ticket ? ' data-tea-order="' + esc(ticket) + '"' : '') + '>' + esc(paper.line) + '</span>';
    }

    function customerCard(ticket,shift) {
      const name = ticket.entry.name;
      const remaining = Math.ceil(T.secondsLeft(shift,ticket));
      return '<button type="button" class="tea-customer" id="tea-guest-' + esc(ticket.id) + '" data-tea-act="select" data-ticket="'
        + esc(ticket.id) + '" aria-pressed="' + (ticket.id === run.selected) + '"' + (run.paused ? ' disabled' : '')
        + (ticket.revised ? ' data-revised="true"' : '') + '><span class="tea-guest-name">' + esc(name)
        + (ticket.revised ? '<span class="tea-changed">Đổi món</span>' : '') + '</span><span class="tea-guest-count">'
        + ticket.remaining.length + ' ly'
        + (shift.rush ? ' <span data-remaining="' + esc(ticket.id) + '">' + remaining + 's</span>' : '') + '</span>'
        + (shift.rush ? '<progress aria-label="Thời gian còn lại của ' + esc(name) + '" max="' + ticket.patience
          + '" value="' + Math.min(remaining,ticket.patience) + '" data-patience="' + esc(ticket.id) + '"></progress>' : '') + '</button>';
    }

    function ticketPage(ticket) {
      if (!ticket) return '<div class="tea-ticket"><p>Khách mới sắp tới.</p></div>';
      const {paper} = ticket;
      const open = run.help === ticket.id;
      const orderParts = ticket.delivered ? '<ul class="tea-order-parts">'
        + ticket.sent.map(cup => '<li data-cup-status="sent"><small>✓ Đã giao</small><span lang="zh-CN">' + esc(cupHan(cup)) + '</span></li>').join('')
        + ticket.remaining.map(cup => '<li data-cup-status="pending"><small>Còn lại</small><span lang="zh-CN">' + esc(cupHan(cup)) + '</span></li>').join('')
        + '</ul>' : '';
      return '<div class="tea-ticket" data-current-order="' + esc(ticket.id) + '"><p class="tea-line">'
        + orderLine(paper,ticket.id) + '</p>' + orderParts + '<div class="tea-ticket-actions">' + audio(paper.line)
        + button('tea-translate',open ? 'Gập nghĩa' : 'Mở nghĩa','translate',' tea-text') + '</div>'
        + (open ? '<div class="tea-translation" aria-live="polite"><p class="tea-py" lang="zh-Latn">' + esc(paper.py)
          + '</p><p>' + esc(paper.vi) + '</p></div>' : '') + '</div>';
    }

    function bench(shift,ticket) {
      const {cup,spare} = shift;
      const haveCup = T.hasCup(cup);
      const extra = T.hasCup(spare);
      const tray = extra ? (haveCup ? 'Đổi ly' : 'Lấy ly đã cất') : 'Cất ly';
      const cupVisual = '<span class="tea-cup" aria-hidden="true" data-base="' + esc(cup.base || '')
        + '" data-temp="' + esc(cup.temp || '') + '"><i></i><b></b></span>';
      return '<section class="tea-bench" aria-label="Bàn pha"><div class="tea-cup-row">' + cupVisual + '<div class="tea-cup-label">'
        + '<strong>' + (haveCup ? esc(cupLabel(cup)) : 'Ly đang trống') + '</strong>'
        + (extra ? '<small>Khay · ' + esc(cupLabel(spare)) + '</small>' : '') + '</div></div>'
        + T.keys.map(key => '<fieldset class="tea-ingredients"><legend>' + fieldNames[key] + '</legend><div>'
          + Object.entries(T.fields[key]).map(([value,[han,vi]]) => '<button class="tea-ingredient" type="button" id="tea-' + key + '-' + value
            + '" data-tea-act="ingredient" data-field="' + key + '" data-value="' + value + '" aria-pressed="' + (cup[key] === value)
            + '"' + (run.paused ? ' disabled' : '') + '><span lang="zh-CN">' + han + '</span><small>' + vi + '</small></button>').join('')
          + '</div></fieldset>').join('') + '<div class="tea-actions tea-tray-actions">'
        + button('tea-tray',tray,'tray','',run.paused || (!extra && !T.cupReady(cup)))
        + button('tea-clear','Xóa ly','clear',' tea-text',run.paused || !haveCup)
        + button('tea-serve',ticket ? 'Phục vụ ' + ticket.entry.name : 'Phục vụ','serve',' tea-primary',
          run.paused || !ticket || !T.cupReady(cup)) + '</div></section>';
    }

    function notice() {
      const line = run.paused ? 'Đã tạm dừng ca.' : run.notice?.text || '';
      if (!line) return '';
      return '<p class="tea-notice" role="status" data-tone="' + (run.paused ? 'pause' : run.notice.kind) + '">' + esc(line) + '</p>';
    }

    function paint(focus = '') {
      if (!run) return;
      const {shift} = run;
      if (shift.done) {endShift();return;}
      const guests = T.active(shift);
      const selected = guests.find(ticket => ticket.id === run.selected) || guests[0];
      run.selected = selected?.id || '';
      const left = T.queued(shift).length;
      const lastFocus = focus || (root.contains(document.activeElement) ? document.activeElement.id : '');
      mount('<div class="tea-top">' + goBack + '<div class="tea-actions">'
        + (run.paused ? button('tea-abandon','Bỏ ca','menu',' tea-text tea-small') : '')
        + button('tea-pause',run.paused ? 'Tiếp tục' : 'Tạm dừng','pause',' tea-small') + '</div></div>'
        + '<header class="tea-hud"><h1 id="tea-title" tabindex="-1">Quầy trà đêm</h1><div><strong id="tea-coins">' + shift.coins
        + ' xu</strong><span>Chuỗi ×' + shift.combo + '</span><span id="tea-clock">' + timeText(shift.time) + '</span></div></header>'
        + '<div class="tea-counter"><div class="tea-queue-area"><div class="tea-queue-title"><h2>Khách đang chờ</h2><span>'
        + (left ? 'Còn ' + left + ' khách sắp tới' : 'Khách cuối ca') + '</span></div><div class="tea-queue" aria-label="Chọn khách">'
        + guests.map(ticket => customerCard(ticket,shift)).join('') + '</div>' + ticketPage(selected) + notice()
        + '</div>' + bench(shift,selected) + '</div>', 'tea-running',lastFocus);
    }

    function mismatchText(result) {
      if (result.kind === 'sequence') return 'Khách dặn giao ly ' + cupLabel(result.expected) + ' trước. Giữ ly này trên khay để đưa sau.';
      const correction = result.mismatch.map(key => {
        const [han,vi] = T.fields[key][result.expected[key]];
        return han + ' là ' + vi.toLowerCase() + ', ly này đang ' + vietnamese(key,result.cup[key]).toLowerCase() + '.';
      }).join(' ');
      return correction + (result.focusMiss ? ' ' + result.paper.note : '');
    }

    function record(result) {
      const {ticket} = result;
      const word = byHan.get(ticket.paper.target);
      if (!word) return;
      if (result.ok && result.completed) host.record(word,true,ticket.helped || ticket.focusMiss);
      else if (!result.ok && result.focusMiss) host.record(word,false,ticket.helped);
    }

    function serve() {
      const result = T.serve(run.shift,run.selected);
      if (!result) return;
      record(result);
      if (result.ok) {
        const {ticket} = result;
        const tail = result.completed ? ' Đã đủ đơn.' : ' Còn ' + ticket.remaining.length + ' ly cho khách này.';
        run.notice = {kind:'success',text:ticket.entry.name + ' đã nhận ly. +' + result.coins + ' xu.' + tail};
        run.help = '';
      } else {
        run.notice = {kind:'error',text:mismatchText(result) + (run.shift.rush ? ' Thời gian chờ giảm 4 giây.' : '')};
      }
      paint(result.ok ? 'tea-base-black' : 'tea-serve');
    }

    function lookedUp(id) {
      const ticket = run && T.active(run.shift).find(ticket => ticket.id === id);
      if (ticket) ticket.helped = true;
    }

    function action(control) {
      const action = control.dataset.teaAct;
      if (action === 'rush' || action === 'practice') {start(action === 'rush');return;}
      if (action === 'menu') {intro();return;}
      if (!run || run.shift.done) return;
      if (action === 'pause') {
        run.paused = !run.paused;
        paint('tea-pause');
        return;
      }
      if (action === 'translate') {
        run.help = run.help === run.selected ? '' : run.selected;
        if (run.help) lookedUp(run.help);
        paint(control.id);
        return;
      }
      if (run.paused) return;
      if (action === 'select') {
        run.selected = control.dataset.ticket;
        run.notice = null;
      }
      if (action === 'ingredient') T.ingredient(run.shift,control.dataset.field,control.dataset.value);
      if (action === 'tray') T.swap(run.shift);
      if (action === 'clear') run.shift.cup = {};
      if (action === 'serve') {serve();return;}
      paint(control.id);
    }

    function updateTime() {
      const {shift} = run;
      const clock = $('#tea-clock');
      if (clock) clock.textContent = timeText(shift.time);
      if (!shift.rush) return;
      for (const ticket of T.active(shift)) {
        const seconds = Math.ceil(T.secondsLeft(shift,ticket));
        const clock = $('[data-remaining="' + ticket.id + '"]');
        const bar = $('[data-patience="' + ticket.id + '"]');
        if (clock) clock.textContent = seconds + 's';
        if (bar) bar.value = Math.min(seconds,ticket.patience);
        const card = $('#tea-guest-' + ticket.id);
        if (card) card.dataset.urgent = String(seconds <= 12);
      }
    }

    function tick() {
      const now = performance.now();
      const delta = Math.min(.6,(now - lastTick)/1000);
      lastTick = now;
      if (!run || run.paused || document.hidden || host.lookupOpen()) return;
      const selection = document.getSelection();
      if (selection && !selection.isCollapsed && selection.anchorNode?.parentElement?.closest('[data-tea-order]')) return;
      const events = T.elapse(run.shift,delta);
      const revised = events.find(event => event.kind === 'revision');
      const departed = events.find(event => event.kind === 'left');
      if (revised) {
        const name = revised.ticket.entry.name;
        if (run.help === revised.ticket.id) run.help = '';
        run.notice = {kind:'change',text:name + ' vừa đổi món. Mở phiếu mới để xem lời dặn.'};
      } else if (departed) {
        run.notice = {kind:'error',text:departed.ticket.entry.name + ' đã rời quầy. Bạn vẫn có thể phục vụ các khách còn lại.'};
      }
      if (events.length || run.shift.done) paint();
      else updateTime();
    }

    function startClock() {
      cancel();
      lastTick = performance.now();
      timer = setInterval(tick,200);
    }

    function cancel() {
      if (timer !== null) clearInterval(timer);
      timer = null;
    }

    function receipt(ticket) {
      const {paper,lastWrong} = ticket;
      const word = byHan.get(paper.target);
      return '<article class="tea-receipt"><h3>' + esc(ticket.entry.name) + ' <small>'
        + (ticket.status === 'served' ? 'Đã đủ đơn' : 'Khách rời quầy') + '</small></h3><p class="tea-receipt-line">'
        + orderLine(paper) + audio(paper.line) + '</p><p class="tea-py" lang="zh-Latn">' + esc(paper.py)
        + '</p><p>' + esc(paper.vi) + '</p><p>' + esc(paper.note) + '</p>'
        + (lastWrong ? '<p class="tea-receipt-miss">Lúc nhầm bạn pha ' + esc(cupLabel(lastWrong.cup))
          + '. Khách đang chờ ' + esc(cupLabel(lastWrong.expected)) + '.</p>' : '')
        + (word ? '<button type="button" class="tea-btn tea-text" data-detail="' + esc(word.han) + '">Thẻ từ ' + esc(word.han) + '</button>' : '')
        + '</article>';
    }

    function endShift() {
      cancel();
      const {shift} = run;
      const served = shift.tickets.filter(ticket => ticket.status === 'served').length;
      if (!run.finished) {
        run.finished = true;
        run.record = shift.rush && shift.coins > best();
        if (run.record) {
          window.HAN_KNOWLEDGE.saveDraft(host.db().knowledge,draftKey,String(shift.coins),[],false);
        }
        host.finish(served,shift.tickets.length);
      }
      const trouble = shift.tickets.filter(ticket => ticket.mistakes || ticket.helped || ticket.status === 'left');
      const other = shift.tickets.filter(ticket => !trouble.includes(ticket));
      mount(goBack + '<header class="tea-result-head"><h1 id="tea-title" tabindex="-1">Ca đã khép lại</h1><p class="tea-total">'
        + shift.coins + ' <small>xu</small></p><p>' + served + '/' + shift.tickets.length + ' khách nhận đủ đơn · '
        + shift.servedCups + ' ly · Chuỗi dài nhất ×' + shift.bestCombo + '</p>'
        + (run.record ? '<p>Kỷ lục mới của ca đông khách</p>' : '') + '</header><div class="tea-actions">'
        + button('tea-repeat','Mở ca mới',shift.rush ? 'rush' : 'practice',' tea-primary')
        + button('tea-modes','Đổi kiểu chơi','menu') + '</div>'
        + (trouble.length ? '<section class="tea-receipts"><h2>Đơn cần xem lại</h2>' + trouble.map(receipt).join('') + '</section>' : '')
        + (other.length ? '<details class="tea-how"><summary>Đơn đã phục vụ</summary>' + other.map(receipt).join('') + '</details>' : ''),
        'tea-results','tea-title');
      window.scrollTo(0,0);
    }

    return {open,cancel,lobby,lookedUp};
  };
})();
