const express = require('express');
const logo = require('asciiart-logo');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.myPassword,
    database: 'employee_db',
  },
  console.log(`Connected to the employee_db database.`)
);

app.get('/api/departments', (req, res) => {
  const sql = `SELECT id, name AS "department name" FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Here are the departments:',
      data: rows,
    });
  });
});

app.post('/api/add-department', ({ body }, res) => {
  const sql = `INSERT INTO department (name) VALUE (?)`;
  const params = [body.name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Successfully added department!',
      data: body,
    });
  });
});

app.get('/api/roles', (req, res) => {
  const sql = `SELECT id, title, salary, department_id AS "department id" FROM role`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Here are the roles:',
      data: rows,
    });
  });
});

app.post('/api/add-role', ({ body }, res) => {
  const sql = `INSERT INTO role (title, salary, department_id) VALUE (?)`;
  const params = JSON.parse([body.title, body.salary, body.department_id]);

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Successfully added role!',
      data: body,
    });
  });
});

app.get('/api/employees', (req, res) => {
  const sql = `SELECT id, first_name AS "first name", last_name AS "last name", role_id AS "role id", manager_id AS "manager id" FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Here are the employees:',
      data: rows,
    });
  });
});

app.post('/api/add-employee', ({ body }, res) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`;
  const params = [
    body.first_name,
    body.last_name,
    body.role_id,
    body.manager_id,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Successfully added employee!',
      data: body,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//inquirer
