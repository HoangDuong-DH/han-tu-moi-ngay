(() => {
  'use strict';

  const asset = './hsk-lexicon.json';
  const group = band => Number(band) === 7 ? '7–9' : String(band);
  const fold = text => text.toLowerCase().normalize('NFD').replace(/\p{M}/gu,'').replaceAll('đ','d').trim();
  let dictionary, pending;

  function index(entries) {
    const terms = new Map();
    const distinct = new Map();
    for (const [han,traditional,py,meaning,standard,exam] of entries) {
      const id = [han,traditional,py,meaning].join('\u0000');
      if (!distinct.has(id)) distinct.set(id,{
        han,traditional,py,meaning,standard:new Set(),exam:new Set(),
        pronunciation:fold(py).replace(/\s+/g,''),searchMeaning:fold(meaning)
      });
      const row = distinct.get(id);
      if (standard) row.standard.add(standard);
      if (exam) row.exam.add(exam);
    }
    const rows = [...distinct.values()];
    let maxLength = 0;
    for (const row of rows) {
      for (const form of new Set([row.han,row.traditional].filter(Boolean))) {
        maxLength = Math.max(maxLength,form.length);
        const options = terms.get(form) || [];
        options.push(row);
        terms.set(form,options);
      }
    }
    return {rows,terms,maxLength};
  }

  function load() {
    pending ||= fetch(asset).then(response => {
      if (!response.ok) throw new Error('HSK catalogue unavailable');
      return response.json();
    }).then(data => {
      if (!Array.isArray(data.entries) || !data.entries.length) throw new Error('HSK catalogue is empty');
      dictionary = index(data.entries);
      return dictionary.rows;
    }).catch(error => {
      pending = null;
      throw error;
    });
    return pending;
  }

  function get(form) {
    const options = dictionary?.terms.get(form);
    if (!options?.length) return undefined;
    const best = options.filter(row => row.meaning);
    const selected = best.length ? best : options;
    const levels = [...new Set(selected.flatMap(row => [...(row.standard.size ? row.standard : row.exam)]))];
    return {
      han:form,
      py:[...new Set(selected.map(row => row.py).filter(Boolean))].join(' / '),
      meaning:[...new Set(selected.map(row => row.meaning).filter(Boolean))].slice(0,3).join(' · '),
      hsk:levels.map(group).join(', ')
    };
  }

  function open({setHTML,esc,speak}) {
    setHTML(`<section class="hsk-lexicon" id="hsk-lexicon" aria-labelledby="hsk-lexicon-title">
      <p><a class="text-btn" href="#dictionary">← Kho từ của bạn</a></p>
      <h1 id="hsk-lexicon-title">Kho từ HSK 1–9</h1>
      <div class="hsk-lexicon-controls">
        <label class="hsk-lexicon-search">Tìm từ<input type="search" id="hsk-lexicon-search" placeholder="Chữ Hán, pinyin hoặc nghĩa tiếng Việt"></label>
        <div class="hsk-lexicon-filter"><label for="hsk-lexicon-system">Danh sách</label><select id="hsk-lexicon-system"><option value="standard">Chuẩn năng lực 2021</option></select></div>
        <div class="hsk-lexicon-filter"><label for="hsk-lexicon-band">Cấp</label><select id="hsk-lexicon-band"><option value="">Tất cả</option>
          <option value="1">HSK 1</option><option value="2">HSK 2</option><option value="3">HSK 3</option>
          <option value="4">HSK 4</option><option value="5">HSK 5</option><option value="6">HSK 6</option>
          <option value="7">HSK 7–9</option></select></div>
      </div>
      <p class="muted" id="hsk-lexicon-status" role="status">Đang tải kho từ…</p>
      <ul class="hsk-lexicon-results"></ul>
      <div class="hsk-lexicon-pager">
        <button class="btn" type="button" data-nav="-1" disabled>← Trang trước</button>
        <span aria-current="page"></span>
        <button class="btn" type="button" data-nav="1" disabled>Trang sau →</button>
      </div>
      <p class="muted hsk-lexicon-credit">Cấp 7–9 dùng chung một danh sách. Nghĩa tiếng Việt lấy từ CVDICT, nguồn có hỗ trợ dịch tự động.
        <a href="./HSK-LEXICON-NOTICE.md">Nguồn và giấy phép</a></p>
    </section>`);
    const root = document.getElementById('hsk-lexicon');
    const input = root.querySelector('input');
    const system = root.querySelector('#hsk-lexicon-system');
    const level = root.querySelector('#hsk-lexicon-band');
    const status = root.querySelector('[role="status"]');
    const results = root.querySelector('ul');
    const pager = root.querySelector('.hsk-lexicon-pager');
    const pageSize = 30;
    let entries = [], page = 0, filtered = [];

    function showPage() {
      const pageCount = Math.ceil(filtered.length / pageSize);
      const slice = filtered.slice(page * pageSize,(page + 1) * pageSize);
      status.textContent = filtered.length
        ? filtered.length.toLocaleString('vi') + ' mục từ'
        : 'Không tìm thấy từ phù hợp.';
      results.innerHTML = slice.map(row => `<li class="hsk-lexicon-row">
        <div class="hsk-lexicon-forms"><strong lang="zh-CN" data-study-text>${esc(row.han)}</strong>
          ${row.traditional && row.traditional !== row.han ? '<span lang="zh-Hant" data-study-text>' + esc(row.traditional) + '</span>' : ''}
          <span class="muted">${esc(row.py)}</span></div>
        <p>${esc(row.meaning || 'Chưa có nghĩa tiếng Việt trong CVDICT.')}</p>
        <div class="hsk-lexicon-actions"><small>HSK ${[...row[system.value]].sort((a,b)=>a-b).map(group).join(', ')}</small>
          <button class="text-btn" type="button" data-pronounce="${esc(row.han)}">Nghe</button></div>
      </li>`).join('');
      pager.querySelector('span').textContent = pageCount ? (page + 1) + ' / ' + pageCount : '';
      pager.querySelector('[data-nav="-1"]').disabled = page === 0;
      pager.querySelector('[data-nav="1"]').disabled = page + 1 >= pageCount;
    }

    function filter() {
      const query = input.value.trim();
      const normalized = fold(query);
      const pronunciation = normalized.replace(/\s+/g,'');
      const systemKey = system.value;
      const band = Number(level.value);
      const current = entries.filter(row => band ? row[systemKey].has(band) : row[systemKey].size);
      filtered = normalized
        ? current.filter(row => row.han.includes(query) || row.traditional.includes(query)
          || row.pronunciation.includes(pronunciation) || row.searchMeaning.includes(normalized))
        : current;
      if (normalized) filtered.sort((a,b) => Number(b.han === query || b.traditional === query) - Number(a.han === query || a.traditional === query));
      page = 0;
      showPage();
    }

    root.addEventListener('click',event => {
      const button = event.target.closest('button');
      if (button?.dataset.pronounce) speak(button.dataset.pronounce);
      if (button?.dataset.nav) {
        page += Number(button.dataset.nav);
        showPage();
        status.scrollIntoView({block:'nearest'});
      }
    });

    function populate() {
      load().then(rows => {
        if (!root.isConnected) return;
        entries = rows;
        if (entries.some(row => row.exam.size)) system.add(new Option('Đề cương thi 2025','exam'));
        input.addEventListener('input',filter);
        system.addEventListener('change',filter);
        level.addEventListener('change',filter);
        filter();
      }).catch(() => {
        if (!root.isConnected) return;
        status.textContent = 'Chưa tải được kho từ. ';
        const retry = document.createElement('button');
        retry.type = 'button';
        retry.className = 'text-btn';
        retry.textContent = 'Thử lại';
        retry.addEventListener('click',() => {
          status.textContent = 'Đang tải kho từ…';
          populate();
        });
        status.append(retry);
      });
    }
    populate();
  }

  window.HAN_HSK_LEXICON = {load,get,open,get loaded(){return Boolean(dictionary);},
    get maxLength(){return dictionary?.maxLength || 0;}};
})();
