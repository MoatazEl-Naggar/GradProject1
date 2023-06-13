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
  const { email, password } = req.query;

  const loginQuery = `SELECT bb_humanos.*, bb_humangender.BB_HumanGender
		      FROM bb_humanos
		      INNER JOIN bb_humangender ON bb_humanos.HumanGender = bb_humangender.BB_HumanGenderID
		      WHERE BB_HumanEmail = ?`;
  connection.query(loginQuery, [email], (err, rows) => {
    if (err) {
      throw err;
	    res.status(401).send({message: 'user not found'});
    }

    if (rows.length > 0) {
      const storedPassword = rows[0].HumanPassword;

      bcrypt.compare(password, storedPassword, (err, result) => {
        if (err) {
          throw err;
		     res.status(400).send({message: 'Invalid email or password'});
        }

        if (result) {
          console.log('User logged in successfully');
          const userInfo = {
            id: rows[0].HumanID,
            name: rows[0].HumanName,
            email: rows[0].BB_HumanEmail,
            phone: rows[0].BB_HumanPhone,
            gender: rows[0].BB_HumanGender
          };
          res.status(200).json({
            message: 'User logged in successfully',
            user: userInfo
          });
        } else {
          console.log('Invalid email or password');
          res.status(400).send({message: 'Invalid email or password'});
        }
      });
    } else {
      console.log('Invalid email or password');
      res.status(400).send({message: 'Invalid email or password'});
    }
  });
});


module.exports = router;
