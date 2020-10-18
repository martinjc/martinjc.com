const fs = require('fs');

const bibtexParse = require('bibtex-parser-js');

fs.readFile('src/_data/pubs.bib', 'utf-8', function(err, content) {
    let combined_data = {}
    let json_data = bibtexParse.toJSON(content);
    let types = [... new Set(json_data.map(p => p.entryType))];
    types.forEach(t => {
        combined_data[t] = [];
    })
    json_data.forEach(p => {
        combined_data[p.entryType].push(p);
    });
    types.forEach(t => {
        combined_data[t] = combined_data[t].sort((a, b) => {
            return +a.entryTags.YEAR - +b.entryTags.YEAR;
        });
    })
    fs.writeFile('src/_data/pubs.json', JSON.stringify(combined_data), 'utf8', function(err, success) {
        return;
    });
});
