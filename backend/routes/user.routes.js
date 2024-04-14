const express = require("express");
const { db } = require("../config/db");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    try {
        const query = `SELECT * FROM users`
        db.query(query, [], (err, result) => {
            if (err) {
                res.status(400).json({"Error Getting user": err})
            }
            else res.status(200).json({"Users List":result})
        } )
    } catch (error) {
        res.status(500).json({"Internal Server Error": error})
    }
})

userRouter.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM users WHERE id = ${id}`
        db.query(query, [], (err, result) => {
            if (err) {
                res.status(400).json({"Error Getting user by id": err})
            }
            else res.status(200).json({"User details":result})
        } )
    } catch (error) {
        res.status(500).json({"Internal Server Error": error})
    }
})

userRouter.post("/add", (req, res) => {
    try {
        const { id, name, email, phone, website, company, city } = req.body;
        const query = `INSERT INTO users (id, name, email, phone, website, company, city) VALUES (?, ?, ?, ?, ?, ?, ?)`
        db.query(query, [id, name, email, phone, website, company, city], (err, result) => {
            if (err) {
                res.status(400).json({"Error adding user": err})
            }
            else res.status(200).json({"Added User":result})
        } )
    } catch (error) {
        res.status(500).json({"Internal Server Error": error})
    }
})

module.exports = {
    userRouter,
} ;
