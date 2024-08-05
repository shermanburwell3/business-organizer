const inq = require('inquirer');
const {Pool} = require('pg');

// Connect to database
const pool = new Pool(
    {
        user: 'postgres',
        password: 'Time123',
        host: 'localhost',
        database: 'company_db'
    },
    console.log("Connected to comapny database!")
);

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
            "Update an Employee Record"
        ]
    }).then(function (answers) {
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
            default:
                break;
        }
        
    });
}

// View departments function
function viewDepartments() {
    console.log("Viewing all departments...\n");

    pool.query(`SELECT * FROM department`, function (err, {rows}) {
        if (err) {
            console.log(err);
        }

        if (rows.length === 0) {
            console.log("No departments found.");
        } else {
            console.log('\n');
            console.log("Department ID | Department Name");
            console.log("--------------------------------");
            rows.forEach(row => {
                console.log(`${row.id} | ${row.name}`);
            });
        }
    });
    Start();
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
    const prompt = inq.createPromptModule();

    prompt({
        type: "input",
        message: "Enter the name of the new department",
        name: "newwDepartment",
    }).then(function (answer) {
        // Add parameterized query here
    })

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

pool.connect();
Start();