const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/texts.sqlite');

module.exports = (function () {

    // if (process.env.NODE_ENV === 'test') {
    //     return new sqlite3.Database('./db/test.sqlite');
    // }

    return new sqlite3.Database('./db/texts.sqlite');
}());
