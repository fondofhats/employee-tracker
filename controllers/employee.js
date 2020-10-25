const inquirer = require('inquirer');
const cTable = require('console.table');

const {
    getEmployeeID,
    getAllEmployees,
    getAllEmployeesDetails,
    getManagerByID,
    getAllEmployeesByDepartment,
    getAllEmployeesByManager,
    getAllManagers,
    insertEmployee
  } = require('../models/employee');
  const { getAllDepartmentNames } = require('./department');
  const { getDepartmentID } = require('../models/department');
  const { getAllTitles, getRoleID } = require('../models/role');
  const { displayHeadline, displayFooter } = require('../utils/logging');

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

  async function addEmployee() {
    // Get all titles from the role table
    const titles = await getAllTitles();
  
    // Get the list of employees from employee table
    const employees = await getAllEmployees();
    employees.unshift('None');
  
    try {
      const employee = await inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "What is the employee's first name? "
        },
        {
          type: 'input',
          name: 'lastName',
          message: "What is the employee's last name? "
        },
        {
          type: 'list',
          name: 'title',
          message: "What is employee's role? ",
          choices: titles
        },
        {
          type: 'list',
          name: 'manager',
          message: "Who is employee's manager ?",
          choices: employees
        }
      ]);
  
      employee.roleID = await getRoleID(employee.title);
      employee.managerID = await getEmployeeID(employee.manager);
  
      await insertEmployee(employee);
    } catch (err) {
      if (err) throw err;
    }
  }  

module.exports = {
    displayAllEmployees,
    displayAllEmployeesByDepartment,
    displayAllEmployeesByManager,
    addEmployee
  };
  