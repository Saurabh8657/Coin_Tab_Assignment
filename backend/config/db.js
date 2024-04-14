const mysql = require("mysql");
const mysql2 = require("mysql2");
require("dotenv").config();

const db = mysql2.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database:  process.env.database,
    port: process.env.port
})

db.connect((err) => {
    if (err) {
        console.error(`Error connecting: ${err}`);
        process.exit(1); // Terminate the process with an error code
    }
    console.log(`Connected to DB`);
});


module.exports = {
    db,
};

