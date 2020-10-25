const inquirer = require('inquirer');
const {
    getTotalBudget,
    getTotalBudgetByDepartment
  } = require('../models/budget');
  const { getDepartmentID } = require('../models/department');
  const { getAllDepartmentNames } = require('./department');  
const { 
    displayHeadline, 
    displayFooter,
    displayResults
} = require('../utils/logging');


async function displayTotalBudget() {
    try {
      let totalBudget = await getTotalBudget();
      totalBudget = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(totalBudget);
      const footer = displayHeadline(`Total Budget`);
      displayResults(`Total Budget: ${totalBudget}`);
      displayFooter(footer);
    } catch (err) {
      if (err) throw err;
    }
  }

  async function displayTotalDepartmentBudget() {
    try {
      const departmentNames = await getAllDepartmentNames();
  
      const department = await inquirer.prompt([
        {
          type: 'list',
          name: 'name',
          message: "Which department's budget would you like to see? ",
          choices: departmentNames
        }
      ]);
  
      const departmentID = await getDepartmentID(department.name);
  
      let totalDepartmentBudget = await getTotalBudgetByDepartment(departmentID);
  
      if (totalDepartmentBudget) {
        totalDepartmentBudget = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(totalDepartmentBudget);
      } else {
        totalDepartmentBudget = `$0.00`;
      }
      const footer = displayHeadline(`${department.name} Total Budget`);
      displayResults(`${department.name} Total Budget: ${totalDepartmentBudget}`);
      displayFooter(footer);
    } catch (err) {
      if (err) throw err;
    }
  }

  module.exports = {
    displayTotalBudget,
    displayTotalDepartmentBudget
  };  