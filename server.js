const express = require('express');
const logo = require('asciiart-logo');
const axios = require('axios');
const inquirer = require('inquirer');
const dotenv = require('dotenv').config();
const routes = require('./routes');
const { prompt } = require('inquirer');

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
    inquirer.prompt(mainMenu);
  };

  inquirer.prompt(mainMenu).then((answer) => {
    switch (answer.main) {
      case 'View All Departments':
        axios.get('http://localhost:3001/api/departments').then((response) => {
          console.table(response.data.data);
        });

        break;
      case 'Add Department':
        prompt([
          {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'nameDepartment',
          },
        ]).then((newResponse) => {
          axios
            .post('http://localhost:3001/api/add_department', {
              name: newResponse.nameDepartment,
            })
            .then((response) => {
              //Need to change this
              console.table(response.data.data);
            });
        });

        break;
      case 'View All Roles':
        axios.get('http://localhost:3001/api/roles').then((response) => {
          console.table(response.data.data);
        });
        break;
      case 'Add Role':
        axios.post('http://localhost:3001/api/add_role').then((response) => {
          //Need to change this
          console.table(response.data.data);
        });
        break;
      case 'View All Employees':
        axios.get('http://localhost:3001/api/employees').then((response) => {
          console.table(response.data.data);
        });
        break;
      case 'Add Employee':
        axios
          .post('http://localhost:3001/api/add_employee')
          .then((response) => {
            //Need to change this
            console.table(response.data.data);
          });
        break;
      case 'Update Employee Role':
        axios
          .put('http://localhost:3001/api/update_employee')
          .then((response) => {
            //Need to change this
            console.table(response.data.data);
          });
        break;
    }
  });
});

//inquirer
// What would you like to do?
// - View Employees
// - Add Employees
// - - "who is the employee's manager?"
// - Update Employee Role
// - View All Roles
// - Add Role
// - View All Departments
// - Add Department
