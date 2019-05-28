const path = require('path');

module.exports = {
    entry: '_assets/js/main.js',
    output: {
        filename: 'tmp.js',
        path: path.resolve(__dirname, 'tmp/')
    }
}