const inquirer = require('inquirer');

const { 
  getAllDepartments,
  insertDepartment
 } = require("../models/department");
const { displayHeadline, displayFooter } = require("../utils/logging");

async function getAllDepartmentNames() {
  try {
    const departments = await getAllDepartments();

    let departmentNames = [];
    for (const department of departments) {
      departmentNames.push(department.Name);
    }

    return departmentNames;
  } catch (err) {
    if (err) throw err;
  }
}

async function displayAllDepartments() {
  try {
    const departments = await getAllDepartments();
    const footer = displayHeadline("All Departments");
    console.table(departments);
    displayFooter(footer);
  } catch (err) {
    if (err) throw err;
  }
}

async function addDepartment() {
  try {
    const department = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the new department you would like to add '
      }
    ]);

    await insertDepartment(department.name);
  } catch (err) {
    if (err) throw err;
  }
}


module.exports = {
  getAllDepartmentNames,
  displayAllDepartments,
  addDepartment
};
