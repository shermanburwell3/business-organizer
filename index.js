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
    console.log("Connected to company database!")
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
            "Update an Employee Role"
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
            case "Update an Employee Role":
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

    pool.query(`SELECT role.id, role.title, role.salary, department.name AS department_name
                FROM role
                INNER JOIN department ON role.department_id = department.id`, function (err, {rows}) {
        if (err) {
            console.log(err);
        }

        if (rows.length === 0) {
            console.log("No roles found.");
        } else {
            const table = new Table({
                head: ['Role ID', 'Title', 'Salary', 'Department Name'],
                colWidths: [10, 30, 15, 30]
            });

            rows.forEach(row => {
                table.push([row.id, row.title, row.salary, row.department_name]);
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

    pool.query(`SELECT e.id, e.first_name, e.last_name, r.title AS role_title, r.salary, d.name AS department_name, 
                CONCAT(m.first_name, ' ', m.last_name) AS manager_name
                FROM employee e
                INNER JOIN role r ON e.role_id = r.id
                INNER JOIN department d ON r.department_id = d.id
                LEFT JOIN employee m ON e.manager_id = m.id`, function (err, {rows}) {
        if (err) {
            console.log(err);
        }

        if (rows.length === 0) {
            console.log("No employees found.");
        } else {
            const table = new Table({
                head: ['Employee ID', 'First Name', 'Last Name', 'Role Title', 'Salary', 'Department', 'Manager'],
                colWidths: [15, 20, 20, 30, 15, 20, 30]
            });

            rows.forEach(row => {
                table.push([row.id, row.first_name, row.last_name, row.role_title, row.salary, row.department_name, row.manager_name]);
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
              Start();
        })
    });
}

// Add role function
function addRole() {
    console.log("Adding a new role...\n");

    pool.query(`SELECT id, name FROM department`, function (err, {rows}) {
        if (err) {
            console.log(err);
        }

        const departmentChoices = rows.map(row => ({
            name: row.name,
            value: row.id
        }));

        const prompt = inq.createPromptModule();

        prompt([
            {
                type: "input",
                message: "Enter the title of the new role",
                name: "newRoleTitle",
            },
            {
                type: "input",
                message: "Enter the salary for the new role",
                name: "newRoleSalary",
            },
            {
                type: "list",
                message: "Select the department for the new role",
                name: "newRoleDepartmentId",
                choices: departmentChoices
            }
        ]).then(function (answers) {
            pool.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`, [answers.newRoleTitle, answers.newRoleSalary, answers.newRoleDepartmentId], function (err, {rows}) {
                if (err) {
                    console.log(err);
                }
                console.log(`${answers.newRoleTitle} has been added as a new role!`);
                Start();
            });
        });
    });
}

// Add employee function
function addEmployee() {
    console.log("Adding a new employee...\n");

    pool.query(`SELECT id, title FROM role`, function (err, {rows: roleRows}) {
        if (err) {
            console.log(err);
        }

        const roleChoices = roleRows.map(row => ({
            name: row.title,
            value: row.id
        }));

        pool.query(`SELECT id, first_name, last_name FROM employee`, function (err, {rows: employeeRows}) {
            if (err) {
                console.log(err);
            }

            const employeeChoices = employeeRows.map(row => ({
                name: `${row.first_name} ${row.last_name}`,
                value: row.id
            }));

            const prompt = inq.createPromptModule();

            prompt([
                {
                    type: "input",
                    message: "Enter the employee's first name",
                    name: "firstName",
                },
                {
                    type: "input",
                    message: "Enter the employee's last name",
                    name: "lastName",
                },
                {
                    type: "list",
                    message: "Select the employee's role",
                    name: "roleId",
                    choices: roleChoices
                },
                {
                    type: "list",
                    message: "Select the employee's manager (if applicable)",
                    name: "managerId",
                    choices: [...employeeChoices, { name: "None", value: null }]
                }
            ]).then(function (answers) {
                pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [answers.firstName, answers.lastName, answers.roleId, answers.managerId], function (err, {rows}) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`${answers.firstName} ${answers.lastName} has been added as a new employee!`);
                    Start();
                });
            });
        });
    });
}

// Update employee function
function updateEmployee() {
    console.log("Updating an employee...\n");

    pool.query(`SELECT id, title FROM role`, function (err, {rows}) {
        if (err) {
            console.log(err);
        }

        const roleChoices = rows.map(row => ({
            name: row.title,
            value: row.id
        }));

        const prompt = inq.createPromptModule();

        prompt([
            {
                type: "input",
                message: "Enter the ID of the employee you want to update",
                name: "employeeId",
            },
            {
                type: "list",
                message: "Select the new role for the employee",
                name: "newRoleId",
                choices: roleChoices
            }
        ]).then(function (answers) {
            pool.query(`UPDATE employee SET role_id = $1 WHERE id = $2`, [answers.newRoleId, answers.employeeId], function (err, {rows}) {
                if (err) {
                    console.log(err);
                }
                console.log(`Employee with ID ${answers.employeeId} has been updated with a new role.`);
                Start();
            });
        });
    });
}

pool.connect();
Start();