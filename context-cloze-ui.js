(() => {
  'use strict';

  const queueKey = 'cloze:review';
  const replayLabel = count => 'Ôn lại ' + count + ' câu sai';

  window.createHanCloze = host => {
    const {esc,shuffle} = host;
    const articles = window.HAN_DEEP_READING_DATA;
    const bank = window.createHanClozeBank({words:host.words,
      readings:window.HAN_READING_LAB.readings,shuffle});
    const lessonWords = new Map(window.HAN_HSK2.units.flatMap(unit =>
      unit.words.map(word => [word.key,word.catalogId])));
    const $ = selector => document.querySelector(selector);
    let topic = '';
    let entryTopic = '';
    let mode = 'choice';
    let run = null;

    const back = () => entryTopic ? '#read/' + entryTopic + '/choi-tu' : '#games';
    const mount = html => {
      host.mount('<section class="cloze">' + html + '</section>');
      window.scrollTo(0,0);
    };
    const top = content => '<div class="cloze-nav"><a href="' + esc(back()) + '">← '
      + (entryTopic ? 'Về bài đọc' : 'Trò chơi') + '</a>' + content + '</div>';
    const navToSetup = '<button type="button" class="text-btn" id="cloze-exit">Chọn bài</button>';
    const termName = han => '<span lang="zh-CN">' + esc(han) + '</span>';

    function reviewedWords() {
      const study = host.db();
      const seen = {...study.learning.introduced};
      for (const event of study.knowledge.events) {
        if (event.kind !== 'attempt' || event.targets.length !== 1) continue;
        const key = event.targets[0];
        const id = key.startsWith('w:') ? key.slice(2) : lessonWords.get(key);
        if (id) seen[id] = true;
      }
      return seen;
    }

    function storedMistakes() {
      try {
        const stored = host.db().knowledge.drafts[queueKey]?.text;
        const rows = JSON.parse(stored || '[]');
        if (!Array.isArray(rows)) return new Map();
        return new Map(rows.filter(row => {
          const item = row && bank.questions.get(row.id);
          if (!item || !Number.isInteger(row.frame) || !item.frames[row.frame] || typeof row.choice !== 'string') return false;
          if (row.mode === 'typed') {
            return bank.canType(item) && bank.typedWord(row.choice) === row.choice && !bank.matches(item,row.choice);
          }
          return Object.hasOwn(item.wrong,row.choice);
        }).slice(-32).map(row => [row.id,row]));
      } catch {
        return new Map();
      }
    }

    function saveMistakes(mistakes) {
      const keys = [...mistakes.values()].slice(-32);
      window.HAN_KNOWLEDGE.saveDraft(host.db().knowledge,queueKey,JSON.stringify(keys),[],false);
      host.save();
    }

    function setup(requestedTopic = '') {
      entryTopic = articles.byId.has(requestedTopic) ? requestedTopic : '';
      topic = entryTopic;
      showSetup();
    }

    function showSetup() {
      run = null;
      const options = articles.articles.map(article => '<option value="' + esc(article.id) + '"'
        + (article.id === topic ? ' selected' : '') + '>' + esc(article.title) + '</option>').join('');
      const count = storedMistakes().size;
      mount(top('') + '<header class="cloze-intro"><h1>Điền từ theo ngữ cảnh</h1>'
        + '<p>Mỗi lượt xen câu từ bài đọc với từ bạn từng ôn. Giữ tay hoặc bôi đen chữ Hán trong câu để tra ngay.</p></header>'
        + '<div class="cloze-setup"><fieldset class="cloze-mode"><legend>Cách trả lời</legend><div>'
        + [['choice','Chọn đáp án'],['typed','Tự gõ chữ Hán']].map(([value,label]) => '<label><input type="radio" '
          + 'name="cloze-mode" value="' + value + '"' + (value === mode ? ' checked' : '') + '><span>' + label + '</span></label>').join('')
        + '</div></fieldset><label for="cloze-topic">Bài muốn lấy từ</label><select id="cloze-topic">'
        + '<option value="">Trộn các bài đọc</option>' + options + '</select>'
        + '<p id="cloze-setup-mix"></p><div class="cloze-actions">'
        + '<button type="button" class="btn primary" id="cloze-start">Bắt đầu 6 câu</button>'
        + (count ? '<button type="button" class="btn" id="cloze-saved">' + replayLabel(count) + '</button>' : '')
        + '</div></div>');
      const field = $('#cloze-topic');
      let planned = [];
      const update = () => {
        topic = field.value;
        mode = $('input[name="cloze-mode"]:checked').value;
        planned = bank.plan(topic,reviewedWords(),mode);
        const remembered = planned.filter(card => card.source === 'learned').length;
        $('#cloze-setup-mix').textContent = remembered
          ? 'Lượt này có ' + remembered + ' từ đã ôn trên thiết bị.'
          : 'Chưa có từ đã ôn phù hợp cho lượt này. Bạn sẽ chơi với từ bài đọc và từ nền.';
      };
      field.onchange = update;
      document.querySelectorAll('input[name="cloze-mode"]').forEach(input => input.onchange = update);
      update();
      $('#cloze-start').onclick = () => launch(planned.map(card => ({...card,mode})),false);
      if (count) $('#cloze-saved').onclick = () => retry();
    }

    function launch(cards,isReview,resume = null) {
      if (!cards.length) { showSetup(); return; }
      run = {cards,isReview,resume,index:0,score:0,missteps:new Set(),checked:false};
      question();
    }

    function reviewCard(row) {
      const item = bank.questions.get(row.id);
      return {item,frame:bank.nextFrame(item,row.frame),source:'review',mode:row.mode || 'choice'};
    }

    function retry(ids) {
      const rows = [...storedMistakes().values()].filter(row => !ids || ids.has(row.id));
      launch(rows.map(reviewCard),true);
    }

    function termCard(han,label) {
      const term = bank.phrase(han);
      const word = bank.catalogueWord(han);
      return '<div class="cloze-term"><p class="cloze-term-label">' + esc(label) + '</p><div class="cloze-term-head">'
        + (word ? '<button type="button" class="text-btn" data-detail="' + esc(han) + '">' + termName(han) + '</button>'
          : '<strong>' + termName(han) + '</strong>')
        + '<span class="py">' + esc(term.py) + '</span>' + host.audio(han) + '</div><p>'
        + esc(term.gloss || term.meaning) + '</p></div>';
    }

    function question() {
      const current = run.cards[run.index];
      const {item,frame,source} = current;
      const {line,scene} = item.frames[frame];
      const [prefix,suffix] = line.split(bank.blank);
      const typed = current.mode === 'typed';
      const caption = run.resume ? 'Thử lại ở câu khác' : run.isReview ? 'Ôn câu đã sai' : 'Điền từ theo ngữ cảnh';
      mount(top('<span>' + (run.index+1) + ' / ' + run.cards.length + '</span>')
        + '<div class="cloze-round" data-cloze-item="' + esc(item.id) + '" data-cloze-frame="' + frame
        + '" data-cloze-source="' + esc(source) + '" data-cloze-mode="' + current.mode
        + '"><h1 id="cloze-question" tabindex="-1">' + caption + '</h1>'
        + '<progress value="' + (run.index+1) + '" max="' + run.cards.length + '" aria-label="Vị trí trong lượt"></progress>'
        + (run.isReview && item.frames.length === 1 ? '<p class="tiny muted">Thử lại từ trong cùng câu.</p>' : '')
        + '<p class="cloze-scene">' + esc(scene) + '</p>'
        + '<p class="cloze-line" lang="zh-CN" data-study-text>' + esc(prefix) + '<span class="cloze-slot" id="cloze-slot">'
        + '<span class="sr-only" lang="vi">Chỗ trống</span></span>' + esc(suffix) + '</p>'
        + (typed ? '<form id="cloze-type" class="cloze-type"><label for="cloze-input">Gõ từ vào chỗ trống</label>'
          + '<div><input type="text" id="cloze-input" lang="zh-CN" autocomplete="off" autocapitalize="off" autocorrect="off" '
          + 'spellcheck="false" enterkeyhint="done" maxlength="32" aria-describedby="cloze-input-help cloze-input-status">'
          + '<button type="submit" class="btn primary">Kiểm tra</button></div>'
          + '<p id="cloze-input-help">Dùng bàn phím tiếng Trung để gõ pinyin rồi chọn chữ Hán.</p>'
          + '<p id="cloze-input-status" role="status"></p></form>'
          : '<fieldset class="cloze-choices"><legend class="sr-only">Chọn từ điền vào chỗ trống</legend>'
          + shuffle([item.answer,...Object.keys(item.wrong)]).map(han => '<button type="button" lang="zh-CN" data-cloze-choice="'
            + esc(han) + '">' + esc(han) + '</button>').join('') + '</fieldset>')
        + '<div id="cloze-feedback"></div></div>');
      if (typed) bindTyped(current);
      else document.querySelectorAll('[data-cloze-choice]').forEach(button => {
        button.onclick = () => grade(current,button.dataset.clozeChoice);
      });
      $('#cloze-question').focus({preventScroll:true});
    }

    function bindTyped(current) {
      const form = $('#cloze-type');
      const input = $('#cloze-input');
      const status = $('#cloze-input-status');
      let composing = false;
      input.addEventListener('compositionstart',() => { composing = true; });
      input.addEventListener('compositionend',() => { composing = false; });
      input.addEventListener('keydown',event => {
        if (event.key === 'Enter' && (event.isComposing || composing || event.keyCode === 229)) event.preventDefault();
      });
      input.addEventListener('input',() => {
        status.textContent = '';
        input.removeAttribute('aria-invalid');
      });
      form.onsubmit = event => {
        event.preventDefault();
        if (composing) return;
        const answer = bank.typedWord(input.value);
        if (!answer) {
          input.setAttribute('aria-invalid','true');
          status.textContent = input.value.trim() ? 'Hãy chọn chữ Hán sau khi gõ pinyin.' : 'Hãy điền chữ Hán trước khi kiểm tra.';
          input.focus();
          return;
        }
        grade(current,answer);
      };
    }

    function grade(current,entered) {
      if (!run || run.checked || current !== run.cards[run.index]) return;
      run.checked = true;
      const {item,frame,mode:answerMode} = current;
      const typed = answerMode === 'typed';
      const sample = item.frames[frame];
      const ok = typed ? bank.matches(item,entered) : entered === item.answer;
      const choice = typed ? bank.canonical(entered) : entered;
      const saved = storedMistakes();
      const mistake = {id:item.id,choice:entered,frame,mode:answerMode};
      if (ok) {
        run.score++;
        if (run.isReview && saved.delete(item.id)) saveMistakes(saved);
      } else {
        run.missteps.add(item.id);
        saved.delete(item.id);
        saved.set(item.id,mistake);
        saveMistakes(saved);
      }
      host.record(bank.catalogueWord(item.answer),bank.catalogueWord(choice),ok,run.isReview,answerMode);
      const slot = $('#cloze-slot');
      slot.textContent = entered;
      slot.dataset.state = ok ? 'correct' : 'wrong';
      if (typed) $('#cloze-type').querySelectorAll('input,button').forEach(field => { field.disabled = true; });
      document.querySelectorAll('[data-cloze-choice]').forEach(button => {
        button.disabled = true;
        if (button.dataset.clozeChoice === item.answer) button.dataset.state = 'correct';
        else if (button.dataset.clozeChoice === choice) button.dataset.state = 'wrong';
      });
      const sentence = sample.line.replace(bank.blank,item.answer);
      const readTopic = item.topics.includes(topic) ? topic : item.topics[0];
      const sourceHref = sample.source || (readTopic ? '#read/' + readTopic + '/vi-du' : '');
      const feedback = $('#cloze-feedback');
      const fullSentence = '<span id="cloze-complete-han" data-study-text data-study-vi="' + esc(sample.vi)
        + '" data-study-py="' + esc(sample.py || '') + '" lang="zh-CN">' + esc(sentence) + '</span>';
      feedback.innerHTML = '<div class="cloze-answer" data-result="' + (ok ? 'correct' : 'wrong') + '">'
        + '<h2 id="cloze-answer-title" tabindex="-1">' + (ok ? 'Đúng trong ngữ cảnh này'
          : (typed ? 'Từ đang luyện là ' : 'Từ hợp ở đây là ') + termName(item.answer)) + '</h2>'
        + (ok ? '' : '<p class="cloze-why-wrong">Bạn ' + (typed ? 'gõ ' : 'chọn ') + termName(entered) + '. '
          + esc(bank.explain(item,sample,choice)) + '</p>')
        + '<p class="cloze-reason">' + esc(sample.why) + '</p><div class="cloze-complete-line">'
        + fullSentence + host.audio(sentence) + '<button type="button" class="text-btn study-open" '
        + 'data-study-open="cloze-complete-han">Tra câu</button></div>'
        + (sample.py ? '<p class="py">' + esc(sample.py) + '</p>' : '')
        + '<p class="cloze-translation">' + esc(sample.vi) + '</p>'
        + '<details class="cloze-terms"><summary>' + (ok ? 'Xem từ vừa điền' : 'Ôn lại từ vừa nhầm') + '</summary>'
        + termCard(item.answer,'Từ cần dùng') + (!ok && bank.phrase(choice) ? termCard(choice,typed ? 'Từ bạn đã gõ' : 'Từ bạn đã chọn') : '')
        + (sourceHref ? '<a class="cloze-origin" href="' + esc(sourceHref) + '">Xem bài đọc liên quan ↗</a>' : '')
        + '</details>'
        + '<div class="cloze-actions">' + (typed && !ok ? '<button type="button" class="btn primary" id="cloze-try-again">Thử từ này ở câu khác</button>' : '')
        + '<button type="button" class="btn' + (typed && !ok ? '' : ' primary') + '" id="cloze-next">'
        + (run.resume ? 'Tiếp tục lượt đang chơi' : run.index+1 === run.cards.length ? 'Xem kết quả' : 'Câu tiếp theo') + ' →</button></div></div>';
      if (typed && !ok) $('#cloze-try-again').onclick = () => launch([reviewCard(mistake)],true,run.resume || run);
      $('#cloze-next').onclick = advance;
      $('#cloze-answer-title').focus();
    }

    function advance() {
      if (!run?.checked) return;
      if (run.resume) run = run.resume;
      run.checked = false;
      run.index++;
      if (run.index < run.cards.length) question();
      else showResult();
    }

    function showResult() {
      const {score,cards,isReview,missteps} = run;
      if (!isReview) host.finish(score,cards.length);
      const fromStudy = cards.filter(card => card.source === 'learned').length;
      const fromReading = cards.filter(card => card.source === 'reading').length;
      const fromPractice = cards.filter(card => card.source === 'practice').length;
      const counts = [[fromReading,'câu từ bài đọc'],[fromStudy,'câu từ đã ôn'],[fromPractice,'câu từ nền']]
        .filter(([count]) => count).map(([count,label]) => count + ' ' + label);
      const saved = storedMistakes();
      const pending = [...missteps].filter(id => saved.has(id)).map(id => bank.questions.get(id).answer);
      mount(top(navToSetup) + '<header class="cloze-intro"><h1 tabindex="-1" id="cloze-result">'
        + (isReview ? 'Kết quả lượt ôn lại' : 'Kết quả điền từ') + '</h1><p class="cloze-score"><strong>'
        + score + ' / ' + cards.length + '</strong> câu đúng</p>'
        + (counts.length ? '<p>' + esc(counts.join(' · ')) + '</p>' : '')
        + '</header>' + (pending.length ? '<div class="cloze-pending"><h2>Từ cần xem lại</h2><p lang="zh-CN">'
          + pending.map(esc).join('　') + '</p></div>' : '')
        + '<div class="cloze-actions">' + (pending.length ? '<button type="button" class="btn primary" id="cloze-retry">'
          + replayLabel(pending.length) + '</button>' : '')
        + '<button type="button" class="btn' + (pending.length ? '' : ' primary') + '" id="cloze-restart">Chơi lượt mới</button>'
        + '</div>');
      if (pending.length) $('#cloze-retry').onclick = () => retry(missteps);
      $('#cloze-restart').onclick = () => launch(bank.plan(topic,reviewedWords(),mode).map(card => ({...card,mode})),false);
      $('#cloze-exit').onclick = showSetup;
      $('#cloze-result').focus();
    }

    return {setup,cancel(){ run = null; }};
  };
})();
