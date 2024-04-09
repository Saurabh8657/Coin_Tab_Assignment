const { db } = require("../config/db");


const userAttacher = (req, res, next) => {
    try {
        const { userId } =  req.body;
        const userFindQuery = `SELECT * FROM users WHERE id = ${userId}`;
        db.query(userFindQuery, (err, result) => {
            if(err || result.length === 0) {
                res.status(200).json({"Error Finding user": err})
            }
            else {
                console.log(result[0]);
                req.body.name = result[0].name;
                req.body.company = result[0].company;
                req.body.userId = result[0].id;
                next();
            }
        })

    } catch(error) {

    }
}

module.exports = {userAttacher} ;