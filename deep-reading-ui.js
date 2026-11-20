(() => {
  'use strict';
  const editorial = window.HAN_DEEP_READING_DATA;
  const draftKey = 'deep-reading:resume';
  const articleOrder = ['tat-va-bat','hanh-va-hang','giang-hang','dieu-dieu','mot-tieng-thay','khiem-va-kiem'];
  const names = {'âm':'Lịch sử âm đọc','nghĩa':'Nghĩa và cách dùng','đối chiếu':'Đối chiếu ngôn ngữ'};
  const suffixes = [
    ['vi-du','Đặt vào câu'],
    ['tu-quen','Nối với từ đã học'],
    ['tu-kiem','Tự kiểm tra'],
    ['nguon','Nguồn đối chiếu']
  ];
  const libraryPaths = [
    {href:'#readings', label:'Đọc hiểu từng câu', detail:'Câu mẫu HSK và phân tích từng cụm.'},
    {href:'#materials/book', label:'PDF 122 trang và bản thu', detail:'Đọc cạnh ảnh sách, mở audio đúng đoạn.'},
    {href:'#read/kho', label:'Các bài đọc trước đây', detail:'Chữ cổ, thành ngữ, thơ và bài khảo chữ.'}
  ];
  const plain = text => String(text).normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().replaceAll('đ','d');
  const readingHref = (id,part) => '#read' + (id ? '/' + encodeURIComponent(id) : '')
    + (part ? '/' + encodeURIComponent(part) : '');
  const links = (entries, esc) => entries.map(entry => '<a class="rd-way" href="' + esc(entry.href)
    + '"><span><strong>' + esc(entry.label) + '</strong><small>' + esc(entry.detail)
    + '</small></span><span aria-hidden="true">↗</span></a>').join('');

  window.createHanDeepReading = host => {
    const {esc} = host;
    const catalogue = new Map(host.words.map(word => [word.han,word]));
    let active = null;
    let trackedSection = '';
    let frame = 0;
    let scrollTimer = 0;

    const $ = selector => document.querySelector(selector);
    const all = selector => [...document.querySelectorAll(selector)];
    const knownState = () => host.db().knowledge;
    const prose = text => esc(text).replace(/([\p{Script=Han}]+(?:[，。；？！、][\p{Script=Han}]+)*)/gu,
      '<span class="rd-inline-han" lang="zh-CN">$1</span>');
    const render = html => host.mount('<div class="rd-shell">' + html + '</div>');
    const libraryLink = '<a class="rd-back" href="#read"><span aria-hidden="true">←</span> Đọc sâu</a>';
    const resume = () => {
      try {
        const value = JSON.parse(knownState().drafts[draftKey]?.text || '{}');
        return editorial.byId.has(value.article) ? value : {};
      } catch { return {}; }
    };
    const observeScroll = () => {
      clearTimeout(scrollTimer);
      if (!active || frame) return;
      scrollTimer = setTimeout(() => {
        if (!active) return;
        const sections = all('.rd-article [data-reading-section]');
        const seen = sections.filter(el => el.getBoundingClientRect().top < 140).at(-1);
        keep(active.id, seen?.dataset.readingSection || '');
        updateMenu(seen?.dataset.readingSection || '');
      },200);
    };

    function keep(article, section = '') {
      if (trackedSection === section && resume().article === article) return;
      trackedSection = section;
      window.HAN_KNOWLEDGE.saveDraft(knownState(),draftKey,JSON.stringify({article,section}),[],false);
      host.save();
    }

    function stop() {
      clearTimeout(scrollTimer);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      if (active) window.removeEventListener('scroll',observeScroll);
      active = null;
      trackedSection = '';
    }

    function updateMenu(section) {
      for (const link of all('[data-reading-jump]')) {
        if (link.dataset.readingJump === section) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      }
    }

    function headingLink(entry, heading = 'h3', hidden = false) {
      const units = [entry.glyph, entry.title, entry.deck, names[entry.category], ...entry.search];
      return '<article class="rd-shelf-item" data-reading-hit="' + esc(plain(units.join(' '))) + '"'
        + (hidden ? ' hidden' : '') + '><a href="' + readingHref(entry.id) + '">'
        + '<span class="rd-glyph" lang="zh-CN">' + esc(entry.glyph) + '</span><span class="rd-entry"><' + heading + '>'
        + prose(entry.title) + '</' + heading + '><small>' + prose(entry.deck) + '</small></span>'
        + '<span class="rd-row-arrow" aria-hidden="true">→</span></a></article>';
    }

    function searchList(input, rowSelector, result, update, onQuery) {
      const field = $(input);
      field.oninput = () => {
        const words = plain(field.value).trim().split(/\s+/).filter(Boolean);
        onQuery?.(words);
        let visible = 0;
        for (const row of all(rowSelector)) {
          const match = words.every(word => row.dataset.readingHit.includes(word));
          const show = update ? update(row,words,match) : match;
          row.hidden = !show;
          visible += Number(show);
        }
        $(result).hidden = visible > 0;
      };
    }

    function hub() {
      stop();
      const featured = editorial.byId.get(editorial.featured);
      const shelf = [...articleOrder.map(id => editorial.byId.get(id)).filter(Boolean),
        ...editorial.articles.filter(entry => entry.id !== editorial.featured && !articleOrder.includes(entry.id))];
      const previous = resume();
      const current = editorial.byId.get(previous.article);
      const resumeLink = current ? '<a class="rd-resume" href="' + readingHref(current.id,previous.section)
        + '"><strong>Đọc tiếp</strong><span>' + prose(current.title) + '</span><span aria-hidden="true">→</span></a>' : '';
      render('<header class="rd-hub-head"><h1>Đọc sâu từng chữ</h1>'
        + '<p>Từ một chữ quen trong tiếng Việt, lần ra cách đọc, nghĩa cũ và câu tiếng Trung dùng hôm nay.</p></header>'
        + '<div class="rd-hub-layout"><div class="rd-main-column">'
        + '<section class="rd-feature" id="reading-feature" data-reading-feature="' + esc(featured.id) + '">'
        + '<div class="rd-feature-text"><p class="rd-word-pair" lang="zh-CN">' + esc(featured.glyph) + '</p><h2>'
        + '<a href="' + readingHref(featured.id) + '">' + prose(featured.title) + '</a></h2><p>'
        + prose(featured.deck) + '</p><a class="rd-primary" href="' + readingHref(featured.id)
        + '">Đọc bài <span aria-hidden="true">→</span></a></div>'
        + '<img class="rd-feature-image" src="deep-reading-cover.webp" width="1080" height="720" '
        + 'alt="Minh họa quân cờ đỏ, bút lông và giấy trên bàn viết" decoding="async"></section>'
        + '<section class="rd-shelf" aria-labelledby="reading-shelf-title"><div class="rd-shelf-heading">'
        + '<h2 id="reading-shelf-title">Chọn bài đọc</h2><label class="rd-search"><span class="sr-only">Tìm bài đọc</span>'
        + '<input id="reading-search" type="search" placeholder="Tìm chữ, pinyin, từ tiếng Việt" autocomplete="off" aria-controls="reading-shelf" '
        + 'aria-describedby="reading-search-empty"></label></div>'
        + '<div id="reading-shelf">' + headingLink(featured,'h3',true) + shelf.map(entry => headingLink(entry)).join('')
        + '</div><p id="reading-search-empty" class="rd-search-empty" role="status" hidden>Chưa tìm được bài phù hợp. Thử một chữ như 卒 hoặc một từ như “khiêm”.</p>'
        + '</section></div><aside class="rd-shelf-side" aria-labelledby="reading-paths-title">'
        + resumeLink + '<h2 id="reading-paths-title">Đọc theo cách khác</h2>'
        + '<nav aria-label="Các lối đọc khác">' + links(libraryPaths,esc) + '</nav></aside></div>');
      searchList('#reading-search','[data-reading-hit]','#reading-search-empty',(row,words,match) => {
        return row.querySelector('a').getAttribute('href') === readingHref(featured.id) ? words.length > 0 && match : match;
      },words => {$('#reading-feature').hidden = words.length > 0;});
      window.scrollTo(0,0);
    }

    function archive() {
      stop();
      const older = window.HAN_ESSAYS.articles;
      render('<header class="rd-hub-head">' + libraryLink + '<h1>Các bài đọc trước đây</h1>'
        + '<p>Mở bài về chữ Hán, thành ngữ và cách dùng đã có trong sổ học.</p></header>'
        + '<section class="rd-shelf rd-archive" aria-label="Danh sách bài trước"><label class="rd-search">'
        + '<span class="sr-only">Tìm bài trước đây</span><input type="search" id="reading-search" autocomplete="off" '
        + 'placeholder="Tìm theo nhan đề hoặc chữ" aria-controls="reading-archive"></label><div id="reading-archive">'
        + older.map(entry => {
          const title = entry.title;
          const glyph = entry.glyph || entry.han || '';
          return '<article class="rd-shelf-item" data-reading-hit="' + esc(plain([glyph,title,entry.subtitle,entry.deck,entry.tag].join(' ')))
            + '"><a href="#essay/' + encodeURIComponent(entry.id) + '"><span class="rd-glyph" lang="zh-CN">'
            + esc(glyph) + '</span><span class="rd-entry"><h2>' + prose(title) + '</h2></span>'
            + '<span class="rd-row-arrow" aria-hidden="true">→</span></a></article>';
        }).join('') + '</div><p id="reading-search-empty" class="rd-search-empty" role="status" hidden>Chưa tìm được bài phù hợp.</p>'
        + '<p class="rd-old-index"><a href="#essays">Mở thư viện bài đọc cùng nhật ký cũ</a></p></section>');
      searchList('#reading-search','[data-reading-hit]','#reading-search-empty');
      window.scrollTo(0,0);
    }

    function renderTable(table) {
      const column = value => '<th scope="col">' + prose(value) + '</th>';
      return '<div class="rd-table-wrap"><table class="rd-evidence"><caption>' + prose(table.heading) + '</caption>'
        + '<thead><tr>' + table.headers.map(column).join('') + '</tr></thead><tbody>'
        + table.rows.map(row => '<tr>' + row.map((cell,i) => i === 0
          ? '<th scope="row">' + prose(cell) + '</th>' : '<td>' + prose(cell) + '</td>').join('')
          + '</tr>').join('') + '</tbody></table></div>';
    }

    const paragraph = text => '<p>' + prose(text) + '</p>';

    function renderSection(article, section) {
      const refs = (section.refs || []).map(id => article.sources.find(source => source.id === id)).filter(Boolean);
      return '<section class="rd-passage" id="reading-' + esc(section.id) + '" data-reading-section="' + esc(section.id)
        + '" aria-labelledby="heading-' + esc(section.id) + '">'
        + '<h2 id="heading-' + esc(section.id) + '" tabindex="-1">' + prose(section.title) + '</h2>'
        + section.paragraphs.map(paragraph).join('') + (section.table ? renderTable(section.table) : '')
        + (section.note ? '<div class="rd-aside-note">' + paragraph(section.note) + '</div>' : '')
        + (refs.length ? '<p class="rd-evidence-links">' + refs.map(source => '<a href="'
          + readingHref(article.id,'nguon-' + source.id) + '">' + prose(source.title) + '</a>').join('') + '</p>' : '')
        + '</section>';
    }

    function renderEnd(article) {
      const examples = article.examples.map(example => '<figure class="rd-example"><blockquote lang="zh-CN">'
        + esc(example.han) + '</blockquote><p lang="zh-Latn" class="rd-pinyin">' + esc(example.py)
        + '</p><figcaption>' + esc(example.vi) + '</figcaption>'
        + '<p class="rd-example-note">' + prose(example.note) + '</p><button class="rd-audio-button" type="button" data-say="'
        + esc(example.han) + '" aria-label="Nghe giọng thiết bị: ' + esc(example.han) + '">Nghe câu</button></figure>').join('');
      const words = article.connections.map(entry => {
        const term = catalogue.get(entry.han);
        const name = '<span lang="zh-CN">' + esc(entry.han) + '</span>';
        return '<li>' + (term ? '<button type="button" data-detail="' + esc(entry.han) + '">' + name + '</button>'
          : '<b>' + name + '</b>') + paragraph(entry.why) + '</li>';
      }).join('');
      const further = (article.further || []).map(item =>
        '<a class="rd-inline-link" href="' + esc(item.href) + '">' + prose(item.title) + ' <span aria-hidden="true">↗</span></a>').join('');
      const choices = article.quiz.choices.map((label,i) => '<button type="button" data-reading-choice="' + i + '">'
        + prose(label) + '</button>').join('');
      const citations = article.sources.map(item => '<li id="reading-nguon-' + esc(item.id)
        + '" tabindex="-1"><a href="' + esc(item.url) + '" target="_blank" rel="noopener noreferrer">'
        + prose(item.title) + ' <span aria-hidden="true">↗</span></a>' + paragraph(item.detail) + '</li>').join('');
      const more = (article.related || []).map(id => editorial.byId.get(id)).filter(Boolean);
      if (!more.length) {
        const next = editorial.articles.find(e => e.id !== article.id && e.category === article.category);
        if (next) more.push(next);
      }
      return '<section class="rd-passage" id="reading-vi-du" data-reading-section="vi-du"><h2 tabindex="-1">Đặt vào câu</h2>'
        + examples + '</section><section class="rd-passage" id="reading-tu-quen" data-reading-section="tu-quen">'
        + '<h2 tabindex="-1">Nối với từ đã học</h2><ul class="rd-connected">' + words + '</ul>' + further + '</section>'
        + '<section class="rd-passage" id="reading-tu-kiem" data-reading-section="tu-kiem"><h2 class="sr-only" tabindex="-1">Tự kiểm tra</h2>'
        + '<details id="reading-quiz" class="rd-fold"><summary>Thử một câu</summary><div>'
        + '<p class="rd-quiz-prompt">' + prose(article.quiz.prompt)
        + '</p><div class="rd-quiz-options" id="reading-options">' + choices + '</div>'
        + '<p id="reading-feedback" class="rd-feedback" role="status" hidden></p>'
        + '<button id="reading-retry" class="rd-plain-button" type="button" hidden>Thử lại</button></div></details></section>'
        + '<section class="rd-passage" id="reading-nguon" data-reading-section="nguon"><h2 class="sr-only" tabindex="-1">Nguồn đối chiếu</h2>'
        + '<details id="reading-sources" class="rd-fold"><summary>Nguồn đối chiếu</summary><div><ol class="rd-source-list">'
        + citations + '</ol></div></details></section>'
        + (more.length || article.legacyHref ? '<nav class="rd-next" aria-label="Đọc tiếp">'
          + more.map(e => '<a href="' + readingHref(e.id) + '"><span>Đọc tiếp</span><strong>'
            + prose(e.title) + '</strong><span aria-hidden="true">→</span></a>').join('')
          + (article.legacyHref ? '<a href="' + esc(article.legacyHref)
            + '"><strong>Mở bài cũ và ghi chú của bạn</strong><span aria-hidden="true">→</span></a>' : '')
          + '</nav>' : '');
    }

    function renderArticle(article) {
      const sections = [...article.sections.map(section => [section.id,section.title]),...suffixes];
      const contents = sections.map(([id,label]) =>
        '<li><a data-reading-jump="' + esc(id) + '" href="' + readingHref(article.id,id) + '">' + prose(label) + '</a></li>').join('');
      const points = '<details class="rd-fold rd-quick"><summary>Tra nhanh trong bài</summary><div><dl>'
        + article.summary.map(([term,meaning]) => '<div><dt>' + prose(term) + '</dt><dd>' + prose(meaning)
          + '</dd></div>').join('') + '</dl></div></details>';
      render('<article class="rd-article" data-reading-article="' + esc(article.id) + '"><header class="rd-article-head">'
        + '<div class="rd-article-nav">' + libraryLink + '<details class="rd-mobile-menu" id="reading-menu">'
        + '<summary>Trong bài</summary><nav aria-label="Mục lục bài"><ul>' + contents + '</ul></nav></details></div>'
        + '<p lang="zh-CN" class="rd-article-glyph">' + esc(article.glyph) + '</p><h1 id="reading-title" tabindex="-1">'
        + prose(article.title) + '</h1></header><div class="rd-article-layout"><div class="rd-page">'
        + '<div class="rd-intro">' + article.intro.map(paragraph).join('') + '</div>'
        + (article.credit ? '<p class="rd-credit">' + esc(article.credit) + '</p>' : '')
        + points + article.sections.map(section => renderSection(article,section)).join('')
        + renderEnd(article) + '</div><aside class="rd-article-side"><nav aria-label="Mục lục bài"><p>Trong bài</p>'
        + '<ul>' + contents + '</ul></nav></aside></div></article>');
      const feedback = $('#reading-feedback');
      const answers = all('[data-reading-choice]');
      const retry = $('#reading-retry');
      for (const button of answers) button.onclick = () => {
        const choice = Number(button.dataset.readingChoice);
        for (const item of answers) {
          const correct = Number(item.dataset.readingChoice) === article.quiz.answer;
          item.classList.toggle('rd-correct',correct);
          item.classList.toggle('rd-wrong',item === button && !correct);
          item.disabled = true;
        }
        feedback.hidden = false;
        feedback.textContent = (choice === article.quiz.answer ? 'Đúng. ' : 'Xem lại cách dùng. ') + article.quiz.explain;
        retry.hidden = false;
        retry.focus({preventScroll:true});
      };
      retry.onclick = () => {
        for (const choice of answers) {
          choice.classList.remove('rd-correct','rd-wrong');
          choice.disabled = false;
        }
        feedback.hidden = true;
        retry.hidden = true;
        answers[0].focus();
      };
    }

    function reveal(section, focus) {
      const target = section ? document.getElementById('reading-' + section) : $('#reading-title');
      const local = section?.startsWith('nguon-') ? 'nguon' : target?.dataset.readingSection || '';
      if (local === 'nguon') $('#reading-sources').open = true;
      if (local === 'tu-kiem') $('#reading-quiz').open = true;
      if ($('#reading-menu')) $('#reading-menu').open = false;
      keep(active.id,local);
      updateMenu(local);
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (target && section) target.scrollIntoView({block:'start'});
        else window.scrollTo(0,0);
        const focusTarget = target?.querySelector('h2:not(.sr-only)') || (local === 'nguon' && section === 'nguon'
          ? $('#reading-sources summary') : local === 'tu-kiem' ? $('#reading-quiz summary') : target);
        if (focus && focusTarget) focusTarget.focus({preventScroll:true});
        frame = 0;
      });
    }

    function route(parts) {
      const [id, section] = parts;
      if (!id) { hub(); return; }
      if (id === 'kho') { archive(); return; }
      const article = editorial.byId.get(id);
      if (!article) {
        hub();
        return;
      }
      if (article !== active) {
        stop();
        active = article;
        renderArticle(article);
        window.addEventListener('scroll',observeScroll,{passive:true});
      }
      reveal(section,true);
    }

    return {route,cancel:stop};
  };
})();
