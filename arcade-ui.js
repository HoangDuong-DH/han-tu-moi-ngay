(() => {
  'use strict';

  const modeInfo = {
    hunt:{title:'Săn kho chữ',symbol:'藏',description:'Ghép mặt chữ, pinyin và nghĩa để mở rương.',count:'9 rương',stageNames:['Bến nhỏ','Rừng trúc','Kho cổ']},
    build:{title:'Xếp câu mở cửa',symbol:'门',description:'Đặt các mảnh vào đúng trật tự để mở từng cánh cửa.',count:'6 câu',stageNames:['Cửa đầu','Lối rẽ','Cửa cuối']}
  };
  const draftKey = 'arcade:records';

  window.createHanArcade = host => {
    const {root,esc,shuffle,audio} = host;
    const {gloss,sentence,solutionIndex,accepts,nextClue,createScore,award,createDeck} = window.HAN_ARCADE;
    const library = window.HAN_DEEP_READING_DATA;
    const cases = window.HAN_ARCADE_SENTENCES;
    const $ = selector => root.querySelector(selector);
    const $$ = selector => [...root.querySelectorAll(selector)];
    let selectedMode = 'hunt', topic = '', entryTopic = '', round = null, deck;
    const paused = new Map();
    const runKey = () => selectedMode + '/' + entryTopic;
    const getDeck = () => deck ||= createDeck({words:host.words,readings:library.articles,
      linkedWords:library.linkedWords,cases,shuffle});
    const info = () => modeInfo[selectedMode];
    const back = () => entryTopic ? '#read/' + entryTopic + '/choi-tu' : '#games';
    const studyText = (text,py,vi,id = '') => '<span lang="zh-CN" data-study-text' + (id ? ' id="'+id+'"' : '')
      + ' data-study-py="' + esc(py || '') + '" data-study-vi="' + esc(vi || '') + '">' + esc(text) + '</span>';
    const playButton = (label,id,extra = '') => '<button type="button" class="arcade-button' + extra + '" id="' + id + '">' + label + '</button>';

    function records() {
      let parsed;
      try {parsed = JSON.parse(host.db().knowledge.drafts[draftKey]?.text || '{}');} catch {parsed = {};}
      return Object.fromEntries(Object.keys(modeInfo).map(mode => {
        const old = parsed?.[mode];
        const points = Number.isInteger(old?.points) ? Math.max(0,Math.min(2000,old.points)) : 0;
        const peak = Number.isInteger(old?.peak) ? Math.max(0,Math.min(9,old.peak)) : 0;
        const review = Array.isArray(old?.review) ? old.review.filter(row => row && typeof row.id === 'string'
          && /^[\w-]{1,64}$/.test(row.id) && (mode === 'hunt' || [0,1].includes(row.frameIndex))).slice(-16) : [];
        return [mode,{points,peak,review}];
      }));
    }

    function changeRecords(update) {
      const data = records();
      update(data[selectedMode]);
      window.HAN_KNOWLEDGE.saveDraft(host.db().knowledge,draftKey,JSON.stringify(data),[],false);
      host.save();
    }

    function pending() {
      const bank = getDeck();
      const index = selectedMode === 'hunt' ? bank.byId : bank.byCase;
      return [...new Map(records()[selectedMode].review.filter(row => index.has(row.id)).map(row => [row.id,row])).values()];
    }

    function keepForReplay(id,frameIndex) {
      changeRecords(record => {
        record.review = [...record.review.filter(entry => entry.id !== id),{id,frameIndex}].slice(-16);
      });
      round.score.streak = 0;
    }

    function clearReplay(id) {
      if (round.review && pending().some(row => row.id === id)) {
        changeRecords(record => {record.review = record.review.filter(row => row.id !== id);});
      }
    }

    function lobby() {
      const data = records();
      return '<section class="arcade-deck" aria-labelledby="arcade-games"><h2 id="arcade-games">Vượt chặng</h2><div>'
        + Object.entries(modeInfo).map(([key,mode]) => '<a class="arcade-card" data-game="' + key + '" href="#game/' + key
          + '"><span class="arcade-card-mark" lang="zh-CN" aria-hidden="true">' + mode.symbol + '</span><span class="arcade-card-body">'
          + '<strong>' + mode.title + '</strong><span>' + mode.description + '</span><small>' + mode.count + ' · 3 chặng'
          + (data[key].points ? ' · Kỷ lục ' + data[key].points : '') + '</small></span><span aria-hidden="true">→</span></a>').join('')
        + '</div></section>';
    }

    function mount(markup,focus = '') {
      host.mount('<section class="arcade" data-game="' + selectedMode + '">' + markup + '</section>');
      const reset = $('#arcade-change');
      if (reset) reset.onclick = intro;
      if (focus) $(focus)?.focus({preventScroll:true});
    }

    function top(label = '') {
      return '<div class="arcade-nav"><a href="' + esc(back()) + '">← ' + (entryTopic ? 'Về bài đọc' : 'Chơi &amp; luyện')
        + '</a><div class="arcade-nav-actions">' + label
        + (round && !round.done ? '<button type="button" class="arcade-word-link" id="arcade-change">Đổi bộ từ</button>' : '') + '</div></div>';
    }

    function scrollTop() { window.scrollTo(0,0); }

    function open(mode,readingId) {
      selectedMode = mode;
      entryTopic = library.byId.has(readingId) ? readingId : '';
      topic = entryTopic;
      const previous = paused.get(runKey());
      if (previous) {
        paused.delete(runKey());
        topic = previous.topic;
        round = previous.round;
        if (selectedMode === 'hunt') showHunt('#arcade-title');
        else showBuild('#arcade-title');
        scrollTop();
        return;
      }
      intro();
    }

    function intro() {
      round = null;
      paused.delete(runKey());
      const mode = info();
      const record = records()[selectedMode];
      const saved = pending();
      const themed = selectedMode === 'build'
        ? library.articles.filter(article => cases.some(item => item.topics.includes(article.id))) : library.articles;
      if (topic && !themed.some(article => article.id === topic)) topic = '';
      mount(top() + '<header class="arcade-intro"><span class="arcade-intro-mark" lang="zh-CN" aria-hidden="true">' + mode.symbol
        + '</span><h1 tabindex="-1" id="arcade-title">' + mode.title + '</h1><p>' + mode.description + '</p><p>'
        + mode.count + ' · 3 chặng · Không giới hạn thời gian</p></header><div class="arcade-setup">'
        + '<label for="arcade-topic">Ưu tiên từ của bài</label><select id="arcade-topic"><option value="">Trộn các bài đọc</option>'
        + themed.map(article => '<option value="' + esc(article.id) + '"' + (article.id === topic ? ' selected' : '') + '>'
          + esc(article.title) + '</option>').join('') + '</select>'
        + '<p>Đúng ngay để nối chuỗi điểm. Cứ 3 lượt đúng liên tiếp sẽ thêm một gợi ý, tối đa 2 gợi ý mang theo.</p>'
        + (record.points ? '<p class="arcade-best">Kỷ lục cá nhân <strong>' + record.points + ' điểm</strong> · Chuỗi dài nhất ' + record.peak + '</p>' : '')
        + '<div class="arcade-actions">' + playButton('Bắt đầu chơi','arcade-start',' arcade-primary')
        + (saved.length ? playButton('Ôn lại ' + saved.length + (selectedMode === 'hunt' ? ' từ' : ' câu'),'arcade-replay') : '')
        + '</div></div>','#arcade-title');
      $('#arcade-topic').onchange = event => {topic = event.target.value;};
      $('#arcade-start').onclick = () => begin(false);
      if (saved.length) $('#arcade-replay').onclick = () => begin(true);
      scrollTop();
    }

    function begin(review) {
      const bank = getDeck();
      const groups = review ? bank[selectedMode + 'Replay'](pending()) : bank[selectedMode](topic,host.reviewedWords());
      if (!groups.length || groups.some(group => !group.length)) {intro();return;}
      round = {groups,review,stage:0,index:0,completed:0,score:createScore(),done:false};
      setupRound();
    }

    function setupRound() {
      const group = round.groups[round.stage];
      if (selectedMode === 'hunt') {
        round.board = {group,lanes:{han:shuffle(group),py:shuffle(group),meaning:shuffle(group)},solved:new Set(),
          selected:null,matchedSound:false,misses:new Set(),helped:new Set(),feedback:null,highlight:null};
        showHunt('#arcade-title');
      } else {
        const card = group[round.index];
        const frame = card.item.frames[card.frameIndex];
        const tiles = shuffle([...frame.tiles,...(frame.trap ? [frame.trap[0]] : [])]);
        if (tiles.every((tile,index) => tile === frame.tiles[index])) tiles.push(tiles.shift());
        round.board = {card,frame,tiles,placed:[],missed:false,assisted:false,feedback:null,highlight:null};
        showBuild('#arcade-title');
      }
      scrollTop();
    }

    function header() {
      const {score,stage,groups,review} = round;
      const current = review ? 'Ôn lại · ' + (stage+1) + '/' + groups.length : info().stageNames[stage];
      const steps = review ? '' : '<ol class="arcade-route" aria-label="Các chặng">' + info().stageNames.map((name,i) => '<li'
        + (i === stage ? ' aria-current="step"' : '') + (i < stage ? ' data-cleared="true"' : '')
        + '><span aria-hidden="true">' + (i < stage ? '✓' : (i+1)) + '</span>' + esc(name) + '</li>').join('') + '</ol>';
      return top('<b>' + (stage+1) + '/' + groups.length + '</b>') + '<header class="arcade-run-head">'
        + '<h1 id="arcade-title" tabindex="-1">' + esc(current) + '</h1>'
        + (review ? '' : '<div class="arcade-score" aria-label="Điểm và chuỗi hiện tại"><span><strong>' + score.points
          + '</strong> điểm</span><span>Chuỗi <strong>×' + score.streak + '</strong></span></div>') + '</header>' + steps;
    }

    function rewardMarkup(reward) {
      if (!reward) return '';
      return '<span class="arcade-reward">+' + reward.points + ' điểm' + (reward.earned ? ' · +1 gợi ý' : '') + '</span>';
    }

    function complete(clean,shown = false) {
      round.completed++;
      if (shown) {round.score.streak = 0;return null;}
      if (!round.review) return award(round.score,clean);
      if (clean) round.score.clean++;
      return null;
    }

    function advance() {
      const {groups,stage} = round;
      if (selectedMode === 'build' && round.index + 1 < groups[stage].length) {
        round.index++;
        setupRound();
        return;
      }
      round.stage++;
      round.index = 0;
      if (round.stage === groups.length) { result(); return; }
      round.score.hints = Math.max(round.score.hints,1);
      setupRound();
    }

    function nextLabel() {
      if (selectedMode === 'build' && round.index + 1 < round.groups[round.stage].length) return 'Câu tiếp →';
      return round.stage + 1 < round.groups.length ? (round.review ? 'Lượt ôn tiếp →' : 'Sang chặng sau →') : 'Xem kết quả →';
    }

    function exampleFor(word) {
      const article = library.byId.get(topic);
      const local = article?.examples.find(example => example.segments?.some(([text]) => text === word.han));
      if (local) return [local.han,local.py,local.vi];
      const use = word.usageStudies?.flatMap(item => item.examples || []).find(row => row[0] && row[2]);
      return use || null;
    }

    function wordDetail(word) {
      return '<button type="button" class="arcade-word-link" data-detail="' + esc(word.han) + '">Thẻ từ <span lang="zh-CN">'
        + esc(word.han) + '</span></button>';
    }

    function exampleMarkup(text,py,vi) {
      return '<div class="arcade-example">' + studyText(text,py,vi,'arcade-example-han') + audio(text)
        + '<button type="button" class="study-open arcade-word-link" data-study-open="arcade-example-han">Tra câu</button></div>'
        + (py ? '<p class="arcade-pinyin" lang="zh-Latn">' + esc(py) + '</p>' : '') + '<p>' + esc(vi) + '</p>';
    }

    function guide(feedback) {
      if (!feedback) return '';
      if (feedback.kind === 'wrong' || feedback.kind === 'hint') return '<div class="arcade-feedback" data-feedback="'
        + feedback.kind + '" role="status"><strong>' + (feedback.kind === 'wrong' ? 'Xem lại mảnh này' : 'Gợi ý')
        + '</strong><p>' + esc(feedback.text) + '</p></div>';
      const {word,reward,source} = feedback;
      const sample = exampleFor(word);
      return '<div class="arcade-feedback" data-feedback="success"><div class="arcade-feedback-head"><h2>Đã mở rương</h2>'
        + rewardMarkup(reward) + '</div><p>' + studyText(word.han,word.py,gloss(word)) + ' · '
        + esc(word.py) + ' · ' + esc(gloss(word)) + '</p><small class="arcade-source" data-word-source="' + source + '">'
        + ({learned:'Từ đã ôn',reading:'Từ bài đọc',practice:'Từ trong kho',review:'Từ cần ôn lại'})[source] + '</small>'
        + (sample ? exampleMarkup(...sample) : '') + wordDetail(word) + '</div>';
    }

    function showHunt(focus) {
      const board = round.board;
      const {group,lanes,solved,selected,matchedSound,feedback,highlight} = board;
      const active = selected ? (matchedSound ? 'meaning' : 'py') : 'han';
      const clear = solved.size === group.length;
      const instructions = clear ? 'Bạn đã mở hết rương ở chặng này.' : active === 'han' ? 'Chọn một mảnh chữ Hán.'
        : (active === 'py' ? 'Ghép âm đọc với ' : 'Ghép nghĩa với ') + selected.word.han + '.';
      const labels = {han:'Chữ Hán',py:'Âm đọc',meaning:'Nghĩa'};
      const hints = round.score.hints;
      mount(header() + '<div class="arcade-board treasure-board"><div class="treasure-meter"><p><strong>' + solved.size + '/'
        + group.length + '</strong> rương đã mở</p><div aria-hidden="true">' + group.map(({word}) => '<span'
          + (solved.has(word.id) ? ' data-open="true" lang="zh-CN">' + esc(word.han) : ' title="Rương chưa mở">◇')
        + '</span>').join('') + '</div></div><p class="arcade-prompt" id="hunt-instruction" aria-live="polite">' + esc(instructions) + '</p>'
        + (feedback && feedback.kind !== 'success' ? guide(feedback) : '') + '<div class="treasure-lanes">'
        + Object.entries(lanes).map(([lane,cards]) => '<section class="treasure-lane" data-lane="' + lane
          + '" aria-label="' + labels[lane] + '"><h2>' + labels[lane] + '</h2>' + cards.map(({word},i) => {
            const used = solved.has(word.id);
            const picked = selected?.word.id === word.id && (lane === 'han' || (lane === 'py' && matchedSound));
            const value = lane === 'meaning' ? gloss(word) : word[lane];
            const lang = lane === 'han' ? 'zh-CN' : lane === 'py' ? 'zh-Latn' : 'vi';
            return '<button type="button" class="arcade-tile" data-pick-lane="' + lane + '" data-pick-index="' + i
              + '" lang="' + lang + '"' + (used || active !== lane ? ' disabled' : '') + (used ? ' data-found="true"' : '')
              + (picked ? ' data-picked="true"' : '') + (highlight?.lane === lane && highlight.id === word.id ? ' data-hinted="true"' : '')
              + '>' + esc(value) + '</button>';
          }).join('') + '</section>').join('') + '</div><div class="arcade-actions">'
        + (clear ? playButton(nextLabel(),'arcade-next',' arcade-primary') : '<button class="arcade-button" type="button" id="arcade-hint"'
          + (!selected || !hints || highlight ? ' disabled' : '') + '>Gợi ý · ' + hints + '</button>') + '</div></div>'
        + (feedback?.kind === 'success' ? guide(feedback) : ''),focus);
      $$('[data-pick-lane]').forEach(button => {button.onclick = () => huntPick(button.dataset.pickLane,Number(button.dataset.pickIndex));});
      if (clear) $('#arcade-next').onclick = advance;
      else $('#arcade-hint').onclick = () => {
        round.score.hints--;
        board.helped.add(active);
        keepForReplay(board.selected.word.id);
        board.highlight = {lane:active,id:board.selected.word.id};
        board.feedback = {kind:'hint',text:'Mảnh được viền sáng khớp với chữ đang ghép.'};
        showHunt('[data-hinted="true"]');
      };
    }

    function huntPick(lane,index) {
      const board = round.board;
      const picked = board.lanes[lane][index];
      if (board.solved.has(picked.word.id)) return;
      if (lane === 'han') {
        board.selected = picked;
        board.matchedSound = false;
        board.misses.clear(); board.helped.clear(); board.feedback = null;
        showHunt('[data-pick-lane="py"]:not(:disabled)');
        return;
      }
      const {word,source} = board.selected;
      const skill = lane === 'py' ? 'reading' : 'meaning';
      if (word.id !== picked.word.id) {
        if (!board.misses.has(lane)) {
          board.misses.add(lane);
          keepForReplay(word.id);
          host.record(word,false,skill,round.review,picked.word);
        }
        board.feedback = {kind:'wrong',text:lane === 'py'
          ? 'Âm ' + picked.word.py + ' đi với ' + picked.word.han + '. Chữ ' + word.han + ' đọc là ' + word.py + '.'
          : '“' + gloss(picked.word) + '” là nghĩa của ' + picked.word.han + '. ' + word.han + ' có nghĩa “' + gloss(word) + '”.'};
        showHunt('[data-pick-lane="' + lane + '"][data-pick-index="' + index + '"]');
        return;
      }
      host.record(word,true,skill,round.review || board.misses.has(lane) || board.helped.has(lane));
      board.highlight = null;
      if (lane === 'py') {
        board.matchedSound = true;
        board.feedback = null;
        showHunt('[data-pick-lane="meaning"]:not(:disabled)');
        return;
      }
      const clean = !board.misses.size && !board.helped.size;
      if (clean) clearReplay(word.id);
      board.feedback = {kind:'success',word,source,reward:complete(clean)};
      board.solved.add(word.id);
      board.selected = null;
      const next = board.solved.size === board.group.length ? '#arcade-next' : '[data-pick-lane="han"]:not(:disabled)';
      showHunt(next);
    }

    function showBuild(focus) {
      const {card,frame,tiles,placed,feedback,highlight,missed} = round.board;
      const finished = feedback?.kind === 'success';
      const article = card.item.topics.includes(topic) ? topic : card.item.topics[0];
      const hints = round.score.hints;
      const filled = placed.length === frame.tiles.length;
      const help = feedback && !finished ? guide(feedback) : '';
      mount(header() + '<div class="arcade-board sentence-board"><div class="sentence-scene"><span class="sentence-gate" aria-hidden="true"'
        + (finished ? ' data-open="true"' : '') + '><i></i><i></i></span><p class="arcade-prompt"><strong>' + esc(frame.vi) + '</strong></p></div>'
        + '<p class="arcade-instruction">Chạm mảnh để xếp. Chạm lại mảnh đã xếp để bỏ ra.</p><div class="sentence-track" aria-label="Câu đang xếp">'
        + (frame.prefix ? '<span class="arcade-anchor" lang="zh-CN">' + esc(frame.prefix) + '</span>' : '')
        + frame.tiles.map((_,i) => i < placed.length ? '<button type="button" class="arcade-tile" data-remove="' + i
          + '" lang="zh-CN"' + (finished ? ' disabled' : '') + (highlight === placed[i] ? ' data-hinted="true"' : '')
          + '>' + esc(placed[i]) + '</button>' : '<span class="arcade-slot" aria-hidden="true"></span>').join('')
        + '<span class="arcade-anchor" lang="zh-CN">' + esc(frame.suffix || '。') + '</span></div><div class="sentence-tiles" aria-label="Mảnh để xếp">'
        + tiles.map((tile,i) => '<button type="button" lang="zh-CN" class="arcade-tile" data-tile="' + i + '"'
          + (placed.includes(tile) ? ' data-used="true"' : '')
          + (highlight === tile && !placed.includes(tile) ? ' data-hinted="true"' : '')
          + (placed.includes(tile) || finished || filled ? ' disabled' : '') + '>' + esc(tile) + '</button>').join('') + '</div>' + help
        + '<div class="arcade-actions">' + (finished ? playButton(nextLabel(),'arcade-next',' arcade-primary')
          : '<button type="button" class="arcade-button arcade-primary" id="arcade-check"' + (filled ? '' : ' disabled') + '>Mở cửa</button>'
          + '<button class="arcade-button" type="button" id="arcade-hint"' + (!hints || highlight || accepts(frame,placed) ? ' disabled' : '') + '>Gợi ý · ' + hints + '</button>'
          + (missed ? playButton('Xem cách xếp','arcade-solve') : '')) + '</div></div>'
        + (finished ? '<div class="arcade-feedback" data-feedback="success"><div class="arcade-feedback-head"><h2>'
          + (feedback.revealed ? 'Cách xếp mẫu' : 'Cửa đã mở') + '</h2>' + rewardMarkup(feedback.reward) + '</div>'
          + exampleMarkup(feedback.han,feedback.py,frame.vi) + '<p>' + esc(frame.why) + '</p>'
          + (card.word ? wordDetail(card.word) : '')
          + (article ? '<a class="arcade-word-link" href="#read/' + esc(article) + '/vi-du">Bài đọc liên quan ↗</a>' : '')
          + '</div>' : ''),focus);
      if (finished) {$('#arcade-next').onclick = advance;return;}
      $$('[data-tile]').forEach(button => {button.onclick = () => {
        placed.push(tiles[Number(button.dataset.tile)]);
        round.board.highlight = null;
        round.board.feedback = null;
        showBuild(placed.length === frame.tiles.length ? '#arcade-check' : '[data-tile]:not(:disabled)');
      };});
      $$('[data-remove]').forEach(button => {button.onclick = () => {
        placed.splice(Number(button.dataset.remove),1);
        round.board.highlight = null;
        round.board.feedback = null;
        showBuild('[data-tile]:not(:disabled)');
      };});
      $('#arcade-hint').onclick = buildHint;
      $('#arcade-check').onclick = () => checkBuild(false);
      if (missed) $('#arcade-solve').onclick = () => checkBuild(true);
    }

    function buildHint() {
      const board = round.board;
      if (accepts(board.frame,board.placed)) return;
      round.score.hints--;
      board.assisted = true;
      keepForReplay(board.card.item.id,board.card.frameIndex);
      const clue = nextClue(board.frame,board.placed);
      board.highlight = clue?.tile || null;
      board.feedback = {kind:'hint',text:board.frame.hint + (clue?.tile ? ' Mảnh viền sáng đứng ở ô ' + clue.position + '.' : '')};
      showBuild('#arcade-title');
    }

    function checkBuild(revealed) {
      const board = round.board;
      const {card,frame,placed} = board;
      if (board.feedback?.kind === 'success') return;
      const solution = solutionIndex(frame,placed);
      if (revealed || solution >= 0) {
        const clean = !board.missed && !board.assisted && !revealed;
        if (revealed) board.placed = [...frame.tiles];
        if (clean) clearReplay(card.item.id);
        if (card.word && !revealed) host.record(card.word,true,'usage',round.review || !clean);
        board.feedback = {kind:'success',revealed,reward:complete(clean,revealed),han:sentence(frame,board.placed),
          py:!revealed && solution > 0 ? frame.alternativePy?.[solution-1] : frame.py};
        showBuild('#arcade-next');
        $('#arcade-example-han')?.scrollIntoView({block:'nearest'});
        return;
      }
      if (!board.missed) {
        board.missed = true;
        keepForReplay(card.item.id,card.frameIndex);
        if (card.word) host.record(card.word,false,'usage',round.review);
      }
      const extra = frame.trap && placed.includes(frame.trap[0]) ? frame.trap[1] + ' ' : '';
      board.feedback = {kind:'wrong',text:extra + frame.hint};
      showBuild('[data-remove]');
    }

    function result() {
      if (round.done) return;
      round.done = true;
      const {score,completed,review} = round;
      const previous = records()[selectedMode];
      const personalBest = !review && score.points > previous.points;
      if (!review) {
        changeRecords(record => {record.points = Math.max(record.points,score.points);record.peak = Math.max(record.peak,score.peak);});
        host.finish(selectedMode,score.clean,completed);
      }
      const needsReview = pending().length;
      mount(top() + '<header class="arcade-intro arcade-results"><h1 id="arcade-title" tabindex="-1">'
        + (review ? 'Đã xong lượt ôn' : 'Đã qua ba chặng') + '</h1>'
        + (review ? '' : '<p class="arcade-final-score">' + score.points + ' <small>điểm</small></p>'
          + '<p>' + (personalBest ? 'Kỷ lục mới · ' : '') + 'Chuỗi dài nhất lượt này ×' + score.peak + '</p>')
        + '<p>' + score.clean + '/' + completed + ' ' + (selectedMode === 'hunt' ? 'rương mở đúng ngay' : 'câu xếp đúng ngay') + '</p></header>'
        + '<div class="arcade-actions">' + (needsReview ? playButton('Ôn lại ' + needsReview + (selectedMode === 'hunt' ? ' từ' : ' câu khác'),'arcade-replay',' arcade-primary') : '')
        + playButton('Chơi lượt mới','arcade-restart',needsReview ? '' : ' arcade-primary') + '<a class="arcade-button" href="#games">Đổi trò</a></div>',
        '#arcade-title');
      if (needsReview) $('#arcade-replay').onclick = () => begin(true);
      $('#arcade-restart').onclick = intro;
      scrollTop();
    }

    function cancel() {
      if (round && !round.done) paused.set(runKey(),{topic,round});
      round = null;
    }

    return {lobby,open,cancel};
  };
})();
