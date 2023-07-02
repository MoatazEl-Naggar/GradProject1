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
    const { HumanID, TransTypeId } = req.query;
    const getQuery = `SELECT
                    bb_transactions.TransId,
                    bb_branches.BranchName,
                    bb_transactions.TransDate,
                    bb_transactions.HumanName,
                    bb_transactions.PhoneNumber,
                    bb_transactions.TransTypeId,
                    bb_transactions.Accepted,
                    bb_transactions.HumanID,
                    bb_transactions.BirthDate,
                    bb_transactions.UnitNumber,
                    bb_transactions.BloodType,
                    bb_transactions.Notes
                    FROM
                    bb_transactions
                    INNER JOIN bb_branches ON bb_transactions.BranchNo = bb_branches.BranchNo
                    WHERE bb_transactions.HumanID = ? AND bb_transactions.TransTypeId = ?`;
    const values = [HumanID, TransTypeId];
    connection.query(getQuery, values, (err, result) => {
        if (result && result.length > 0) {
            res.status(200).json({
                message: 'Requests are retrieved successfully',
                result: result
            });
        } else {
            res.status(400).send({message: 'There is no requests for this National ID'});
        }
    });

});

module.exports = router;