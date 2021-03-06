const express = require('express');
const logo = require('asciiart-logo');
const axios = require('axios');
const inquirer = require('inquirer');
const dotenv = require('dotenv').config();
const routes = require('./routes');
const { prompt } = require('inquirer');
const { response } = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  const mainMenu = [
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'main',
      choices: [
        'View All Departments',
        'Add Department',
        'View All Roles',
        'Add Role',
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
      ],
    },
  ];

  const mainPrompt = () => {
    inquirer.prompt(mainMenu).then((answer) => {
      switch (answer.main) {
        case 'View All Departments':
          axios
            .get('http://localhost:3001/api/departments')
            .then((response) => {
              console.table(response.data.data);
              mainPrompt();
            });

          break;
        case 'Add Department':
          prompt([
            {
              type: 'input',
              message: 'What is the name of the department?',
              name: 'newDepartment',
            },
          ]).then((newResponse) => {
            axios
              .post('http://localhost:3001/api/add_department', {
                name: newResponse.newDepartment,
              })
              .then(mainPrompt());
          });

          break;
        case 'View All Roles':
          axios.get('http://localhost:3001/api/roles').then((response) => {
            console.table(response.data.data);
            mainPrompt();
          });
          break;
        case 'Add Role':
          let departments = [];
          axios
            .get('http://localhost:3001/api/departments')
            .then((response) => {
              response.data.data.forEach((element) => {
                departments.push(element.id);
              });
            });
          prompt([
            {
              type: 'input',
              message: 'What is the name of the role?',
              name: 'newRole',
            },
            {
              type: 'input',
              message: 'What is salary for this role?',
              name: 'newSalary',
            },
            {
              type: 'list',
              message:
                'Which department would you like to assign to this role?',
              name: 'listDepartments',
              choices: departments,
            },
          ]).then((newResponse) => {
            axios
              .post('http://localhost:3001/api/add_role', {
                title: newResponse.newRole,
                salary: newResponse.newSalary,
                department_id: newResponse.listDepartments,
              })
              .then(mainPrompt());
          });
          break;
        case 'View All Employees':
          axios.get('http://localhost:3001/api/employees').then((response) => {
            console.table(response.data.data);
            mainPrompt();
          });
          break;
        case 'Add Employee':
          let roles = [];
          let managers = [];
          axios.get('http://localhost:3001/api/roles').then((response) => {
            response.data.data.forEach((element) => {
              roles.push(element.id);
            });
          });
          axios.get('http://localhost:3001/api/employees').then((response) => {
            response.data.data.forEach((element) => {
              if (element['manager id'] == null) {
                managers.push(element.id);
              }
            });
          });
          prompt([
            {
              type: 'input',
              message: "What is the employee's first name?",
              name: 'newFirstName',
            },
            {
              type: 'input',
              message: "What is the employee's last name?",
              name: 'newLastName',
            },
            {
              type: 'list',
              message: 'Which role would you like to assign to this employee?',
              name: 'listRoles',
              choices: roles,
            },
            {
              type: 'list',
              message: "Who is the employee's manager?",
              name: 'listManagers',
              choices: managers,
            },
          ]).then((newResponse) => {
            axios
              .post('http://localhost:3001/api/add_employee', {
                first_name: newResponse.newFirstName,
                last_name: newResponse.newLastName,
                role_id: newResponse.listRoles,
                manager_id: newResponse.listManagers,
              })
              .then(mainPrompt());
          });
          break;
        case 'Update Employee Role':
          let allEmpoyees = [];
          let allRoles = [];

          axios.get('http://localhost:3001/api/employees').then((response) => {
            response.data.data.forEach((element) => {
              allEmpoyees.push(element.id);
            });
          });
          axios.get('http://localhost:3001/api/roles').then((response) => {
            response.data.data.forEach((element) => {
              allRoles.push(element.id);
            });
            prompt([
              {
                type: 'list',
                message: 'Which employee would you like to update?',
                name: 'listAllEmployees',
                choices: allEmpoyees,
              },
              {
                type: 'list',
                message:
                  'Which role would you like to assign to this employee?',
                name: 'listAllRoles',
                choices: allEmpoyees,
              },
            ]).then((newResponse) => {
              axios
                .put('http://localhost:3001/api/update_employee', {
                  role_id: newResponse.listAllRoles,
                  id: newResponse.listAllEmployees,
                })
                .then(mainPrompt());
            });
          });

          break;
      }
    });
  };

  mainPrompt();
});
