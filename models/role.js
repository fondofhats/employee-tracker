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
  
  const getAllTitles = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT id AS 'ID', title AS 'Title', salary AS 'Salary' FROM role";
      // Get the list of all titles
      const titles = [];
      mysql.query(query, (err, results, fields) => {
        if (err) reject(err);
  
        for (const role of results) {
          titles.push(role.Title);
        }
  
        resolve(titles);
      });
    });
  };  

  const getRoleID = (roleTitle) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT id FROM role WHERE title = ?";
      mysql.query(query, [roleTitle], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0].id);
        }
      });
    });
  };  

module.exports = {
    getAllRoles,
    getAllTitles,
    getRoleID
  };