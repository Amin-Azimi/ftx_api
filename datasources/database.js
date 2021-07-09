var mysql = require('mysql2');
var conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'wordpress_user',      // Replace with your database username
  password: 'azi1234@',      // Replace with your database password
  database: 'football_sport_statics' // // Replace with your database Name
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;

