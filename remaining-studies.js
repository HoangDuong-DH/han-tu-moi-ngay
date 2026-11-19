(() => {
 'use strict';
 const rows=[];
 window.HAN_REMAINING_STUDIES={rows,register(items){
  for(const r of items){const [han,usage,formation,contrast,bridge,a,b]=r,w=window.HAN_DATA.words.find(w=>w.han===han);if(!w)throw Error('Unknown catalogue form '+han);if(window.HAN_STUDIES.has(han))throw Error('Study already exists '+han);
   const sourceChars={佥:'僉',喿:'喿',巠:'巠',囚:'囚'},links=sourceChars[han]?[['CUHK · '+sourceChars[han],'https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word='+encodeURIComponent(sourceChars[han])]]:[];
   const study={han,usage,formation,contrast,bridge,examples:[a,b],links,article:'',key:'catalogue-study:'+w.id,lesson:null};
   rows.push(study);w.usageStudies=[study];w.studyExamples=[a,b];window.HAN_STUDIES.set(han,{lead:usage,body:[formation,contrast,bridge],links,article:''});
  }
 }};
})();
