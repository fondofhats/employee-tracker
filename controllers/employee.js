const inquirer = require('inquirer');
const cTable = require('console.table');

const {
    getEmployeeID,
    getAllEmployeesDetails,
    getManagerByID,
    getAllEmployeesByDepartment,
    getAllEmployeesByManager,
    getAllManagers
  } = require('../models/employee');
  const { getAllDepartmentNames } = require('./department');
  const { getDepartmentID } = require('../models/department');
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
  
  /**
 * @description   Retrieves and displays all employees in a department
 */
async function displayAllEmployeesByDepartment() {
    try {
      const departmentNames = await getAllDepartmentNames();
  
      const department = await inquirer.prompt([
        {
          type: 'list',
          name: 'name',
          message: 'Please select a department ?',
          choices: departmentNames
        }
      ]);
  
      const departmentID = await getDepartmentID(department.name);
  
      const employees = await getAllEmployeesByDepartment(departmentID);
  
      const footer = displayHeadline(`All Employees in ${department.name}`);
      console.table(employees);
      displayFooter(footer);
    } catch (err) {
      if (err) throw err;
    }
  }

/**
 * @description   Retrieves and displays all employees under a manager
 */
async function displayAllEmployeesByManager() {
    try {
      const managers = await getAllManagers();
      const manager = await inquirer.prompt([
        {
          type: 'list',
          name: 'name',
          message: 'Please select a department ?',
          choices: managers
        }
      ]);
  
      const managerID = await getEmployeeID(manager.name);
  
      const employeesManaged = await getAllEmployeesByManager(managerID);
  
      const footer = displayHeadline(`All Employees under ${manager.name}`);
      console.table(employeesManaged);
      displayFooter(footer);
    } catch (err) {
      if (err) throw err;
    }
  }  

module.exports = {
    displayAllEmployees,
    displayAllEmployeesByDepartment,
    displayAllEmployeesByManager
  };
  