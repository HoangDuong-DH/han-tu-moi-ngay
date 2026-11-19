(() => {
  'use strict';
  const book = window.HAN_PHONETICS;
  const index = window.HAN_PDF_STUDY;
  const count = index.catalogue.length;
  const han = /\p{Script=Han}/u;
  const segmenter = typeof Intl.Segmenter === 'function'
    ? new Intl.Segmenter('zh-Hans', {granularity: 'word'}) : null;
  const unitKey = /^p\d+-l\d+(?:-add\d+)?$/;
  const validPage = page => Number.isInteger(page) && page >= 1 && page <= count;
  const url = (page, key) => '#materials/book' + (validPage(page) ? '/' + page : '')
    + (validPage(page) && unitKey.test(key) ? '/' + key : '');
  const time = seconds => Math.floor(seconds / 60) + ':' + String(Math.floor(seconds % 60)).padStart(2, '0');
  const labels = {
    zh: 'Tiếng Trung', english: 'Tiếng Anh', label: 'Đề mục',
    table: 'Hàng bảng', sound: 'Luyện âm', roman: 'Pinyin in trong sách'
  };
  const audioLabels = {
    same: 'Bản chép có đúng câu này',
    included: 'Cụm này nằm trong dòng bản chép',
    exercise: 'Bản chép có bài luyện cùng nhóm',
    sounds: 'Dãy âm tương ứng trong bản chép'
  };
  const resumeKey = 'materials:book:resume';
  window.HAN_PDF_STUDY.url = url;

  window.createHanPdfStudy = host => {
    const {esc} = host;
    const cache = new Map();
    const byHan = new Map(host.words.map(w => [w.han, w]));
    let renderId = 0;
    let cachedPage;
    let view = 'step';
    let pinyinVisible = true;
    const appState = () => host.db().knowledge;
    const draft = key => {
      try { return JSON.parse(appState().drafts[key]?.text || '{}'); }
      catch { return {}; }
    };
    const keep = (page, key) => {
      window.HAN_KNOWLEDGE.saveDraft(appState(), resumeKey, JSON.stringify({page, key}), [], false);
      host.save();
    };
    const render = html => host.mount('<div class="corpus book-study">' + html + '</div>');
    const scrollToTop = () => window.scrollTo(0, 0);
    const byId = id => document.getElementById(id);
    const nav = current => '<nav class="book-crumb" aria-label="Vị trí trong tư liệu">'
      + '<a href="#materials">Tư liệu</a><span aria-hidden="true">/</span>'
      + (current ? '<a href="' + url() + '">Sách ngữ âm</a>' : '<span>Sách ngữ âm</span>')
      + '</nav>';
    const pageSource = page => '<a href="' + esc(book.book.pdf) + '#page=' + page
      + '" target="_blank" rel="noopener">PDF gốc</a>';
    const groups = [{title:'Đầu sách và mục lục', range:[1,20]}, ...book.units];

    function picker(page, className = '') {
      return '<label class="book-picker ' + className + '" for="book-page"><span>Đến trang PDF</span><select id="book-page">'
        + (!page ? '<option value="">Chọn một trang</option>' : '')
        + groups.map(unit => '<optgroup label="' + esc(unit.title) + '">'
          + book.pages.slice(unit.range[0] - 1, unit.range[1]).map(p => '<option value="' + p.n + '"'
            + (page === p.n ? ' selected' : '') + '>' + p.n + ' · ' + esc(p.title) + '</option>').join('')
          + '</optgroup>').join('') + '</select></label>';
    }

    function bindPicker() {
      byId('book-page').onchange = event => {
        if (event.target.value) location.hash = url(Number(event.target.value));
      };
    }

    function library() {
      const resume = draft(resumeKey);
      const previous = draft('materials:pdf:resume');
      const last = [resume.page, previous.page].find(validPage);
      const page = last || 21;
      render(nav() + '<header class="book-cover">'
        + '<p class="book-source-name" lang="zh-CN">经理人汉语 · 语音篇</p>'
        + '<h1>Đọc sách theo từng câu</h1><p>Đọc chữ Hán, chạm vào cụm để xem cách dùng, rồi đối chiếu với trang sách hoặc bản thu.</p>'
        + '<div class="book-actions"><a class="btn primary" href="' + url(page, resume.key) + '">'
        + (last ? 'Đọc tiếp trang ' + page : 'Bắt đầu ở trang 21') + '</a>'
        + '<a class="btn" href="' + url(115) + '">Đọc truyện 塞翁失马</a></div></header>'
        + '<section class="book-directory"><div class="book-section-heading"><div><h2>Mục lục 122 trang</h2>'
        + '<p>Số trang bên dưới là số trên trình xem PDF.</p></div>' + picker(0) + '</div>'
        + groups.map(group => '<details class="book-range"><summary><span>' + esc(group.title)
          + '</span><span>Trang ' + group.range.join('–') + '</span></summary>'
          + '<div class="book-page-links">' + book.pages.slice(group.range[0] - 1, group.range[1])
            .map(p => '<a href="' + url(p.n) + '"><b>' + p.n + '</b><span>' + esc(p.title) + '</span></a>').join('')
          + '</div></details>').join('') + '</section>'
        + '<details class="book-fold"><summary>Về bản chép và ảnh sách</summary><div><p>Bản đọc ghép từ bản quét. '
        + 'Các dòng có ghi chú biên tập được đánh dấu. Dấu thanh và ký hiệu trong bảng xem theo ảnh gốc. '
        + 'Mốc audio tính theo đoạn. Một đoạn có thể chứa nhiều câu và lần lặp.</p><p>' + pageSource(1) + ' · '
        + '<a href="#materials/audio/1">Mở tám bản thu gốc</a></p></div></details>');
      bindPicker();
      scrollToTop();
    }

    function pageHead(page) {
      const p = book.pages[page - 1];
      return nav(true) + '<header class="book-heading"><div><p class="book-page-label">PDF ' + page + '/' + count
        + (p.printed ? ' · Trang in ' + p.printed : '') + '</p><h1>' + esc(p.title) + '</h1>'
        + '<p>' + esc(p.summary) + '</p></div>' + picker(page) + '</header>';
    }

    async function load(page) {
      const batch = Math.ceil(page / index.pageSize);
      if (!cache.has(batch)) {
        const name = 'pdf-study-pages-' + String(batch).padStart(2, '0') + '.json?v=' + index.revision;
        cache.set(batch, fetch(name).then(response => {
          if (!response.ok) throw Error('Page bundle returned ' + response.status);
          return response.json();
        }).then(bundle => {
          if (bundle.revision !== index.revision) throw Error('Page bundle version mismatch');
          return bundle.pages;
        }).catch(error => {
          cache.delete(batch);
          throw error;
        }));
      }
      const pages = await cache.get(batch);
      const loaded = pages.find(p => p.n === page);
      if (!loaded) throw Error('Page absent from its bundle');
      return loaded;
    }

    function written(unit) {
      return unit.kind === 'zh' || unit.kind === 'english' || unit.kind === 'roman';
    }

    function itemLink(page, unit, label, className = 'btn') {
      return '<a class="' + className + '" href="' + url(page, unit?.key) + '">' + esc(label) + '</a>';
    }

    function sourceAudio(page, unit) {
      if (unit.audio) {
        const [a,b,,match] = unit.audio;
        const [start, title] = index.timeline[a + '-' + b];
        return '<div class="book-audio-line"><a class="btn" href="#materials/audio/' + a + '/' + b + '/' + page.n
          + '/' + unit.key + '">Nghe bản ' + a + ' · ' + time(start) + '</a><span>' + esc(audioLabels[match])
          + ' · ' + esc(title) + '</span></div>';
      }
      if (!page.audio.length) return '<p class="book-audio-context">Trang này chưa có đoạn thu gốc tương ứng trong 8 tệp.</p>';
      return '<details class="book-fold book-audio-context"><summary>Bản thu theo bài tập của trang</summary><div>'
        + '<p>Chưa khớp được riêng mục đang xem. Chọn đoạn để nghe toàn bài tập tương ứng.</p><ul class="book-audio-options">'
        + page.audio.map(([a,b]) => {
          const [start,title] = index.timeline[a + '-' + b];
          return '<li><a href="#materials/audio/' + a + '/' + b + '/' + page.n + '/' + unit.key + '">'
            + time(start) + ' · ' + esc(title) + '</a></li>';
        }).join('') + '</ul></div></details>';
    }

    function scannable(page, unit) {
      const p = book.pages[page.n - 1];
      const box = unit.rect;
      const mark = box ? '<span class="book-scan-highlight" aria-hidden="true" style="left:' + box[0] * 100
        + '%;top:' + box[1] * 100 + '%;width:' + (box[2] - box[0]) * 100
        + '%;height:' + (box[3] - box[1]) * 100 + '%"></span>' : '';
      return '<details id="book-scan" class="book-fold"><summary>Xem mục này trên ảnh sách</summary><div>'
        + '<p><a href="' + esc(p.image) + '" target="_blank" rel="noopener">Mở ảnh lớn</a> · ' + pageSource(page.n) + '</p>'
        + '<a class="book-scan-frame" href="' + esc(p.image) + '" target="_blank" rel="noopener">'
        + '<img data-image="' + esc(p.image) + '" width="' + page.size[0] + '" height="' + page.size[1]
        + '" alt="Bản quét trang ' + page.n + ' có làm nổi vùng chứa dòng đang học">' + mark + '</a>'
        + (unit.source?.length ? '<details class="book-ocr"><summary>Dòng quét dùng để đối chiếu</summary><p>'
          + unit.source.map(esc).join('<br>') + '</p></details>' : '') + '</div></details>';
    }

    function wordHistory(h) {
      const w = byHan.get(h);
      if (!w) return '';
      const recorded = host.db().words[w.id]?.seen > 0 || appState().events.some(e =>
        ['word','attempt','self'].includes(e.kind) && e.targets?.includes('w:' + w.id));
      return recorded ? 'Đã ôn trên thiết bị' : 'Có trong kho từ của bạn';
    }

    function chip(h, extended = false) {
      if (!byHan.has(h)) return '';
      return '<button type="button" class="book-word-chip" data-detail="' + esc(h) + '"><span lang="zh-CN">'
        + esc(h) + '</span>' + (extended ? '<small>' + esc(wordHistory(h)) + '</small>' : '') + '</button>';
    }

    function groupsFor(unit) {
      function contextual(word, original = []) {
        if (word === '得' && /得我请|得的是什么/.test(unit.text)) {
          return /得我请/.test(unit.text) ? [word,'děi','Động từ tình thái','Phải, cần. Trong 得我请, người nói bảo mình phải là người mời.']
            : [word,'dé','Động từ','Mắc, như 得病. 的 đi sau là trợ từ riêng.'];
        }
        if (word === '长' && !/长着|长成|地里长|长大/.test(unit.text)) {
          return [word,'cháng','Tính từ','Dài; chỉ độ dài trong câu này.'];
        }
        const curated = Object.hasOwn(index.terms,word) ? index.terms[word] : null;
        if (curated) return [word,...curated];
        const known = byHan.get(word);
        const lab = window.HAN_READING_LAB.terms.get(word);
        return [word,original[1] || lab?.py || known?.py,
          original[2] || lab?.kind || 'Cụm đọc', original[3] || lab?.meaning || known?.meaning];
      }
      if (unit.chunks?.length) {
        return unit.chunks.map(chunk => contextual(chunk,unit.tokens?.find(t => t[0] === chunk)));
      }
      if (unit.tokens?.length) return unit.tokens.map(row => contextual(row[0],row));
      if (unit.kind !== 'zh' || !segmenter) return [];
      return [...segmenter.segment(unit.text)].map(({segment}) => contextual(segment));
    }

    function wordsIn(unit, groups) {
      return [...new Set([...(unit.known || []), ...groups.map(row => row[0])])].filter(h => byHan.has(h));
    }

    const termDetail = (term, token) => {
      const [word,py,kind,meaning] = token;
      term.innerHTML = '<div class="book-term-top"><b lang="zh-CN">' + esc(word) + '</b>'
        + (py ? '<span class="py" lang="zh-Latn">' + esc(py) + '</span>' : '')
        + (kind ? '<span>' + esc(kind) + '</span>' : '') + '</div>'
        + (meaning ? '<p>' + esc(meaning) + '</p>' : '')
        + (byHan.has(word) ? '<p>' + chip(word, true) + '</p>' : '');
    };

    function lexical(unit, groups) {
      if (!groups.some(t => han.test(t[0]))) return '';
      return '<section class="book-lexical" aria-labelledby="book-word-heading"><h3 id="book-word-heading">'
        + (unit.kind === 'zh' ? 'Tách từ và cụm' : 'Chữ xuất hiện trong hàng') + '</h3>'
        + '<p class="book-annotation-caption">'
        + (unit.chunks ? 'Cụm dưới đây đi theo cách đọc đã biên tập.' : 'Chạm từng khối để tra. Dấu câu giữ nguyên thứ tự; khối dài có thể là một cụm.') + '</p>'
        + '<div class="book-token-list">'
        + groups.map(([word],i) => {
          if (!han.test(word)) return '<span class="book-token-mark">' + esc(word) + '</span>';
          return '<button type="button" data-book-token="' + i + '" lang="zh-CN" aria-controls="book-term" aria-pressed="false">'
            + esc(word) + '</button>';
        }).join('') + '</div><div id="book-term" class="book-term" aria-live="polite" hidden></div></section>';
    }

    function explanation(unit) {
      const has = unit.explain || unit.grammar?.length || unit.relations?.length || unit.cuts?.length;
      if (!has) return '';
      const grammar = unit.explain ? '' : (unit.grammar || []).map(([quote,title,note,id]) => {
        const linked = window.HAN_READING_LAB.grammar.has(id);
        return '<li><strong>' + esc(title) + '</strong><span lang="' + (unit.kind === 'english' ? 'en' : 'zh-CN')
          + '">' + esc(quote) + '</span><p>' + esc(note)
          + (linked ? ' <a href="#syntax/' + encodeURIComponent(id) + '">Xem mẫu và câu đối chiếu</a>' : '') + '</p></li>';
      }).join('');
      const cuts = unit.explain ? '' : (unit.cuts || []).map(([word,note]) =>
        '<li><strong lang="zh-CN">' + esc(word) + '</strong><p>' + esc(note) + '</p></li>').join('');
      const roles = unit.explain ? '' : (unit.relations || []).map(([word,role,note]) =>
        '<li><strong lang="zh-CN">' + esc(word) + '</strong><span>' + esc(role) + '</span><p>' + esc(note) + '</p></li>').join('');
      const related = unit.explain ? [...new Set((unit.grammar || []).map(row => row[3]))]
        .filter(id => window.HAN_READING_LAB.grammar.has(id)).slice(0,3) : [];
      return '<section class="book-explanation"><h3>' + (unit.kind === 'zh' ? 'Cụm này làm gì trong câu?' : 'Đọc theo ý')
        + '</h3>' + (unit.explain ? '<p>' + esc(unit.explain) + '</p>'
          + (related.length ? '<p class="book-related-grammar">Thử với '
            + related.map(id => '<a href="#syntax/' + encodeURIComponent(id) + '">'
              + esc(window.HAN_READING_LAB.grammar.get(id).title || 'bài ngữ pháp liên quan') + '</a>').join(' · ') + '</p>' : '')
          : '<p class="book-annotation-caption">Gợi ý từ bản quét. Mở ảnh sách khi dấu hoặc ranh giới cụm có vẻ lạ.</p>')
        + (grammar || cuts ? '<ul class="book-notes">' + grammar + cuts + '</ul>' : '')
        + (roles ? '<details class="book-fold"><summary>Xem vai trò của các cụm</summary><div><ul class="book-notes">'
          + roles + '</ul></div></details>' : '') + '</section>';
    }

    function unitSelect(list, unit) {
      return '<label class="book-picker book-item-picker" for="book-item"><span>Chọn dòng</span><select id="book-item">'
        + list.map((u,i) => '<option value="' + u.key + '"' + (u === unit ? ' selected' : '') + '>'
          + (i + 1) + ' · ' + esc([...u.text].slice(0, 38).join('')) + '</option>').join('')
        + '</select></label>';
    }

    function canSpeak(unit) {
      return unit.kind === 'zh' && (unit.edit || unit.confidence >= .9)
        && !/[a-zA-Z]|[…]{2}/u.test(unit.text) && han.test(unit.text);
    }

    function originalText(unit) {
      const lang = {zh:'zh-CN',english:'en',roman:'zh-Latn'};
      return '<p class="book-original ' + (unit.kind === 'zh' ? 'han' : '') + '" lang="' + (lang[unit.kind] || 'und') + '">'
        + (unit.speaker ? '<span class="book-speaker">' + esc(unit.speaker) + '</span>' : '')
        + '<span>' + esc(unit.text) + '</span></p>';
    }

    function lowerNav(page) {
      return '<nav class="book-page-nav" aria-label="Chuyển trang">'
        + (page.n > 1 ? itemLink(page.n - 1, null, '← Trang trước') : '<span></span>')
        + '<a href="' + url() + '">Mục lục</a>'
        + (page.n < count ? itemLink(page.n + 1, null, 'Trang sau →') : '<span></span>') + '</nav>';
    }

    function renderPage(page, selected, focus = false) {
      const rows = page.units;
      const prose = rows.filter(written);
      const tables = rows.filter(unit => !written(unit));
      const target = rows.find(u => u.key === selected);
      const activeMode = (target && !written(target)) || !prose.length ? 'table' : 'text';
      const list = activeMode === 'table' ? tables : prose;
      const unit = target || list.find(u => u.kind === 'zh') || list.find(u => u.explain) || list[0];
      const current = list.indexOf(unit);
      const edited = Boolean(unit.explain);
      const tokens = groupsFor(unit);
      const familiar = wordsIn(unit,tokens);
      const status = edited ? 'Ghi chú biên tập' : labels[unit.kind];
      const meaning = unit.gloss ? '<div class="book-meaning"><h3>' + (unit.kind === 'zh' ? 'Hiểu câu này' : 'Đọc ý chính')
        + '</h3><p>' + esc(unit.gloss[0]) + '</p></div>' : '';
      const shortTip = unit.kind === 'sound' || unit.kind === 'roman'
        ? '<p class="book-annotation-caption">Tra dấu và ký hiệu ở ảnh sách bên dưới.</p>' : '';
      const fastLink = page.related ? itemLink(page.related[0], null, page.related[1], 'book-nearby') : '';
      render(pageHead(page.n) + '<section class="book-main" aria-label="Bài đọc trang ' + page.n + '">'
        + '<div class="book-toolbar"><div class="book-modes">'
        + '<button type="button" id="book-step" aria-pressed="' + (view === 'step') + '">Từng dòng</button>'
        + '<button type="button" id="book-flow" aria-pressed="' + (view === 'flow') + '">Đọc liền</button></div>'
        + (view === 'step' ? unitSelect(list, unit) : '') + '</div>'
        + '<div class="book-view-links">' + (prose.length ? itemLink(page.n, prose.find(u => u.kind === 'zh') || prose[0],
          'Câu và đoạn (' + prose.length + ')', 'book-mode' + (activeMode === 'text' ? ' is-active' : '')) : '')
        + (tables.length ? itemLink(page.n, tables[0], 'Bảng, đề mục và âm (' + tables.length + ')',
          'book-mode' + (activeMode === 'table' ? ' is-active' : '')) : '') + '</div>'
        + (view === 'flow' ? '<div class="book-flow"><h2>Nội dung trang</h2>'
          + list.map((u,i) => '<article class="book-flow-item"><div>' + originalText(u)
            + (u.gloss ? '<p>' + esc(u.gloss[0]) + '</p>' : '') + '</div>'
            + '<button type="button" class="btn" data-book-open="' + u.key + '">Xem dòng ' + (i + 1) + '</button></article>').join('')
          + '</div>' : '<article class="book-sentence" aria-labelledby="book-current"><div class="book-sentence-id"><h2 id="book-current" tabindex="-1">'
            + 'Dòng ' + (current + 1) + '/' + list.length + '</h2><span>' + esc(status) + '</span></div>'
          + originalText(unit)
          + (unit.pinyin ? '<p id="book-pinyin" class="book-pinyin py" lang="zh-Latn"' + (pinyinVisible ? '' : ' hidden')
            + '>' + esc(unit.pinyin) + '</p>' : '')
          + '<div class="book-actions">'
          + (unit.pinyin ? '<button type="button" class="btn" id="book-toggle-pinyin" aria-controls="book-pinyin" aria-expanded="'
            + pinyinVisible + '">' + (pinyinVisible ? 'Ẩn pinyin' : 'Hiện pinyin') + '</button>' : '')
          + (canSpeak(unit) ? '<button type="button" class="btn" data-say="' + esc(unit.text) + '">Nghe giọng máy</button>' : '')
          + '</div>' + shortTip + meaning
          + (activeMode === 'table' && !edited ? '<p class="book-annotation-caption">'
            + esc(book.pages[page.n-1].task) + '</p>' : '')
          + '<nav class="book-line-nav" aria-label="Chuyển dòng">'
          + (current > 0 ? itemLink(page.n, list[current-1], '← Dòng trước') : '<span></span>')
          + (current + 1 < list.length ? itemLink(page.n, list[current+1], 'Dòng sau →', 'btn primary')
            : (page.n < count ? itemLink(page.n+1, null, 'Sang trang sau →', 'btn primary') : ''))
          + '</nav></article>'
          + '<div class="book-deep">' + explanation(unit) + lexical(unit,tokens)
          + (familiar.length || unit.families?.length ? '<section class="book-familiar"><h3>Nối với từ bạn học</h3>'
            + '<div class="book-chips">' + familiar.map(h => chip(h,true)).join('') + '</div>'
            + (unit.families || []).map(id => {
              const f = window.HAN_VOCAB_FAMILIES.families.find(x => x.id === id);
              return f ? '<p><a href="#vocabulary/' + encodeURIComponent(id) + '">Mở nhóm từ '
                + esc(f.root) + '</a></p>' : '';
            }).join('') + '</section>' : '')
          + '<section class="book-audio"><h3>Đối chiếu bản thu</h3>' + sourceAudio(page,unit) + '</section></div>')
        + '</section>' + (fastLink ? '<p class="book-cross-page">' + fastLink + '</p>' : '')
        + (view === 'step' ? scannable(page,unit) : '')
        + '<details class="book-fold"><summary>Hướng đọc trang này</summary><div><p>'
        + esc(book.pages[page.n-1].task) + '</p>'
        + (page.n === 122 ? '<p>Bản bạn gửi kết thúc ở bảng thanh mẫu và vận mẫu. Phụ lục III chỉ được nhắc trong mục lục.</p>' : '')
        + '<p><a href="#materials/page/' + page.n + '">Xem ảnh gốc và ghi chú trang</a></p></div></details>'
        + lowerNav(page));
      keep(page.n, unit.key);
      bindPicker();
      byId('book-step').onclick = () => {view = 'step'; renderPage(page,unit.key,true);};
      byId('book-flow').onclick = () => {view = 'flow'; renderPage(page,unit.key); byId('book-flow').focus();};
      const item = byId('book-item');
      if (item) item.onchange = event => {location.hash = url(page.n,event.target.value);};
      const toggle = byId('book-toggle-pinyin');
      if (toggle) toggle.onclick = () => {
        pinyinVisible = !pinyinVisible;
        byId('book-pinyin').hidden = !pinyinVisible;
        toggle.setAttribute('aria-expanded', String(pinyinVisible));
        toggle.textContent = pinyinVisible ? 'Ẩn pinyin' : 'Hiện pinyin';
      };
      for (const button of document.querySelectorAll('[data-book-open]')) button.onclick = () => {
        view = 'step';
        if (location.hash === url(page.n,button.dataset.bookOpen)) renderPage(page,button.dataset.bookOpen,true);
        else location.hash = url(page.n,button.dataset.bookOpen);
      };
      const tokenButtons = document.querySelectorAll('[data-book-token]');
      for (const button of tokenButtons) button.onclick = () => {
        const term = byId('book-term');
        for (const other of tokenButtons) other.setAttribute('aria-pressed', String(other === button));
        termDetail(term,tokens[Number(button.dataset.bookToken)]);
        term.hidden = false;
      };
      const scan = byId('book-scan');
      if (scan) scan.ontoggle = () => {
        const image = scan.querySelector('img');
        if (scan.open && !image.getAttribute('src')) image.src = image.dataset.image;
      };
      if (focus) {
        const current = byId('book-current');
        if (current) {
          current.focus({preventScroll:true});
          current.scrollIntoView({block:'start'});
        }
      }
    }

    async function open(page, key) {
      const own = ++renderId;
      if (!page) {cachedPage = null; library(); return;}
      const same = cachedPage?.n === page;
      if (!same) {
        view = 'step';
        render(pageHead(page) + '<p role="status" class="book-loading">Đang mở nội dung trang…</p>');
        bindPicker();
        scrollToTop();
      }
      try {
        const data = same ? cachedPage : await load(page);
        if (own !== renderId) return;
        cachedPage = data;
        renderPage(data,key,same && !!key);
      } catch (error) {
        if (own !== renderId) return;
        console.warn(error);
        render(pageHead(page) + '<p role="status" class="book-loading">Chưa tải được câu của trang này.</p>'
          + '<div class="book-actions"><button type="button" class="btn primary" id="book-retry">Tải lại trang</button>'
          + '<a class="btn" href="' + url() + '">Về mục lục</a>'
          + '<a class="btn" href="#materials/page/' + page + '">Mở ảnh sách</a></div>');
        byId('book-retry').onclick = () => open(page,key);
        bindPicker();
      }
    }

    return {
      cancel() { ++renderId; },
      route(number, key) {
        const page = Number(number);
        return open(validPage(page) ? page : 0,key);
      }
    };
  };
})();
