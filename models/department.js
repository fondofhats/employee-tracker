const mysql = require("../db/dbconnect");

const getAllDepartments = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id AS 'ID', name AS 'Name' FROM department";
    mysql.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
const getDepartmentID = (departmentName) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id FROM department WHERE name = ?";
    mysql.query(query, [departmentName], (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].id);
      }
    });
  });
};

module.exports = {
  getDepartmentID,
  getAllDepartments,
};
