const inquirer = require('inquirer');
const {
    getTotalBudget
  } = require('../models/budget');
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

  module.exports = {
    displayTotalBudget
  };  