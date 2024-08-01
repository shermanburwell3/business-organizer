const inq = require('inquirer');
const {Pool} = require('pg');

// Start function, bringing user to main menu


function Start() {
    const prompt = inq.createPromptModule();
        
     prompt({
        type: "list",
        message: "Please choose an option",
        name: "selection",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Record",
            "Exit"
        ]
    }).then((answers) => {
        console.log(answers.mainMenuSelection);
        switch (answers.selection) {
            case "View Departments":

                break;
            case "View Roles":

                break;
            case "View Employees":

                break;
            case "Add a Department":

                break;
            case "Add a Role":

                break;
            case "Add an Employee":

                break;
            case "Update an Employee Record":

                break;
            case "Exit":
                Exit();
            break;
            default:
                break;
        }
        
    });
}

// View departments function
function viewDepartments() {



}

// View roles function
function viewRoles() {



}

// View employees function
function viewEmployees() {



}

//Add department function
function addDepartment() {



}

// Add role function
function addRole() {



}

// Add employee function
function addEmployee() {



}

// Update employee function
function updateEmployee() {



}

// Exit function
function Exit() {
    return;
}

Start();