(() => {
  'use strict';

  // The first item in each option list is the answer. Readings refer to the
  // sense illustrated by the example, especially for polyphonic characters.
  const rounds = [
    {
      han:'雹', anchors:'包抱饱跑雨雪', readings:['báo','bāo','bào','páo'],
      meanings:['Mưa đá','Tuyết','Sương','Mây'],
      clues:['雨 gợi hiện tượng thời tiết, như trong 下雨.','包 bāo gợi âm. So với 抱 bào và 饱 bǎo.'],
      why:'Theo Thuyết văn giải tự, 雨 gợi nghĩa và 包 gợi âm. 雹 giữ vần -ao của 包, nhưng đọc thanh 2. Muốn phân biệt mưa đá với tuyết, hãy nhớ từ 冰雹.',
      sentence:'下冰雹了。', gap:'下冰___了。', translation:'Trời đổ mưa đá rồi.',
    },
    {
      han:'苞', anchors:'包抱饱跑花菜', readings:['bāo','bǎo','pāo','báo'],
      meanings:['Nụ hoa','Rễ cây','Thân cây','Quả chín'],
      clues:['艹 gợi cây cỏ, như trong 花 và 菜.','包 bāo gợi âm. Bạn đã gặp chữ này trong 面包.'],
      why:'艹 gợi nghĩa và 包 gợi âm. Ở đây 苞 đọc giống 包. Nghĩa “nụ hoa” hiện rõ trong 花苞.',
      sentence:'花苞还没开。', gap:'花___还没开。', translation:'Nụ hoa vẫn chưa nở.',
    },
    {
      han:'洗', anchors:'水游泳先先生', readings:['xǐ','xiān','qǐ','shǐ'],
      meanings:['Rửa','Lau khô','Cắt','Đun sôi'],
      clues:['氵 là dạng của 水 ở bên trái, như trong 泳.','先 xiān là chữ đầu của 先生 và là thành phần gợi âm theo Thuyết văn.'],
      why:'氵 dẫn bạn về nghĩa liên quan đến nước. Trong chữ hiện nay, 先 cho manh mối về âm x-, còn 洗 có vần và thanh riêng. Đọc cả 洗手 để ghi nhớ.',
      sentence:'我先洗手。', gap:'我先___手。', translation:'Tôi rửa tay trước.',
    },
    {
      han:'棋', anchors:'木本校其其实', readings:['qí','jī','qǐ','jì'],
      meanings:['Cờ, trò chơi dùng quân cờ','Tờ giấy','Quyển sách','Bức tranh'],
      clues:['木 gợi cây hoặc gỗ, như trong chữ 校.','其 qí là chữ đầu của 其实 và là thành phần gợi âm.'],
      why:'其 gợi đúng âm qí. 木 là thành phần chỉ nghĩa trong cấu tạo chữ. Khi nói về trò chơi, hãy học cả cụm 下棋, nghĩa là chơi cờ.',
      sentence:'你会下棋吗？', gap:'你会下___吗？', translation:'Bạn biết chơi cờ không?',
    },
    {
      han:'拍', anchors:'手打白白天抱', readings:['pāi','bái','pái','bāi'],
      meanings:['Vỗ, đập nhẹ','Kéo','Đẩy','Buộc'],
      clues:['扌 gợi động tác bằng tay, như trong 打.','白 bái trong 白天 gợi âm trong dạng 拍.'],
      why:'扌 gợi động tác bằng tay, còn 白 gợi âm. 拍 giữ vần -ai nhưng đổi sang p- bật hơi và thanh 1. Trong 拍照, 拍 mang nghĩa chụp ảnh.',
      sentence:'我们一起拍照吧。', gap:'我们一起___照吧。', translation:'Chúng ta chụp ảnh cùng nhau nhé.',
    },
    {
      han:'猜', anchors:'青请狗', readings:['cāi','qīng','cái','chāi'],
      meanings:['Đoán','Chạy đuổi','Kêu lên','Chờ đợi'],
      clues:['犭 là dạng của 犬 bên trái, bạn đã gặp trong 狗.','青 qīng, cũng gặp trong 请, là thành phần gợi âm của 猜.'],
      why:'犭 thuộc cấu tạo lịch sử của chữ. Nghĩa hiện nay “đoán” khó suy ra từ phần này. 青 cũng chỉ cho manh mối lịch sử, vì 猜 hiện đọc cāi. Đây là một trường hợp nên nhớ qua câu.',
      sentence:'你猜我是谁？', gap:'你___我是谁？', translation:'Bạn đoán xem tôi là ai?',
    },
    {
      han:'惜', anchors:'心想可', readings:['xī','xǐ','xì','shī'],
      meanings:['Tiếc, biết quý','Giận dữ','Sợ hãi','Vui mừng'],
      clues:['忄 là dạng của 心 bên trái và có thể gợi cảm xúc.','昔 xī gợi âm. Có thể thấy nó ở bên phải của 惜.'],
      why:'忄 gợi nghĩa thuộc cảm xúc. 昔 gợi âm xī và trùng cách đọc với 惜. Cụm 可惜 dùng khi thấy tiếc vì một chuyện.',
      sentence:'真可惜！', gap:'真可___！', translation:'Tiếc thật!',
    },
    {
      han:'蚂', sourceHan:'螞', anchors:'马吗妈虫', readingContext:'Đoán cách đọc của chữ trong 蚂蚁.',
      readings:['mǎ','méi','mǐ','mò'],
      meanings:['Chữ dùng trong tên con kiến','Chữ dùng trong tên con bướm','Chữ dùng trong tên con ong','Chữ dùng trong tên con muỗi'],
      clues:['虫 gợi tên một loài côn trùng.','马 mǎ, cũng gặp trong 妈, là thành phần gợi âm.'],
      why:'虫 gợi nghĩa côn trùng, còn 马 gợi âm. Trong 蚂蚁, 蚂 đọc mǎ và cả từ nghĩa là “con kiến”. Chữ này có cách đọc khác trong từ khác.',
      sentence:'这儿有一只蚂蚁。', gap:'这儿有一只___蚁。', translation:'Ở đây có một con kiến.',
    },
  ];

  function shuffled(items, random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function deck(words, anchor, random = Math.random) {
    const known = new Set(words.flatMap(word => [...word.han]));
    const novel = rounds.filter(round => !known.has(round.han));
    const matches = novel.filter(round => [...anchor].some(han => round.anchors.includes(han)));
    const other = novel.filter(round => !matches.includes(round));
    return [...matches, ...shuffled(other, random)].slice(0, 5).map(round => ({
      ...round,
      readingOptions:shuffled(round.readings, random),
      meaningOptions:shuffled(round.meanings, random),
    }));
  }

  function mount(target, {cards, esc, audio, onExit}) {
    let index = 0;
    let result;
    let showSentence = false;
    const totals = {attempted:0, meaning:0, reading:0, skipped:0};
    const unknown = 'unknown';

    function choices(name, legend, options) {
      return '<fieldset class="character-guess-choices"><legend>' + legend + '</legend>' +
        options.map(value => '<label><input type="radio" name="' + name + '" value="' + esc(value) + '" required><span>' + esc(value) + '</span></label>').join('') +
        '<label><input type="radio" name="' + name + '" value="' + unknown + '" required><span>Chưa đoán được</span></label></fieldset>';
    }

    function feedback(label, choice, correct) {
      const verdict = choice === correct ? 'Đúng' : choice === unknown ? 'Chưa đoán' : 'Chưa đúng';
      const selected = choice !== unknown && choice !== correct ? ' · Bạn chọn ' + esc(choice) : '';
      return '<p><strong>' + label + ' · ' + verdict + '</strong><br>' + esc(correct) + selected + '</p>';
    }

    function render() {
      const round = cards[index];
      const back = '<button type="button" class="text-btn" data-guess-action="exit">← Về sơ đồ</button>';
      let body;
      if (!round) {
        body = '<h2 tabindex="-1" data-guess-focus>Kết quả lượt này</h2>' +
          '<div class="character-guess-results"><p><strong>' + totals.meaning + '/' + totals.attempted + '</strong><span>Đoán đúng nghĩa</span></p>' +
          '<p><strong>' + totals.reading + '/' + totals.attempted + '</strong><span>Đoán đúng cách đọc</span></p></div>' +
          (totals.skipped ? '<p>Đã biết và bỏ qua ' + totals.skipped + ' chữ.</p>' : '') +
          '<button type="button" class="btn primary" data-guess-action="restart">Chơi lại</button>';
      } else {
        const title = '<div class="character-guess-header"><p>Câu ' + (index + 1) + ' / ' + cards.length + '</p>' +
          '<h2 tabindex="-1" data-guess-focus>Đoán chữ <span lang="zh-CN">' + round.han + '</span></h2></div>';
        if (!result) {
          body = title + '<form class="character-guess-form">' +
            '<details class="character-guess-hints"><summary>Xem gợi ý</summary><ul>' +
            round.clues.map(clue => '<li>' + esc(clue) + '</li>').join('') + '</ul></details>' +
            (round.readingContext ? '<p class="character-graph-note">' + esc(round.readingContext) + '</p>' : '') +
            '<div class="character-guess-fields">' + choices('meaning','Nghĩa gần nhất',round.meaningOptions) +
            choices('reading','Cách đọc pinyin',round.readingOptions) + '</div>' +
            '<div class="chip-row"><button type="submit" class="btn primary">Kiểm tra cả hai</button>' +
            '<button type="button" class="text-btn" data-guess-action="skip">Đã biết chữ này</button></div></form>';
        } else {
          const source = 'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=' + encodeURIComponent(round.sourceHan || round.han);
          body = title + '<div class="character-guess-results">' + feedback('Nghĩa',result.meaning,round.meanings[0]) +
            feedback('Cách đọc',result.reading,round.readings[0]) + '</div><p>' + esc(round.why) + '</p>' +
            '<p class="character-graph-note"><a href="' + source + '" target="_blank" rel="noopener noreferrer">Nguồn cấu tạo chữ</a></p>' +
            '<div class="character-guess-transfer"><h3>Dùng trong câu</h3><p>' + esc(round.translation) + '</p>' +
            '<p class="character-guess-example" lang="zh-CN">' + esc(showSentence ? round.sentence : round.gap) +
            (showSentence ? ' ' + audio(round.sentence) : '') + '</p>' +
            (showSentence ? '<span tabindex="-1" data-guess-sentence class="sr-only">Đã hiện câu đầy đủ</span>' : '<button type="button" class="text-btn" data-guess-action="sentence">Hiện câu đầy đủ</button>') +
            '</div><button type="button" class="btn primary" data-guess-action="next">' +
            (index + 1 === cards.length ? 'Xem kết quả' : 'Chữ tiếp theo') + '</button>';
        }
      }
      target.innerHTML = '<section class="character-guess" aria-label="Đoán chữ chưa học">' + back + body + '</section>';
      target.querySelector('[data-guess-focus]').focus();
    }

    function next() {
      index++;
      result = null;
      showSentence = false;
      render();
    }

    function submit(event) {
      if (!event.target.matches('.character-guess-form')) return;
      event.preventDefault();
      const data = new FormData(event.target);
      const round = cards[index];
      result = {meaning:data.get('meaning'), reading:data.get('reading')};
      totals.attempted++;
      totals.meaning += Number(result.meaning === round.meanings[0]);
      totals.reading += Number(result.reading === round.readings[0]);
      render();
    }

    function click(event) {
      const button = event.target.closest('[data-guess-action]');
      if (!button || !target.contains(button)) return;
      switch (button.dataset.guessAction) {
        case 'exit':
          target.removeEventListener('click',click);
          target.removeEventListener('submit',submit);
          onExit();
          break;
        case 'next':
          next();
          break;
        case 'skip':
          totals.skipped++;
          next();
          break;
        case 'sentence':
          showSentence = true;
          render();
          target.querySelector('[data-guess-sentence]').focus();
          break;
        case 'restart':
          index = 0;
          result = null;
          showSentence = false;
          Object.assign(totals,{attempted:0, meaning:0, reading:0, skipped:0});
          render();
          break;
      }
    }

    target.addEventListener('submit',submit);
    target.addEventListener('click',click);
    render();
  }

  window.HAN_CHARACTER_GUESS = {deck, mount};
})();
