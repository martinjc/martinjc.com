const path = require('path');

module.exports = {
    entry: './app/js/main.js',
    output: {
        filename: 'tmp.js',
        path: path.resolve(__dirname, 'tmp/')
    }
}