(() => {
  'use strict';

  const articles = [];
  const byId = new Map();
  const featured = 'tot-nghiep';

  function add(entries) {
    for (const entry of entries) {
      if (!/^[a-z][a-z0-9-]+$/.test(entry.id) || byId.has(entry.id)) {
        throw new Error('Invalid or duplicate deep reading: ' + entry.id);
      }
      articles.push(entry);
      byId.set(entry.id, entry);
    }
  }

  window.HAN_DEEP_READING_DATA = {articles, byId, featured, add};
})();
