(() => {
  'use strict';

  const articles = [];
  const byId = new Map();
  const byLegacy = new Map();
  const featured = 'tot-nghiep';

  function add(entries) {
    for (const entry of entries) {
      if (!/^[a-z][a-z0-9-]+$/.test(entry.id) || byId.has(entry.id)) {
        throw new Error('Invalid or duplicate deep reading: ' + entry.id);
      }
      articles.push(entry);
      byId.set(entry.id, entry);
      const legacy = entry.legacyHref?.match(/^#essay\/([^/]+)$/)?.[1];
      if (legacy) byLegacy.set(legacy,entry);
    }
  }

  function linkedWords(article, catalogue) {
    return [...new Set(article.connections.map(item => catalogue.get(item.han)).filter(Boolean))];
  }

  window.HAN_DEEP_READING_DATA = {articles, byId, byLegacy, featured, add, linkedWords};
})();
