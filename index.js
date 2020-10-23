const inquirer = require('inquirer');
const db = require('./db/database');



async function Init(){
    db.setupDB();
}

Init();