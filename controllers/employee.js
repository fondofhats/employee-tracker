const inquirer = require('inquirer');
const cTable = require('console.table');
const {
    getAllEmployeesDetails,
    getManagerByID
  } = require('../models/employee');

  const { displayHeadline, displayFooter } = require('../utils/logging');

/**
 * @description   Retrieves and displays all employees
 */
async function displayAllEmployees() {
    try {
      const employees = await getAllEmployeesDetails();
      for (const employee of employees) {
        if (employee['manager_id'] !== null) {
            employee.Manager = await getManagerByID(employee['manager_id']);
          delete employee['manager_id'];
        } else {
          employee.Manager = 'None';
          delete employee['manager_id'];
        }
      }
     const footer = displayHeadline('All Employees');
      console.table(employees);
      displayFooter(footer);
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  }
  

module.exports = {
    displayAllEmployees
  };
  