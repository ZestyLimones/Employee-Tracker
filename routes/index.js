const app = require('express').Router();
const db = require('../config/connection');

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

app.post('/api/add_department', ({ body }, res) => {
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
  const sql = `SELECT role.id, role.title, role.salary, role.department_id FROM role LEFT JOIN department ON role.department_id = department.id;`;

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

app.post('/api/add_role', ({ body }, res) => {
  const sql = `INSERT INTO role SET ?`;

  db.query(sql, body, (err, result) => {
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
  const sql = `SELECT employee.id, employee.first_name AS "first name", employee.last_name AS "last name", employee.role_id AS "role id", employee.manager_id AS "manager id" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager on manager.id = employee.manager_id`;

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

app.post('/api/add_employee', ({ body }, res) => {
  const sql = `INSERT INTO employee SET ?`;

  db.query(sql, body, (err, result) => {
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

module.exports = app;
