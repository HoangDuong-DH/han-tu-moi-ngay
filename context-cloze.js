(() => {
  'use strict';

  const blank = '＿';
  const hanWord = /^[\p{Script=Han}]{1,12}$/u;
  const foldPinyin = value => value.toLowerCase().normalize('NFD').replace(/\p{M}/gu,'');
  const withBlank = (line,offset,length) => line.slice(0,offset) + blank + line.slice(offset+length);
  const authored = window.HAN_CLOZE_DATA.entries;
  const extensions = window.HAN_CLOZE_DATA.terms;

  window.createHanClozeBank = ({words,readings,shuffle}) => {
    const catalogue = new Map(words.map(word => [word.han,word]));
    const coreDistractors = ['朋友','水','工作','今天','去','书','大','看','前边','钱','老师','手机']
      .map(han => catalogue.get(han)).filter(Boolean);
    const terms = new Map(Object.entries(extensions).map(([han,[py,meaning]]) => [han,{han,py,meaning}]));
    const seenFrames = new Map();

    function addFrame(han,frame) {
      if (!seenFrames.has(han)) seenFrames.set(han,[]);
      const list = seenFrames.get(han);
      if (!list.some(item => item.line === frame.line)) list.push(frame);
    }

    for (const reader of readings.filter(item => ['hsk','foundation'].includes(item.group))) {
      for (const line of reader.lines) {
        if (!line.vn || !line.han || line.han.length > 75) continue;
        let offset = 0;
        for (const token of line.tokens) {
          const han = token.han;
          const start = offset;
          offset += han.length;
          if (!hanWord.test(han) || token.missing || !catalogue.has(han) || !token.meaning) continue;
          if (line.tokens.filter(item => item.han === han).length !== 1) continue;
          const chunk = line.chunks.find(item => item.text === han)
            || line.chunks.find(item => item.text.includes(han));
          addFrame(han,{
            line:withBlank(line.han,start,han.length), scene:'Diễn đạt đúng ý “' + line.vn.replace(/[.。]$/u,'') + '”.',
            vi:line.vn, py:line.py, sense:token.meaning,
            why:token.note || chunk?.why || line.explain,
            source:'#readings/' + reader.id
          });
        }
      }
    }

    function extraFrames(word) {
      for (const study of word.usageStudies || []) {
        for (const [han,py,vi] of study.examples || []) {
          const start = han.indexOf(word.han);
          if (!vi || !py || start < 0 || han.lastIndexOf(word.han) !== start || han.length > 75) continue;
          if (word.han.length === 1) {
            const syllables = new Set(foldPinyin(py).split(/[^\p{L}ü]+/u));
            if (!word.py.split('/').some(sound => syllables.has(foldPinyin(sound.trim())))) continue;
          }
          addFrame(word.han,{
            line:withBlank(han,start,word.han.length),scene:'Diễn đạt đúng ý “' + vi.replace(/[.。]$/u,'') + '”.',
            vi,py,sense:word.gloss || word.meaning,why:study.usage
          });
        }
      }
      return seenFrames.get(word.han) || [];
    }

    const studyCases = new Map();
    for (const word of catalogue.values()) {
      if (word.extra || !hanWord.test(word.han)) continue;
      const frames = extraFrames(word).filter(frame => frame.why).slice(0,4);
      if (!frames.length) continue;
      const salt = word.han.codePointAt(0) % coreDistractors.length;
      const options = [...coreDistractors.slice(salt),...coreDistractors.slice(0,salt)]
        .filter(other => other.id !== word.id && other.category !== word.category
          && (other.gloss || other.meaning) !== (word.gloss || word.meaning)
          && !frames.some(frame => frame.line.includes(other.han))).slice(0,3);
      if (options.length !== 3) continue;
      studyCases.set(word.han,{
        id:'study-' + word.id.toLowerCase(),answer:word.han,topics:[],frames,
        wrong:Object.fromEntries(options.map(other => [other.han,null]))
      });
    }

    const questions = new Map([...authored,...studyCases.values()].map(item => [item.id,item]));
    const phrase = han => terms.has(han)
      ? {...terms.get(han),word:catalogue.get(han)}
      : catalogue.get(han);
    const catalogueWord = han => catalogue.get(han);
    const support = authored.filter(item => !item.topics.length);

    function plan(topic,introduced) {
      const isKnown = item => {
        const word = catalogueWord(item.answer);
        return word && !!introduced[word.id];
      };
      const selected = new Set();
      const result = [];
      const reading = shuffle(authored.filter(item => item.topics.length &&
        (!topic || item.topics.includes(topic))));
      // Prefer hand-edited contrasts for old words, then examples already in the study materials.
      const earlier = [...shuffle(authored.filter(isKnown)),...shuffle([...studyCases.values()].filter(isKnown))
        .sort((left,right) => Number(right.frames.length > 1) - Number(left.frames.length > 1))];
      const reserved = earlier[0]?.answer;
      function take(pool,source,limit) {
        for (const item of pool) {
          if (result.length >= 6 || limit <= 0) break;
          if (selected.has(item.answer)) continue;
          selected.add(item.answer);
          result.push({item,source,frame:shuffle(item.frames.map((_,index) => index))[0]});
          limit--;
        }
      }
      take(reading.filter(item => item.answer !== reserved),'reading',3);
      take(earlier,'learned',6);
      take(reading,'reading',3);
      take(shuffle(support),'practice',6);
      return shuffle(result);
    }

    function nextFrame(item,previous) {
      return (previous+1) % item.frames.length;
    }

    function explain(item,frame,choice) {
      const authoredReason = item.wrong[choice];
      if (authoredReason) return authoredReason;
      const other = phrase(choice);
      return 'Ở câu này, ' + item.answer + ' mang nghĩa “' + (frame.sense || phrase(item.answer).meaning)
        + '”. ' + choice + ' có nghĩa “' + (other.gloss || other.meaning)
        + '”, nên sẽ đổi ý mà câu cần diễn đạt.';
    }

    return {plan,nextFrame,explain,phrase,questions,blank,catalogueWord};
  };
})();
