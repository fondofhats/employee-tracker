const mysql = require('../db/dbconnect');


const getAllEmployeesDetails = () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT employee.id AS 'ID', 
          first_name AS 'First Name', 
          last_name AS 'Last Name', 
          role.title AS 'Title', 
          department.name AS 'Department', 
          role.salary AS 'Salary', 
          manager_id
        FROM employee, role, department
        WHERE employee.role_id = role.id
          AND role.department_id = department.id
        ORDER BY employee.id ASC`;
  
      mysql.query(query, (err, results, fields) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

const getAllEmployees = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM employee';
      mysql.query(query, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          const employees = [];
          for (const employee of results) {
            const firstName = employee['first_name'];
            const lastName = employee['last_name'];
            employees.push(`${firstName} ${lastName}`);
          }
          resolve(employees);
        }
      });
    });
  };
  const getManagerByID = managerID => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM employee WHERE id = ?';
      mysql.query(query, [managerID], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          const manager = `${results[0]['first_name']} ${results[0]['last_name']}`;
          resolve(manager);
        }
      });
    });
  };

  module.exports = {
    getAllEmployees,
    getAllEmployeesDetails,
    getManagerByID
  };