const inq = require('inquirer');
const {Pool} = require('pg');

//TODO: Add start funtion, bringing user to main menu


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



//TODO: Add view departments function



//TODO: Add view roles function



//TODO: Add view employees function



//TODO: Add add department function



//TODO: Add add role function



//TODO: Add add employee function



//TODO: Add update employee function



//TODO: Add exit function

function Exit() {
    return;
}

Start();