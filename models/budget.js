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

function getTotalBudgetByDepartment(departmentID) {
    return new Promise((resolve, reject) => {
      const query =
        `SELECT SUM(salary) AS 'Total Department Budget'
        FROM employee
        LEFT JOIN role ON employee.role_id=role.id
        WHERE role.department_id = ?`;
      mysql.query(query, [departmentID], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]['Total Department Budget']);
        }
      });
    });
}
  

  module.exports = {
    getTotalBudget,
    getTotalBudgetByDepartment
  };  