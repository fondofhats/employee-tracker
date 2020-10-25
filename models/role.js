const mysql = require("../db/dbconnect");


const getAllRoles = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT id AS 'ID', title AS 'Title', salary AS 'Salary' FROM role";
      mysql.query(query, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
  

module.exports = {
    getAllRoles
  }