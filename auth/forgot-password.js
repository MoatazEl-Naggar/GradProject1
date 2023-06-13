const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const nodemailer = require('nodemailer');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'bloodbanksystem.mysql.database.azure.com',
  user: 'root1',
  port: '3306',
  password: '123456789Me',
  database: 'bloodbanksystem'
});

// Create a nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'zezooelnaggar@hotmail.com',
    pass: '$dc_>H5GSmx)G7T'
  }
});

// Endpoint for sending password reset email
router.post('/', (req, res) => {
  const { email } = req.query;

  // Check if the email exists in your database
  const checkQuery = 'SELECT * FROM bb_humanos WHERE BB_HumanEmail = ?';
  connection.query(checkQuery, [email], (err, rows) => {
    if (err) {
      console.error('Error executing database query:', err);
      res.status(500).send({message: 'Internal Server Error'});
      return;
    }

    if (rows.length === 0) {
      // Email not found in the database
      res.status(404).send({message: 'Email not found'});
      return;
    }

    // Generate a random password reset code
    const code = generateRandomCode();

  // Create the email message
  const mailOptions = {
    from: 'zezooelnaggar@hotmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Your password reset code is: ${code}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send({message: 'Internal Server Error'});
    } else {
      console.log('Password reset code sent');
      res.status(200).send({message: 'Password reset code sent'});
      }
  	});
  });
});


module.exports = router;
