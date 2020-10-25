const mysql = require("../db/dbconnect");

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
    const query = "SELECT * FROM employee";
    mysql.query(query, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        const employees = [];
        for (const employee of results) {
          const firstName = employee["first_name"];
          const lastName = employee["last_name"];
          employees.push(`${firstName} ${lastName}`);
        }
        resolve(employees);
      }
    });
  });
};

const getEmployeeID = employeeName => {
    if (employeeName === 'None') {
      return null;
    }
    return new Promise((resolve, reject) => {
      const firstName = employeeName.split(' ')[0];
      const lastName = employeeName.split(' ')[1];
      let query = 'SELECT id FROM employee WHERE first_name= ? AND last_name= ?';
      mysql.query(query, [firstName, lastName], (err, results, fields) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(results[0].id);
        }
      });
    });
  };

const getManagerByID = (managerID) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM employee WHERE id = ?";
    mysql.query(query, [managerID], (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        const manager = `${results[0]["first_name"]} ${results[0]["last_name"]}`;
        resolve(manager);
      }
    });
  });
};

const getAllEmployeesByDepartment = (departmentID) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT employee.id AS 'ID', 
          first_name AS 'First Name', 
          last_name AS 'Last Name'
        FROM employee
        WHERE employee.role_id = ANY (SELECT role.id FROM role WHERE role.department_id = ?)
        ORDER BY employee.id ASC`;
    mysql.query(query, [departmentID], (err, results, fields) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const getAllEmployeesByManager = managerID => {
    return new Promise((resolve, reject) => {
      const query = `SELECT id AS 'ID', 
          first_name AS 'First Name', 
          last_name AS 'Last Name'
        FROM employee WHERE employee.manager_id = ? 
        ORDER BY employee.first_name ASC`;
      mysql.query(query, [managerID], (err, results, fields) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

const getAllManagers = () => {
    return new Promise((resolve, reject) => {
      const query =
        'SELECT * FROM employee, employee manager WHERE employee.manager_id = manager.id';
      mysql.query(query, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          const managers = [];
          for (const manager of results) {
            const firstName = manager['first_name'];
            const lastName = manager['last_name'];
            managers.push(`${firstName} ${lastName}`);
          }
          resolve(managers);
        }
      });
    });
  };  

module.exports = {
  getAllEmployees,
  getEmployeeID,
  getAllEmployeesDetails,
  getManagerByID,
  getAllEmployeesByDepartment,
  getAllEmployeesByManager,
  getAllManagers
};
