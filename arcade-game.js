(() => {
  'use strict';

  const levels = [1,2,3];
  const huntSizes = [2,3,4];
  const gloss = word => word.gloss || word.meaning;
  const labelKey = label => label.normalize('NFC').trim().toLowerCase().replace(/\s+/g,' ');
  const sentence = (frame,tiles = frame.tiles) => (frame.prefix || '') + tiles.join('') + (frame.suffix || '。');
  const listKey = list => list.join('\u0001');

  function solutionIndex(frame,tiles) {
    const order = listKey(tiles);
    return [frame.tiles,...(frame.alternatives || [])].findIndex(candidate => order === listKey(candidate));
  }
  const accepts = (frame,tiles) => solutionIndex(frame,tiles) >= 0;

  function nextClue(frame,tiles) {
    const answers = [frame.tiles,...(frame.alternatives || [])];
    for (let limit = tiles.length; limit >= 0; limit--) {
      const prefix = listKey(tiles.slice(0,limit));
      const compatible = answers.find(order => listKey(order.slice(0,limit)) === prefix);
      if (compatible) return {tile:compatible[limit],position:limit+1};
    }
    return null;
  }

  function createScore() {
    return {points:0,streak:0,peak:0,clean:0,hints:1};
  }

  function award(score,clean) {
    score.streak = clean ? score.streak + 1 : 0;
    score.peak = Math.max(score.peak,score.streak);
    const points = clean ? 100 + Math.min(score.streak-1,4) * 20 : 40;
    score.points += points;
    if (clean) score.clean++;
    const earned = clean && score.streak % 3 === 0 && score.hints < 2;
    if (earned) score.hints++;
    return {points,earned};
  }

  function uniqueLabels(word,stage) {
    return stage.every(card => labelKey(card.word.py) !== labelKey(word.py)
      && labelKey(gloss(card.word)) !== labelKey(gloss(word)));
  }

  function createDeck({words,readings,linkedWords,cases,shuffle}) {
    const regular = words.filter(word => !word.extra && word.han && word.py && gloss(word));
    const byId = new Map(regular.map(word => [word.id,word]));
    const byHan = new Map(regular.map(word => [word.han,word]));
    const articles = readings.map(article => ({article,words:linkedWords(article,byHan)}));
    const themes = new Map(articles.map(({article,words}) => [article.id,words]));
    const articleWords = [...new Map(articles.flatMap(({words}) => words.map(word => [word.id,word]))).values()];
    const byCase = new Map(cases.map(item => [item.id,item]));

    function hunt(topic,known) {
      const fromTopic = shuffle(themes.get(topic) || articleWords);
      const learned = shuffle(regular.filter(word => known[word.id]));
      const all = shuffle(regular);
      const used = new Set();
      return huntSizes.map(size => {
        const stage = [];
        function take(words,source,count) {
          for (const word of words) {
            if (!count || stage.length === size) return;
            if (used.has(word.id) || !uniqueLabels(word,stage)) continue;
            stage.push({word,source});
            used.add(word.id);
            count--;
          }
        }
        take(learned,'learned',1);
        take(fromTopic,'reading',topic ? 2 : 1);
        take(learned,'learned',size);
        take(all,'practice',size);
        return stage;
      });
    }

    function huntReplay(rows) {
      const groups = [];
      for (const {id} of rows) {
        const word = byId.get(id);
        if (!word) continue;
        let group = groups.find(stage => stage.length < 4 && uniqueLabels(word,stage));
        if (!group) {
          group = [];
          groups.push(group);
        }
        group.push({word,source:'review'});
      }
      for (const group of groups) {
        if (group.length !== 1) continue;
        const extra = shuffle(regular).find(word => uniqueLabels(word,group));
        if (extra) group.push({word:extra,source:'practice'});
      }
      return groups;
    }

    function build(topic,known) {
      const warmup = shuffle(cases);
      return levels.map(level => {
        const pool = warmup.filter(item => item.level === level);
        const chosen = [];
        const themed = pool.find(item => topic && item.topics.includes(topic));
        if (themed) chosen.push(themed);
        const familiar = pool.find(item => known[byHan.get(item.target)?.id] && !chosen.includes(item));
        if (familiar) chosen.push(familiar);
        for (const item of pool) {
          if (chosen.length === 2) break;
          if (!chosen.includes(item)) chosen.push(item);
        }
        return chosen.map(item => ({item,frameIndex:shuffle([0,1])[0],word:byHan.get(item.target)}));
      });
    }

    function buildReplay(rows) {
      return rows.flatMap(({id,frameIndex}) => {
        const item = byCase.get(id);
        return item ? [[{item,frameIndex:frameIndex === 0 ? 1 : 0,word:byHan.get(item.target)}]] : [];
      });
    }

    return {hunt,huntReplay,build,buildReplay,byId,byCase};
  }

  window.HAN_ARCADE = {gloss,sentence,solutionIndex,accepts,nextClue,createScore,award,createDeck};
})();
