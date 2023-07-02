const express = require('express');
const router = express.Router();
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

    const {
        PhoneNumber,
        HumanName,
        TransTypeId,
        HumanID,
        BirthDate,
        UnitNumber,
        BloodType,
        Notes,
        DonationDate,
        BranchName,
    } = req.query;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const TransDate = `${year}-${month}-${day}`;
    const Accepted = 0;

    let insertQuery, values;
    // Create a new Transaction record in the database
    if (TransTypeId === 2) {
        const BranchNo = 1;
        insertQuery = 'INSERT INTO bb_transactions (TransDate, HumanName, PhoneNumber, HumanID, Notes, BirthDate, UnitNumber, BloodType, Accepted, BranchNo, TransTypeId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        values = [TransDate, HumanName, PhoneNumber, HumanID, Notes, BirthDate, UnitNumber, BloodType, Accepted, BranchNo, TransTypeId];
        connection.query(insertQuery, values, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error creating Transaction' });
            }
            res.status(201).json({ message: 'Transaction created successfully' });
        });
    } else {

        const selectQuery = 'SELECT DISTINCT\n' +
            'bb_branches.BranchNo\n' +
            'FROM\n' +
            'bb_branches\n' +
            'WHERE\n' +
            'bb_branches.BranchName = ?';
        connection.query(selectQuery, BranchName, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error creating Transaction' });
            }
            const Unitnumber = 1;
            const BranchNo = result[0].BranchNo;
            insertQuery = 'INSERT INTO bb_transactions (TransDate, HumanName, PhoneNumber, HumanID, Notes, BirthDate, UnitNumber, BloodType, Accepted, BranchNo, TransTypeId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            values = [DonationDate, HumanName, PhoneNumber, HumanID, Notes, BirthDate, Unitnumber, BloodType, Accepted, BranchNo, TransTypeId];
            connection.query(insertQuery, values, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Error creating Transaction' });
                }
                const selectQuery = 'SELECT DISTINCT\n' +
                    'bb_humanos.FirstDonation,\n' +
                    'bb_humanos.LastDonation\n' +
                    'FROM\n' +
                    'bb_humanos\n' +
                    'WHERE\n' +
                    'bb_humanos.HumanID = ?'
                connection.query(selectQuery, HumanID, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: 'Error creating Transaction' });
                    } else {
                        if (!result.FirstDonation) {
                            const updateQuery = 'UPDATE bb_humanos SET FirstDonation = ? WHERE HumanID = ?';
                            values = [DonationDate, HumanID];
                            connection.query(updateQuery, values, (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json({ message: 'Error creating Transaction' });
                                }
                                res.status(201).json({ message: 'Transaction created successfully' });
                            });
                        } else {
                            const updateQuery = 'UPDATE bb_humanos SET LastDonation = ? WHERE HumanID = ?';
                            values = [DonationDate, HumanID];
                            connection.query(updateQuery, values, (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json({ message: 'Error creating Transaction' });
                                }
                                res.status(201).json({ message: 'Transaction created successfully' });
                            });
                        }
                    }
                });
            });
        });

    }
});


module.exports = router;
