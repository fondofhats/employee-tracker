
const { getAllRoles } = require('../models/role');
const { displayHeadline, displayFooter } = require('../utils/logging');

async function displayAllRoles() {
    try {
      const roles = await getAllRoles();
      const footer = displayHeadline('All Roles');
      console.table(roles);
      displayFooter(footer);
    } catch (err) {
      if (err) throw err;
    }
  }

  module.exports = {
    displayAllRoles
  };
  