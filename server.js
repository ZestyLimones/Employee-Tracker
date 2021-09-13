const express = require('express');
const logo = require('asciiart-logo');
const mysql = require('mysql2');
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
      message: 'success!',
      data: rows,
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
      message: 'success!',
      data: rows,
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
      message: 'success!',
      data: rows,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
