const fs = require('fs');
const path = require('path');
const bibtexParse = require('bibtex-parser-js');

module.exports = function () {
  const bibFile = path.join(__dirname, 'pubs.bib');
  if (!fs.existsSync(bibFile)) {
    return {};
  }

  const content = fs.readFileSync(bibFile, 'utf-8');
  const jsonData = bibtexParse.toJSON(content);
  const combinedData = {};

  const types = [...new Set(jsonData.map(p => p.entryType))];
  types.forEach(t => {
    combinedData[t] = [];
  });

  jsonData.forEach(p => {
    if (combinedData[p.entryType]) {
      combinedData[p.entryType].push(p);
    }
  });

  types.forEach(t => {
    combinedData[t].sort((a, b) => {
      const yearA = a.entryTags && a.entryTags.YEAR ? +a.entryTags.YEAR : 0;
      const yearB = b.entryTags && b.entryTags.YEAR ? +b.entryTags.YEAR : 0;
      return yearA - yearB;
    });
  });

  return combinedData;
};
