const mysql = require('mysql');
const { db } = require('../config/db');

const createUsersTable = (req, res, next) => {
    try {
        const createUsersTableQuery = 
        `CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            website VARCHAR(255) NOT NULL,
            company VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL
        )`
        db.query(createUsersTableQuery, (err, result) => {
            if(err){
                // console.log(err)
                res.status(200).json({"Error creating table": err})
            }
            else next();
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    createUsersTable,
}