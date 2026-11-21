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
          return item && item.frames[row.frame] && Object.hasOwn(item.wrong,row.choice);
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
        + '<p>Đọc tình huống rồi chạm từ muốn điền. Mỗi lượt xen câu từ bài đọc với từ bạn từng ôn.</p></header>'
        + '<div class="cloze-setup"><label for="cloze-topic">Bài muốn lấy từ</label><select id="cloze-topic">'
        + '<option value="">Trộn các bài đọc</option>' + options + '</select>'
        + '<p id="cloze-setup-mix"></p><div class="cloze-actions">'
        + '<button type="button" class="btn primary" id="cloze-start">Bắt đầu 6 câu</button>'
        + (count ? '<button type="button" class="btn" id="cloze-saved">' + replayLabel(count) + '</button>' : '')
        + '</div></div>');
      const field = $('#cloze-topic');
      let planned = [];
      const update = () => {
        topic = field.value;
        planned = bank.plan(topic,reviewedWords());
        const remembered = planned.filter(card => card.source === 'learned').length;
        $('#cloze-setup-mix').textContent = remembered
          ? 'Lượt này có ' + remembered + ' từ đã ôn trên thiết bị.'
          : 'Chưa có từ đã ôn phù hợp cho lượt này. Bạn sẽ chơi với từ bài đọc và từ nền.';
      };
      field.onchange = update;
      update();
      $('#cloze-start').onclick = () => launch(planned,false);
      if (count) $('#cloze-saved').onclick = () => retry();
    }

    function launch(cards,isReview) {
      if (!cards.length) { showSetup(); return; }
      run = {cards,isReview,index:0,score:0,missteps:new Set(),checked:false};
      question();
    }

    function retry(ids) {
      const rows = [...storedMistakes().values()].filter(row => !ids || ids.has(row.id));
      launch(rows.map(row => {
        const item = bank.questions.get(row.id);
        return {item,frame:bank.nextFrame(item,row.frame),source:'review'};
      }),true);
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
      const choices = shuffle([item.answer,...Object.keys(item.wrong)]);
      const caption = run.isReview ? 'Ôn câu đã sai' : 'Điền từ theo ngữ cảnh';
      mount(top('<span>' + (run.index+1) + ' / ' + run.cards.length + '</span>')
        + '<div class="cloze-round" data-cloze-item="' + esc(item.id) + '" data-cloze-frame="' + frame
        + '" data-cloze-source="' + esc(source) + '"><h1 id="cloze-question" tabindex="-1">' + caption + '</h1>'
        + '<progress value="' + (run.index+1) + '" max="' + run.cards.length + '" aria-label="Vị trí trong lượt"></progress>'
        + (run.isReview && item.frames.length === 1 ? '<p class="tiny muted">Thử lại từ trong cùng câu.</p>' : '')
        + '<p class="cloze-scene">' + esc(scene) + '</p>'
        + '<p class="cloze-line" lang="zh-CN">' + esc(prefix) + '<span class="cloze-slot" id="cloze-slot">'
        + '<span class="sr-only" lang="vi">Chỗ trống</span></span>' + esc(suffix) + '</p>'
        + '<fieldset class="cloze-choices"><legend class="sr-only">Chọn từ điền vào chỗ trống</legend>'
        + choices.map(han => '<button type="button" lang="zh-CN" data-cloze-choice="' + esc(han) + '">'
          + esc(han) + '</button>').join('') + '</fieldset><div id="cloze-feedback"></div></div>');
      document.querySelectorAll('[data-cloze-choice]').forEach(button => {
        button.onclick = () => grade(current,button.dataset.clozeChoice);
      });
      $('#cloze-question').focus({preventScroll:true});
    }

    function grade(current,choice) {
      if (!run || run.checked || current !== run.cards[run.index]) return;
      run.checked = true;
      const {item,frame} = current;
      const sample = item.frames[frame];
      const ok = choice === item.answer;
      const saved = storedMistakes();
      if (ok) {
        run.score++;
        if (run.isReview && saved.delete(item.id)) saveMistakes(saved);
      } else {
        run.missteps.add(item.id);
        saved.delete(item.id);
        saved.set(item.id,{id:item.id,choice,frame});
        saveMistakes(saved);
      }
      host.record(bank.catalogueWord(item.answer),bank.catalogueWord(choice),ok,run.isReview);
      const slot = $('#cloze-slot');
      slot.textContent = choice;
      slot.dataset.state = ok ? 'correct' : 'wrong';
      document.querySelectorAll('[data-cloze-choice]').forEach(button => {
        button.disabled = true;
        if (button.dataset.clozeChoice === item.answer) button.dataset.state = 'correct';
        else if (button.dataset.clozeChoice === choice) button.dataset.state = 'wrong';
      });
      const sentence = sample.line.replace(bank.blank,item.answer);
      const readTopic = item.topics.includes(topic) ? topic : item.topics[0];
      const sourceHref = sample.source || (readTopic ? '#read/' + readTopic + '/vi-du' : '');
      const feedback = $('#cloze-feedback');
      feedback.innerHTML = '<div class="cloze-answer" data-result="' + (ok ? 'correct' : 'wrong') + '">'
        + '<h2 id="cloze-answer-title" tabindex="-1">' + (ok ? 'Đúng trong ngữ cảnh này' : 'Từ hợp ở đây là ' + termName(item.answer)) + '</h2>'
        + (ok ? '' : '<p class="cloze-why-wrong">Bạn chọn ' + termName(choice) + '. '
          + esc(bank.explain(item,sample,choice)) + '</p>')
        + '<p class="cloze-reason">' + esc(sample.why) + '</p><div class="cloze-complete-line">'
        + termName(sentence) + host.audio(sentence) + '</div>'
        + (sample.py ? '<p class="py">' + esc(sample.py) + '</p>' : '')
        + '<p class="cloze-translation">' + esc(sample.vi) + '</p>'
        + '<details class="cloze-terms"><summary>' + (ok ? 'Xem từ vừa điền' : 'Ôn lại từ vừa nhầm') + '</summary>'
        + termCard(item.answer,'Từ cần dùng') + (ok ? '' : termCard(choice,'Từ bạn đã chọn'))
        + (sourceHref ? '<a class="cloze-origin" href="' + esc(sourceHref) + '">Xem bài đọc liên quan ↗</a>' : '')
        + '</details>'
        + '<div class="cloze-actions"><button type="button" class="btn primary" id="cloze-next">'
        + (run.index+1 === run.cards.length ? 'Xem kết quả' : 'Câu tiếp theo') + ' →</button></div></div>';
      $('#cloze-next').onclick = advance;
      $('#cloze-answer-title').focus();
    }

    function advance() {
      if (!run?.checked) return;
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
      const pending = [...missteps].map(id => bank.questions.get(id).answer);
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
      $('#cloze-restart').onclick = () => launch(bank.plan(topic,reviewedWords()),false);
      $('#cloze-exit').onclick = showSetup;
      $('#cloze-result').focus();
    }

    return {setup,cancel(){ run = null; }};
  };
})();
