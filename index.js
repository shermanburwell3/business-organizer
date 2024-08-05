const inq = require('inquirer');
const {Pool} = require('pg');

// Helps formatting the tables
const Table = require('cli-table');

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
            const table = new Table({
                head: ['Department ID', 'Department Name'],
                colWidths: [15, 30]
            });

            rows.forEach(row => {
                table.push([row.id, row.name]);
            });
            console.log('\n');
            console.log(table.toString());
        }

        Start();

    });
}

// View roles function
function viewRoles() {
    console.log("Viewing all roles...\n");

    pool.query(`SELECT * FROM role`, function (err, {rows}) {
        if (err) {
            console.log(err);
        }

        if (rows.length === 0) {
            console.log("No roles found.");
        } else {
            const table = new Table({
                head: ['Role ID', 'Title', 'Salary', 'Department ID'],
                colWidths: [10, 30, 15, 15]
            });

            rows.forEach(row => {
                table.push([row.id, row.title, row.salary, row.department_id]);
            });
            console.log('\n');
            console.log(table.toString());
        }

        Start();

    });
}

// View employees function
function viewEmployees() {
    console.log("Viewing all employees...\n");

    pool.query(`SELECT * FROM employee`, function (err, {rows}) {
        if (err) {
            console.log(err);
        }

        if (rows.length === 0) {
            console.log("No employees found.");
        } else {
            const table = new Table({
                head: ['Employee ID', 'First Name', 'Last Name', 'Role ID', 'Manager ID'],
                colWidths: [15, 20, 20, 15, 15]
            });

            rows.forEach(row => {
                const managerId = row.manager_id ? row.manager_id : "None";
                table.push([row.id, row.first_name, row.last_name, row.role_id, managerId]);
            });
            console.log('\n');
            console.log(table.toString());

        }
            Start();
    });
}

//Add department function
function addDepartment() {

    const prompt = inq.createPromptModule();

    prompt({
        type: "input",
        message: "Enter the name of the new department",
        name: "newDepartment",
    }).then(function (answer) {
        pool.query(`INSERT INTO department (name) VALUES ($1)`, [answer.newDepartment], function (err, {rows}) {
            if (err) {
                console.log(err);
              }
              console.log(`${answer.newDepartment} has been added!`);
        })
    });

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