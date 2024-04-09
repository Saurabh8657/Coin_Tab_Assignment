const mysql = require("mysql");

// const db = mysql.createConnection({
//     host: 'mysql-14fb0413-cointab-assignment.b.aivencloud.com',
//     user:'avnadmin',
//     password:'AVNS_AaxFhIv2TcTb6LxpfIv',
//     database: 'CoinTabAssignment'
// })
const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'root123',
    database: 'CoinTabAssignment'
})

db.connect((err)=>{
    if(err) console.log(`error connecting ${err}`);
    else console.log(`Connected to DB`)
})

module.exports = {
    db,
}
