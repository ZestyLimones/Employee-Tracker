const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 30001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.myPassword,
    database: employee_db,
  },
  console.log('COnnected to employee_db database!')
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
