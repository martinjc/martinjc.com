const fs = require('fs');

const bibtexParse = require('bibtex-parser-js');

fs.readFile('src/_data/pubs.bib', 'utf-8', function(err, content) {
    let json_data = bibtexParse.toJSON(content);
    fs.writeFile('src/_data/pubs.json', JSON.stringify(json_data), 'utf8', function(err, success) {
        return;
    });
});
