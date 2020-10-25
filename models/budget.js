const mysql = require("../db/dbconnect");


function getTotalBudget() {
    return new Promise((resolve, reject) => {
      const query = `SELECT SUM(salary) AS 'Total Budget' FROM role, employee WHERE employee.role_id=role.id`;
      mysql.query(query, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]['Total Budget']);
        }
      });
    });
  }

  module.exports = {
    getTotalBudget
  };  