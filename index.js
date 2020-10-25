const inquirer = require("inquirer");
const db = require("./db/database");
const displayBanner = require('./utils/banner');
const {
    displayAllEmployees,
    displayAllEmployeesByDepartment,
    displayAllEmployeesByManager,
    addEmployee,
    removeEmployee,
    updateEmployeeManager,
    updateEmployeeRole
  } = require('./controllers/employee');
  const { 
      displayAllRoles, 
      addRole
    } = require('./controllers/role');
  const { displayAllDepartments } = require('./controllers/department');

async function Init() {
    db.setupDB();
    await displayBanner();
    await promptUser();
}

async function promptUser() {
    const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an option?',
          choices: [
            'View All Employees',
            'View All Employees by Department',
            'View All Employees by Manager',
            'View All Roles',
            'View All Departments',
            'Add Employee',
            'Remove Employee',
            'Update Employee Manager',
            'Update Employee Role',
            'Add Department',
            'Remove Department',
            'Add Role',
            'Remove Role',
            'View Total Budget',
            'View Total Department Budget',
            'Exit'
          ],
          loop: false,
        }
      ]);
      
    switch (answer.action.toLowerCase()) {
        case "view all employees":
            await displayAllEmployees();
            promptUser();
            break;
        case "view all employees by department":
            await displayAllEmployeesByDepartment();
            promptUser();
            break;
        case "view all employees by manager":
            await displayAllEmployeesByManager();
            promptUser();
            break;
        case "view all roles":
            await displayAllRoles();
            promptUser();
            break;
        case "view all departments":
            await displayAllDepartments();
            promptUser();
            break;
        case "add employee":
            await addEmployee();
            promptUser();
            break;
        case "remove employee":
            await removeEmployee();
            promptUser();
            break;
        case "update employee manager":
            await updateEmployeeManager();
            promptUser();
            break;
        case "update employee role":
            await updateEmployeeRole();
            promptUser();
            break;
        case "update employee department":
            console.log("update employee department");
            break;
        case "add department":
            console.log("add department");
            break;
        case "remove department":
            console.log("remove department");
            break;
        case "add role":
            await addRole();
            promptUser();
            break;
        case "remove role":
            console.log("remove role");
            break;
        case "view total budget":
            console.log("view total budget");
            break;
        case "view total department budget":
            console.log("view total department budget");
            break;
        case "exit":
            console.log("Have a nice day!");
            db.dropAndEnd();
            return process.exit(0);
        default:
            break;
    }            

}

Init();
