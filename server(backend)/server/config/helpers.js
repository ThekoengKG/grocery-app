let Mysqli = require('mysqli');

let conn = new Mysqli({
  host: 'localhost', // IP/domain  
  post: 3306, //port, default 3306  
  user: 'root',
  passwd: '', // password
  charset: '',
  db: 'alke_organic_food', // the default database name  【optional】
  // multipleStatements: true
});

let db = conn.emit(false, '');

module.exports = { database: db}