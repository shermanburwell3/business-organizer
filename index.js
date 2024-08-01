const inq = require('inquirer');
const {Pool} = require('pg');

//TODO: Add start funtion, bringing user to main menu

function Start() {
    inq.createPromptModule({
        type: "list",
        message: "Please choose an option",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "Add a Department",
            "Add a role",
            "Add an Employee",
            "Update an Employee Record",
            "Exit"
        ]
    })
}


//TODO: Add view departments function



//TODO: Add view roles function



//TODO: Add view employees function



//TODO: Add add department function



//TODO: Add add role function



//TODO: Add add employee function



//TODO: Add update employee function



//TODO: Add exit function