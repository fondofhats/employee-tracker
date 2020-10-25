const inquirer = require("inquirer");
const db = require("./db/database");
const displayBanner = require('./utils/banner');
const {
    displayAllEmployees,
    displayAllEmployeesByDepartment
  } = require('./controllers/employee');

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
            console.log("view all employees by manager");
            break;
        case "view all roles":
            console.log("view all roles");
            break;
        case "view all departments":
            console.log("view all departments");
            break;
        case "add employee":
            console.log("add employee");
            break;
        case "remove employee":
            console.log("remove employee");
            break;
        case "update employee manager":
            console.log("update employee manager");
            break;
        case "update employee role":
            console.log("update employee role");
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
            console.log("add role");
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
