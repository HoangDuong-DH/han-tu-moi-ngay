(() => {
  'use strict';

  const source = han => 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=' + encodeURIComponent(han);
  const annotations = {
    时: {py:'shí', hv:'thời', meaning:'Thời gian, lúc', parts:[['日'], ['寸']], variant:'時'},
    時: {py:'shí', hv:'thời', meaning:'Thời gian, lúc', parts:[['日','Gợi nghĩa'], ['寺','Gợi âm']], variant:'时', reference:source('時')},
    寺: {py:'sì', hv:'tự', meaning:'Chùa', parts:[['土'], ['寸']]},
    持: {py:'chí', hv:'trì', meaning:'Cầm, giữ', parts:[['扌','Gợi nghĩa'], ['寺','Gợi âm']], reference:source('持')},
    诗: {py:'shī', hv:'thi', meaning:'Thơ', parts:[['讠','Gợi nghĩa'], ['寺','Gợi âm']], variant:'詩', reference:source('詩')},
    詩: {py:'shī', hv:'thi', meaning:'Thơ', parts:[['言','Gợi nghĩa'], ['寺','Gợi âm']], variant:'诗', reference:source('詩')},
    日: {py:'rì', hv:'nhật', meaning:'Mặt trời, ngày'},
    寸: {py:'cùn', hv:'thốn', meaning:'Tấc'},
    土: {py:'tǔ', hv:'thổ', meaning:'Đất'},
    候: {py:'hòu', hv:'hậu', meaning:'Trong 时候, 候 thường đọc nhẹ thành hou.'},
    扌: {meaning:'Dạng thành phần của 手, liên quan đến tay.', variant:'手'},
    饣: {meaning:'Dạng giản thể của thành phần 飠, liên quan đến ăn uống.'},
    讠: {meaning:'Dạng thành phần giản thể của 言, liên quan đến lời nói.', variant:'言'},
    言: {py:'yán', hv:'ngôn', meaning:'Lời nói'},
    '⻊': {meaning:'Dạng của 足 khi đứng bên trái chữ, liên quan đến chân.', variant:'足'},
    足: {py:'zú', hv:'túc', meaning:'Chân'},
    青: {py:'qīng', hv:'thanh', meaning:'Màu xanh'},
    包: {py:'bāo', hv:'bao', meaning:'Bao, gói'},
    抱: {py:'bào', hv:'bão', meaning:'Ôm, bế', parts:[['扌','Gợi nghĩa'], ['包','Gợi âm']], reference:source('抱')},
    饱: {py:'bǎo', hv:'bão', meaning:'No', parts:[['饣','Gợi nghĩa'], ['包','Gợi âm']], reference:source('飽')},
    跑: {py:'pǎo', hv:'bào', meaning:'Chạy', parts:[['⻊','Gợi nghĩa'], ['包','Gợi âm']], reference:source('跑')},
    请: {parts:[['讠','Gợi nghĩa'], ['青','Gợi âm']], reference:'https://dict.variants.moe.edu.tw/dictView.jsp?ID=41903&q=1'},
  };

  const {formations, aliases, bridges, readings} = window.HAN_CHARACTER_GRAPH_DATA;
  for (const [han, semantic, phonetic, citedForm = han] of formations) {
    annotations[han] = {
      parts:[[semantic,'Gợi nghĩa'], [phonetic,'Gợi âm']],
      reference:source(citedForm),
    };
  }
  const labels = {parts:'Cấu tạo', words:'Từ ghép & cụm từ', sound:'Họ gợi âm', meaning:'Họ gợi nghĩa', vietnamese:'Hán Việt'};
  const characters = text => Array.from(text).filter(char => /\p{Script=Han}/u.test(char));
  const PAGE_SIZE = 4;

  function create(words) {
    const dictionary = new Map(words.map(word => [word.han, word]));
    const wordsByCharacter = new Map();
    const compounds = new Set([
      '时候','电话','电脑','电视','电影','电影院','医生','医院','学生','大学生',
      '时间','早饭','晚饭','米饭','面包','包子','服务员','售货员','商店','饭店',
      '课本','中文','汉语','汉字','学习','休息','学校','校长','校服','大学','中学','小学',
      '中学生','小学生','火车','出租车','水果','苹果','牛奶','衣服','杯子','椅子','公司',
      '朋友','女朋友','男朋友','女士','先生','天气','问题','答案','生病','面条儿',
      '名字','认识','工作','今年','明天','超市','东西','非常','游泳','蔬菜','青菜',
      '今天','星期','喜欢','老师','手机号','生日','春卷','筷子','现在','早上','上午',
      '下午','晚上','中午','白天','分钟','小时','人民币','房间','学号','号码','编号',
      '意思','后天','部长','队长','组长','日记','日报','半岛','半球','半夜','半月',
      '成员','会员','演员','职员','效果','国号','年号','名号','班长','书店','知道',
      '正在','昨天','觉得','需要','应该','然后','以前','以后','一起','因为','所以','如果','可能','其实','明年',
    ]);
    function addToIndex(index, key, value) {
      if (!index.has(key)) index.set(key, []);
      index.get(key).push(value);
    }
    for (const word of words) {
      const chars = characters(word.han);
      if (chars.length < 2) continue;
      for (const han of new Set(chars)) addToIndex(wordsByCharacter, han, word);
    }
    const soundIndex = new Map();
    const meaningIndex = new Map();
    for (const [han, annotation] of Object.entries(annotations)) {
      if (han === '詩') continue; // Show the corresponding simplified form in family lists.
      for (const [part, role] of annotation.parts || []) {
        if (role === 'Gợi âm') addToIndex(soundIndex, aliases[part] || part, han);
        if (role === 'Gợi nghĩa') addToIndex(meaningIndex, aliases[part] || part, han);
      }
    }
    const bridgeIndex = new Map();
    for (const rows of Object.values(bridges)) {
      for (const [vn, han, py, meaning] of rows) {
        if (!bridgeIndex.has(han)) bridgeIndex.set(han, {vn, han, py, meaning});
      }
    }
    const lessonParts = new Map();
    for (const question of window.HAN_WORDLAB.rows) {
      if (question.mode !== 'structure') continue;
      const parts = question.answer.split(' + ');
      if (parts.length >= 2 && parts.every(part => characters(part).length === 1 && Array.from(part).length === 1)) {
        lessonParts.set(question.cue, parts.map(part => [part, 'Thành phần nhìn thấy']));
      }
    }

    function entry(han) {
      const word = dictionary.get(han);
      const annotation = annotations[han];
      const [py,hv,meaning] = readings[han] || [];
      const bridge = bridgeIndex.get(han);
      return {
        han,
        py:py || word?.py || annotation?.py || bridge?.py || '',
        hv:hv || word?.hv || annotation?.hv || '',
        meaning:meaning || word?.meaning || annotation?.meaning || bridge?.meaning || '',
        inDictionary:!!word,
        variant:annotation?.variant || aliases[han],
        reference:annotation?.reference,
      };
    }

    function characterFamily(root, index, role) {
      const stem = aliases[root] || root;
      const members = index.get(stem) || [];
      const part = annotations[root]?.parts?.find(([, value]) => value === role)?.[0];
      return [
        ...(part ? [{han:part, role:role + ' trong ' + root}] : []),
        ...members.map(han => {
          const [visiblePart] = annotations[han].parts.find(([component, value]) =>
            value === role && (aliases[component] || component) === stem);
          return {han, role:'Có ' + visiblePart + ' ' + role.toLowerCase()};
        }),
      ];
    }

    function vietnameseLinks(chars) {
      const rows = new Map();
      for (const char of chars) {
        for (const [vn, han, py, meaning] of bridges[aliases[char] || char] || []) {
          if (!rows.has(han)) rows.set(han, {han, vn, py, meaning, role:'Liên hệ Hán Việt'});
        }
      }
      return rows;
    }

    const relatedCharacters = root => [...new Set(characters(root === '時' ? '时' : root === '詩' ? '诗' : root))];

    function branches(root, mode) {
      const chars = relatedCharacters(root);
      if (mode === 'parts') {
        const repeats = chars.length === 1 && characters(root).length > 1;
        const parts = characters(root).length > 1
          ? chars.map(char => [char, repeats ? 'Lặp chữ trong từ' : compounds.has(root) ? 'Ghép thành từ' : 'Chữ trong mục này'])
          : annotations[root]?.parts || lessonParts.get(root) || [];
        return parts.map(([han, role]) => ({han, role:role || 'Thành phần nhìn thấy'}));
      }
      if (mode === 'sound') return characterFamily(root, soundIndex, 'Gợi âm');
      if (mode === 'meaning') return characterFamily(root, meaningIndex, 'Gợi nghĩa');
      if (mode === 'vietnamese') {
        const links = vietnameseLinks(chars);
        links.delete(root);
        return [...links.values()];
      }
      const matches = new Map();
      for (const char of chars) {
        for (const word of wordsByCharacter.get(char) || []) {
          if (word.han === root || matches.has(word.han)) continue;
          const shared = chars.filter(ch => word.han.includes(ch));
          const role = compounds.has(word.han) ? 'Từ ghép · ' : 'Có chữ ';
          matches.set(word.han, {han:word.han, role:role + shared.join('、'), shared:shared.length, extra:!!word.extra});
        }
      }
      return [...matches.values()].sort((a,b) => b.shared - a.shared || Number(a.extra) - Number(b.extra) || a.han.length - b.han.length);
    }

    function modes(root) {
      return Object.keys(labels).filter(mode => mode === 'vietnamese'
        ? vietnameseLinks(relatedCharacters(root)).size : branches(root, mode).length);
    }

    function markup(han, esc, expanded = false) {
      return `<details class="character-graph" data-graph-root="${esc(han)}"${expanded?' open':''}>
        <summary>Sơ đồ chữ & từ</summary><div class="character-graph-content"></div>
      </details>`;
    }

    function bind(panel, esc, audio, startGuess = false) {
      const initial = panel.dataset.graphRoot;
      const content = panel.querySelector('.character-graph-content');
      let root = initial;
      let mode = modes(root)[0];
      let selected = root;
      let page = 0;
      let guessing = false;
      const history = [];

      function openGuess() {
        guessing = true;
        window.HAN_CHARACTER_GUESS.mount(content, {
          cards:window.HAN_CHARACTER_GUESS.deck(words, selected),
          esc,
          audio,
          onExit() {
            guessing = false;
            draw();
            content.querySelector('[data-graph-guess]').focus();
          },
        });
      }

      function draw() {
        const available = modes(root);
        const items = branches(root, mode);
        const displayed = items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
        const detail = entry(selected);
        const active = mode === 'vietnamese' && selected === root
          ? vietnameseLinks(relatedCharacters(root)).get(root)
          : displayed.find(item => item.han === selected);
        const canFollow = selected !== root && modes(selected).length;
        const directMode = active?.role === 'Gợi âm' ? 'sound' : active?.role === 'Gợi nghĩa' ? 'meaning' : mode;
        const followLabel = directMode !== mode && modes(selected).includes(directMode)
          ? 'Xem ' + labels[directMode].toLowerCase() : 'Mở nhánh này';
        const notes = {
          parts:characters(root).length > 1 ? 'Bấm từng chữ để xem cách đọc, nghĩa và các nhánh của chữ.' : '“Thành phần nhìn thấy” mô tả mặt chữ. Các vai trò gợi âm và gợi nghĩa có nguồn đi kèm.',
          words:'Bấm vào từ để xem nghĩa trong ngữ cảnh. Cùng một chữ có thể mang nghĩa khác nhau trong hai từ.',
          sound:'So pinyin của từng chữ. Cùng thành phần gợi âm có thể khác phụ âm đầu hoặc thanh điệu.',
          meaning:'Các chữ chia sẻ một thành phần gợi nghĩa. Xem nghĩa từng chữ để thấy mối liên hệ.',
          vietnamese:'Bấm vào ví dụ để nối chữ đang học với cách nói quen thuộc trong tiếng Việt.',
        };

        content.innerHTML = `
          <div class="character-graph-tabs" role="group" aria-label="Loại quan hệ">
            ${available.map(key => `<button type="button" data-graph-mode="${key}" aria-pressed="${key === mode}">${labels[key]}</button>`).join('')}
          </div>
          <button type="button" class="btn character-guess-start" data-graph-guess>Đoán chữ chưa học</button>
          ${history.length ? '<button type="button" class="text-btn" data-graph-back>← Quay lại</button>' : ''}
          ${mode ? `<p class="character-graph-note">${notes[mode]}</p>` : ''}
          <div class="character-tree">
            <button type="button" class="character-node character-root" data-graph-select="${esc(root)}" aria-pressed="${selected === root}">
              <span lang="zh-CN">${esc(root)}</span>
            </button>
            ${displayed.length ? `<div class="character-branches character-branches-${displayed.length}">
              ${displayed.map(item => `<div class="character-branch">
                <button type="button" class="character-node" data-graph-select="${esc(item.han)}" data-relation="${item.role === 'Gợi âm' ? 'sound' : item.role === 'Gợi nghĩa' ? 'meaning' : mode}" aria-pressed="${selected === item.han}">
                  <span lang="zh-CN">${esc(item.han)}</span><small>${esc(item.vn || item.role)}</small>
                </button>
              </div>`).join('')}
            </div>` : ''}
          </div>
          ${items.length > PAGE_SIZE ? `<div class="character-graph-pages">
            <button type="button" class="text-btn" data-graph-page="-1"${page===0?' disabled':''}>← Trước</button>
            <span>${page * PAGE_SIZE + 1}–${page * PAGE_SIZE + displayed.length} / ${items.length}</span>
            <button type="button" class="text-btn" data-graph-page="1"${(page+1)*PAGE_SIZE>=items.length?' disabled':''}>Sau →</button>
          </div>` : ''}
          <section class="character-graph-detail" aria-live="polite" aria-label="Chữ đang xem">
            <p class="character-graph-reading"><b lang="zh-CN">${esc(detail.han)}</b>
              ${detail.py ? `<span>${esc(active?.py || detail.py)}</span>${audio(detail.han)}` : ''}
              ${detail.hv ? `<span class="muted">Hán Việt · ${esc(detail.hv)}</span>` : ''}
            </p>
            ${active?.vn ? `<p><strong>${esc(active.vn)}</strong></p>` : ''}
            ${active?.meaning || detail.meaning ? `<p>${esc(active?.meaning || detail.meaning)}</p>` : ''}
            ${active ? `<p class="character-graph-note">${esc(active.role)}</p>` : ''}
            <div class="chip-row">
              ${canFollow ? `<button type="button" class="btn" data-graph-follow="${esc(selected)}" data-graph-next-mode="${esc(directMode || '')}">${followLabel}</button>` : ''}
              ${detail.variant ? `<button type="button" class="text-btn" data-graph-follow="${esc(detail.variant)}">Xem <span lang="zh-CN">${esc(detail.variant)}</span></button>` : ''}
              ${detail.inDictionary && selected !== initial ? `<button type="button" class="text-btn" data-detail="${esc(selected)}">Mở thẻ từ →</button>` : ''}
            </div>
            ${detail.reference ? `<p class="character-graph-note"><a href="${esc(detail.reference)}" target="_blank" rel="noopener noreferrer">Nguồn cấu tạo chữ</a></p>` : ''}
          </section>`;
      }

      function follow(han, preferredMode) {
        history.push({root, mode, selected, page});
        root = han;
        selected = han;
        const available = modes(han);
        mode = available.includes(preferredMode) ? preferredMode : available[0];
        page = 0;
      }

      panel.addEventListener('click', event => {
        const button = event.target.closest('button');
        if (guessing || !button || !panel.contains(button)) return;
        let focusSelector;
        if (button.hasAttribute('data-graph-guess')) {
          openGuess();
          return;
        } else if (button.hasAttribute('data-graph-mode')) {
          mode = button.dataset.graphMode;
          selected = root;
          page = 0;
          focusSelector = '[data-graph-mode][aria-pressed="true"]';
        } else if (button.hasAttribute('data-graph-select')) {
          selected = button.dataset.graphSelect;
          focusSelector = '[data-graph-select][aria-pressed="true"]';
        } else if (button.hasAttribute('data-graph-follow')) {
          follow(button.dataset.graphFollow, button.dataset.graphNextMode || mode);
          focusSelector = '.character-root';
        } else if (button.hasAttribute('data-graph-back')) {
          ({root, mode, selected, page} = history.pop());
          focusSelector = '[data-graph-select][aria-pressed="true"]';
        } else if (button.hasAttribute('data-graph-page')) {
          page += Number(button.dataset.graphPage);
          selected = root;
          focusSelector = '.character-branch button';
        } else return;
        draw();
        content.querySelector(focusSelector)?.focus({preventScroll:true});
      });
      if (startGuess) openGuess();
      else if (panel.open) draw();
      panel.addEventListener('toggle', () => {
        if (panel.open && !content.firstElementChild) draw();
      });
    }

    return {markup, bind, branches, entry, modes};
  }

  window.HAN_CHARACTER_GRAPH = {create};
})();
