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
  const { id, name, email, password, phone, gender } = req.query;

  // Hash the password using bcrypt
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
    }

    // Check if the user is already registered
    const checkQuery = `SELECT bb_humanos.*, bb_humangender.BB_HumanGender
			FROM bb_humanos
			INNER JOIN bb_humangender ON bb_humanos.HumanGender = bb_humangender.BB_HumanGenderID
			WHERE HumanID  = ? OR BB_HumanEmail = ?`;
           connection.query(checkQuery, [id, email], (err, rows) => {
      if (err) {
        throw err;
		res.status(401).send({message: 'Error'});
      }


      if (rows.length > 0) {
        // User is already registered
        console.log('User is already registered');
        res.status(400).send({message:'User is already registered'});
      } else {		
        // User is not registered, proceed with registration
        const insertQuery = 'INSERT INTO bb_humanos (HumanID, HumanName, BB_HumanEmail, HumanPassword, BB_HumanPhone, HumanGender) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [id, name, email, hashedPassword, phone, gender];

        connection.query(insertQuery, values, (err, result) => {
          if (err) {
            throw err;
			res.status(401).send({message: 'Something happened while inserting data!'});
          }

			const userInfo = {
            	id: id,
            	name: name,
           	 	email: email,
            	phone: phone
          };

          console.log('User registered successfully');
          res.status(200).send({ message: 'User registered successfully', userInfo });
        });
      }
    });
  });
});



module.exports = router;






