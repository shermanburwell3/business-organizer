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
        console.log(answers.selection);
        switch (answers.selection) {
            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update an Employee Record":
                updateEmployee();
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

    console.log("vd");

}

// View roles function
function viewRoles() {

    console.log("vr");

}

// View employees function
function viewEmployees() {

    console.log("ve");

}

//Add department function
function addDepartment() {

    console.log("ad");

}

// Add role function
function addRole() {

    console.log("ar");

}

// Add employee function
function addEmployee() {

    console.log("ae");

}

// Update employee function
function updateEmployee() {

    console.log("ue");

}

// Exit function
function Exit() {
    return;
}

Start();