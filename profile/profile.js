const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'bloodbanksystem.mysql.database.azure.com',
  user: 'root1',
  port: '3306',
  password: '123456789Me',
  database: 'bloodbanksystem'
});

router.post('/', (req, res) => {
  const { id } = req.query;

  const loginQuery = `SELECT bb_humanos.*, bb_humangender.BB_HumanGender
                      FROM bb_humanos
                      INNER JOIN bb_humangender ON bb_humanos.HumanGender = bb_humangender.BB_HumanGenderID
                      WHERE HumanID = ?`;

  connection.query(loginQuery, [id], (err, rows) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).send({ message: 'Internal Server Error' });
      return;
    }

    if (rows.length > 0) {
      const userInfo = {
        id: rows[0].HumanID,
        name: rows[0].HumanName,
        email: rows[0].BB_HumanEmail,
        phone: rows[0].BB_HumanPhone,
        gender: rows[0].BB_HumanGender
      };
      res.status(200).json({
        message: 'User Data',
        user: userInfo
      });
    } else {
      console.log('Invalid ID');
      res.status(400).send({ message: 'Invalid ID' });
    }
  });
});

module.exports = router;
