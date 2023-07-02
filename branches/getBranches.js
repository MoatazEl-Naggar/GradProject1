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
    const getQuery =   `SELECT
                        bb_branches.BranchNo,
                        bb_branches.BranchName,
                        bb_branches.BB_Phone,
                        bb_branches.BB_City,
                        bb_branches.BB_Address
                        FROM
                        bb_branches`;
    connection.query(getQuery, (err, result) => {
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