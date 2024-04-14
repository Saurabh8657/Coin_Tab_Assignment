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
            else res.status(200).json({"Users":result})
        } )
    } catch (error) {
        res.status(500).json({message: error})
    }
})

userRouter.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM users WHERE id = ${id}`
        db.query(query, [], (err, result) => {
            if (err) {
                res.status(400).json({"Error Getting user": err})
            }
            else res.status(200).json({"User":result})
        } )
    } catch (error) {
        res.status(500).json({message: error})
    }
})

userRouter.post("/add", (req, res) => {
    try {
        const { id, name, email, phone, website, company, city } = req.body;
        const query = `INSERT INTO users (id, name, email, phone, website, company, city) VALUES (?, ?, ?, ?, ?, ?, ?)`
        db.query(query, [id, name, email, phone, website, company, city], (err, result) => {
            if (err) {
                res.status(400).json({"Error inserting user": err})
            }
            else res.status(200).json({"Added User":result})
        } )
    } catch (error) {
        res.status(500).json({message: error})
    }
})

module.exports = {
    userRouter,
} ;
