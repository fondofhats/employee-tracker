const mysql = require('mysql2');

// Create the connection to database
const dbinit = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: 'toronto!20'
});

const initializedb = function () {
    dbinit.connect( function (err, result) {
    if (err) throw err;
    console.log("Connected!");

/*     dbinit.query('DROP DATABASE IF EXISTS employee_db', function(err, result) {
        if (err) throw err;
        console.log(result);
        console.log("Database Dropped!");
    }); */
  });
  dbinit.query('CREATE DATABASE IF NOT EXISTS employee_db', function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  console.log("Final DB Created");
};

module.exports = initializedb;