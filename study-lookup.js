(() => {
  'use strict';

  const han = /\p{Script=Han}/u;
  const onlyHanWords = /^[\p{Script=Han}\p{P}\s]+$/u;
  const scopeSelector = '[data-study-text]';
  const edge = /^[\p{P}\s]+|[\p{P}\s]+$/gu;
  const key = text => text.normalize('NFC').trim().replace(edge,'').replace(/\s+/gu,'');
  const extras = [
    ['孩子们','háizimen','bọn trẻ','们 đánh dấu số nhiều khi nói về người. Cả cụm là chủ ngữ.'],
    ['放学','fàngxué','tan học','Cụm chỉ lúc kết thúc buổi học. Chủ ngữ là học sinh.'],
    ['孩子们放学','háizimen fàngxué','Bọn trẻ tan học.','孩子们 là chủ ngữ. 放学 là việc xảy ra và, khi có 就 theo sau, tạo mốc cho hành động kế tiếp.',true],
    ['回家','huí jiā','về nhà','回 chỉ trở về. 家 gọi đích đến.'],
    ['吃饭','chī fàn','ăn cơm, dùng bữa','吃 là ăn. 饭 trong cụm này chỉ bữa ăn nói chung.'],
    ['下班后','xiàbān hòu','sau khi tan làm','后 đứng sau 下班 để biến việc tan làm thành mốc thời gian.'],
    ['买菜','mǎi cài','đi chợ mua đồ ăn','菜 trong cụm này có thể gồm cả thực phẩm nấu bữa, tùy ngữ cảnh.'],
    ['孩子們放學','háizimen fàngxué','Bọn trẻ tan học.','孩子們 là chủ ngữ. 放學 gọi việc tan học.',true]
  ];

  function createLookupIndex(words) {
    const catalogue = new Map(words.map(word => [word.han,word]));
    const phrases = new Map();
    const sentences = new Map();
    const segmenter = Intl.Segmenter ? new Intl.Segmenter('zh',{granularity:'word'}) : null;

    function setPhrase(text,py,meaning,note = '',composed = false) {
      const id = key(text);
      if (!id || !han.test(id) || !meaning || phrases.has(id)) return;
      phrases.set(id,{han:text,py,meaning,note,composed,word:catalogue.get(id)});
    }

    function addSentence(text,py,vi,terms = []) {
      const id = key(text);
      if (!id || !vi || sentences.has(id)) return;
      const scoped = new Map();
      for (const term of terms) {
        const form = key(term.han);
        if (form && han.test(form) && (term.meaning || term.note) && !scoped.has(form)) {
          const word = catalogue.get(form) || term.links?.map(link => catalogue.get(link)).find(Boolean);
          scoped.set(form,{...term,word});
        }
      }
      sentences.set(id,{py,vi,scoped});
    }

    for (const row of extras) setPhrase(...row);
    for (const word of words) setPhrase(word.han,word.py,word.gloss || word.meaning);
    for (const term of window.HAN_READING_LAB.terms.values()) {
      // Senses with @ labels belong to individual sentences, not the general glossary.
      if (term.key === term.han) setPhrase(term.han,term.py,term.meaning,term.note);
    }
    for (const [text,[py,meaning]] of Object.entries(window.HAN_CLOZE_DATA.terms)) setPhrase(text,py,meaning);
    const traditional = new Map(Object.entries(window.HAN_STUDY_VARIANTS)
      .flatMap(([simple,forms]) => forms.map(form => [form,simple])));
    traditional.set('孩子們','孩子们');
    traditional.set('放學','放学');

    for (const reading of window.HAN_READING_LAB.readings) {
      for (const line of reading.lines) addSentence(line.han,line.py,line.vn,line.tokens);
    }
    for (const article of window.HAN_DEEP_READING_DATA.articles) {
      for (const example of article.examples) {
        addSentence(example.han,example.py,example.vi,(example.segments || []).map(([text,note]) => ({han:text,note})));
      }
    }
    for (const {answer,frames} of window.HAN_CLOZE_DATA.entries) {
      for (const frame of frames) addSentence(frame.line.replace('＿',answer),frame.py,frame.vi);
    }
    for (const word of words) {
      for (const study of word.usageStudies || []) {
        for (const [text,py,vi] of study.examples || []) addSentence(text,py,vi);
      }
    }

    const maxWord = Math.max(...[...phrases.keys(),...traditional.keys()].map(text => text.length));
    function entry(text,scoped) {
      const canonical = traditional.get(text) || text;
      const generic = phrases.get(text) || phrases.get(canonical);
      const local = scoped?.get(text) || scoped?.get(canonical);
      return local ? {...generic,...local,py:local.py || generic?.py,meaning:local.meaning || generic?.meaning}
        : generic;
    }

    function split(text,scoped) {
      const rows = [];
      const longest = scoped ? Math.max(maxWord,...[...scoped.keys()].map(word => word.length)) : maxWord;
      for (const [run] of text.matchAll(/\p{Script=Han}+/gu)) {
        const ends = new Map();
        if (segmenter) {
          for (const {segment,index} of segmenter.segment(run)) ends.set(index,index + segment.length);
        }
        for (let offset = 0; offset < run.length;) {
          let end = Math.min(run.length,offset + longest);
          while (end > offset && !scoped?.has(run.slice(offset,end))) end--;
          if (end === offset) {
            end = Math.min(run.length,offset + maxWord);
            // Keep the browser's word boundary when the glossary has no wider known expression.
            const naturalEnd = ends.get(offset) || offset + String.fromCodePoint(run.codePointAt(offset)).length;
            while (end >= naturalEnd) {
              const candidate = entry(run.slice(offset,end),scoped);
              if (candidate && !candidate.composed) break;
              end--;
            }
            if (end < naturalEnd) end = naturalEnd;
          }
          const part = run.slice(offset,end);
          rows.push({...entry(part,scoped),han:part});
          offset = end;
        }
      }
      return rows;
    }

    return (text,context = {}) => {
      const selected = key(text);
      const full = key(context.text || '');
      const line = sentences.get(full);
      const sameLine = selected === full;
      const exact = sentences.get(selected);
      const direct = entry(selected,line?.scoped);
      const parts = split(selected,line?.scoped || exact?.scoped);
      const meaning = (sameLine && context.vi) || exact?.vi || direct?.meaning || '';
      const py = (sameLine && context.py) || exact?.py || direct?.py
        || (onlyHanWords.test(selected) && parts.length && parts.every(part => part.py) ? parts.map(part => part.py).join(' ') : '');
      return {text,meaning,py,direct,parts};
    };
  }

  window.createHanLookupIndex = createLookupIndex;

  window.createHanStudyLookup = host => {
    const {root,esc} = host;
    const panel = document.createElement('aside');
    panel.className = 'study-lookup';
    panel.id = 'study-lookup';
    panel.hidden = true;
    panel.setAttribute('aria-label','Tra nhanh tiếng Trung');
    panel.setAttribute('translate','no');
    root.after(panel);

    let active = null;
    let lookup;
    let scheduled = false;
    const scopeOf = node => (node?.nodeType === 1 ? node : node?.parentElement)?.closest(scopeSelector);
    const desktop = window.matchMedia('(min-width: 761px) and (pointer: fine)');
    const status = text => { panel.querySelector('[role="status"]').textContent = text; };

    function close(clearSelection = false,restoreFocus = false) {
      if (!active) return;
      const previous = active;
      active = null;
      panel.hidden = true;
      if (clearSelection && scopeOf(document.getSelection()?.anchorNode) === previous.scope) {
        document.getSelection().removeAllRanges();
      }
      if (restoreFocus) previous.trigger?.focus();
    }

    function place() {
      if (!active) return;
      const anchor = active.range?.getBoundingClientRect() || active.scope.getBoundingClientRect();
      const panelWidth = panel.offsetWidth, panelHeight = panel.offsetHeight;
      const pad = 12;
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      if (!desktop.matches) {
        panel.style.removeProperty('top');
        panel.style.removeProperty('left');
        panel.dataset.dock = anchor.bottom > viewportHeight - panelHeight - 84 && anchor.top > panelHeight + 30
          ? 'top' : 'bottom';
        return;
      }
      delete panel.dataset.dock;
      const top = anchor.bottom + pad + panelHeight <= viewportHeight
        ? anchor.bottom + pad : anchor.top - panelHeight - pad;
      panel.style.left = Math.max(pad,Math.min(anchor.left,viewportWidth - panelWidth - pad)) + 'px';
      panel.style.top = Math.max(pad,Math.min(top,viewportHeight - panelHeight - pad)) + 'px';
    }

    function partsMarkup(result) {
      if (!result.parts.length || (result.meaning && result.parts.length === 1 && key(result.text) === key(result.parts[0].han))) return '';
      return '<details class="study-parts"' + (result.meaning ? '' : ' open') + '><summary>Từ trong đoạn</summary><ul>'
        + result.parts.map(part => '<li><div><strong lang="zh-CN">' + esc(part.han) + '</strong>'
          + (part.py ? '<span lang="zh-Latn">' + esc(part.py) + '</span>' : '')
          + (part.word ? '<button type="button" class="text-btn" data-study-card="' + esc(part.word.han) + '">Thẻ từ</button>' : '')
          + '</div>' + (part.meaning || part.note ? '<p>' + esc(part.meaning || part.note) + '</p>'
            + (part.meaning && part.note ? '<p class="study-part-note">' + esc(part.note) + '</p>' : '')
            : '<p class="study-part-note">Chưa có nghĩa cụm này trong kho.</p>') + '</li>').join('') + '</ul></details>';
    }

    function show(text,scope,range = null,trigger = null) {
      const value = text.trim().replace(/\s+/gu,' ');
      if (!han.test(value)) return;
      if (active?.scope === scope && active.result.text === value && !trigger) {
        active.range = range;
        place();
        return;
      }
      lookup ||= createLookupIndex(host.words);
      const result = lookup(value,{text:scope.textContent,vi:scope.dataset.studyVi,py:scope.dataset.studyPy});
      const source = location.origin + location.pathname + (scope.dataset.studySource || location.hash);
      active = {scope,range,trigger,result,source};
      const machineLink = 'https://translate.google.com/?sl=zh-CN&tl=vi&op=translate&text=' + encodeURIComponent(result.text);
      panel.innerHTML = '<div class="study-lookup-head"><h2 id="study-lookup-title" tabindex="-1" lang="zh-CN">'
        + esc(result.text) + '</h2><button type="button" class="study-dismiss" data-study-action="close" aria-label="Đóng tra nhanh">×</button></div>'
        + (result.py ? '<p class="study-py" lang="zh-Latn">' + esc(result.py) + '</p>' : '')
        + (result.meaning ? '<p class="study-meaning">' + esc(result.meaning) + '</p>' : '<p class="study-part-note">Có thể xem nghĩa từng cụm bên dưới.</p>')
        + (result.direct?.note ? '<p class="study-context">' + esc(result.direct.note) + '</p>' : '')
        + '<div class="study-lookup-actions"><button type="button" data-study-action="listen">Nghe</button>'
        + '<button type="button" data-study-action="save">Lưu vào sổ</button>'
        + (result.direct?.word ? '<button type="button" class="text-btn" data-study-card="' + esc(result.direct.word.han) + '">Thẻ từ</button>' : '') + '</div>'
        + '<p class="study-lookup-status" role="status"></p>' + partsMarkup(result)
        + (!result.meaning ? '<a class="study-fallback" rel="noopener noreferrer" target="_blank" href="' + esc(machineLink) + '">Dịch cả đoạn trên Google Dịch ↗</a>' : '');
      panel.hidden = false;
      place();
      if (trigger) panel.querySelector('h2').focus({preventScroll:true});
    }

    function inspect() {
      const selection = document.getSelection();
      if (!selection || selection.isCollapsed || selection.rangeCount !== 1) {
        if (active?.range && !active.keepOnCollapse) close();
        return;
      }
      const range = selection.getRangeAt(0);
      const scope = scopeOf(range.startContainer);
      if (!scope || !root.contains(scope) || scope !== scopeOf(range.endContainer)) return;
      const blank = scope.querySelector('.cloze-slot:not([data-state])');
      if (blank && range.intersectsNode(blank)) return;
      show(selection.toString(),scope,range.cloneRange());
    }

    function queueInspect() {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => { scheduled = false; inspect(); });
    }

    function saveSelection({result,source}) {
      const knowledge = host.knowledge();
      const long = result.text.length > 120;
      const title = long ? result.text.slice(0,117).replace(/[\uD800-\uDBFF]$/u,'') + '…' : result.text;
      if (knowledge.journal.some(note => !note.archivedAt && note.title === title && note.source === source)) {
        status('Đoạn này đã có trong Sổ kiến thức.');
        return;
      }
      const entries = result.parts.filter(part => part.meaning).map(part => part.han + ' · ' + part.meaning);
      const note = [long ? result.text : '',result.py,result.meaning,result.direct?.note,...entries].filter(Boolean).join('\n');
      const linked = [...new Set([result.direct,...result.parts].map(part => part?.word?.id).filter(Boolean))];
      try {
        window.HAN_KNOWLEDGE.addNote(knowledge,{title,type:'word',note,source,linked});
        const saved = host.save();
        status(saved ? 'Đã lưu. ' : 'Đã ghi trong phiên này. ');
        const link = document.createElement('a');
        link.href = '#notebook';
        link.textContent = 'Mở Sổ kiến thức';
        panel.querySelector('[role="status"]').append(link);
      } catch (error) { status(error.message); }
      place();
    }

    panel.addEventListener('mousedown',event => {
      if (event.target.closest('button')) event.preventDefault();
    });
    panel.addEventListener('click',event => {
      const control = event.target.closest('button');
      if (!control || !active) return;
      const action = control.dataset.studyAction;
      if (action === 'close') close(true,true);
      if (action === 'listen') {
        const request = active;
        host.speak(active.result.text,false,ok => {
          if (!ok && active === request) status('Chưa phát được. Hãy kiểm tra giọng Quan thoại trên thiết bị.');
        });
      }
      if (action === 'save') saveSelection(active);
      if (control.dataset.studyCard) {
        close(true);
        host.detail(control.dataset.studyCard);
      }
    });

    document.addEventListener('selectionchange',queueInspect);
    document.addEventListener('pointerup',queueInspect,{passive:true});
    document.addEventListener('pointerdown',event => {
      if (!active) return;
      active.keepOnCollapse = panel.contains(event.target);
      if (!active.keepOnCollapse && !active.scope.contains(event.target)) close(true);
    },{passive:true});
    root.addEventListener('click',event => {
      const trigger = event.target.closest('[data-study-open]');
      const scope = trigger && document.getElementById(trigger.dataset.studyOpen);
      if (scope && root.contains(scope)) show(scope.textContent,scope,null,trigger);
    });
    document.addEventListener('keydown',event => {
      if (event.key === 'Escape' && active) close(true,true);
    });
    new MutationObserver(() => { if (active && !root.contains(active.scope)) close(); })
      .observe(root,{childList:true,subtree:true});
    window.addEventListener('resize',place,{passive:true});
    window.addEventListener('scroll',place,{passive:true});
    panel.addEventListener('toggle',place,true);
    return {close};
  };
})();
