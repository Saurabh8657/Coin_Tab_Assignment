const express = require("express");
const exceljs = require('exceljs');
const { userAttacher } = require("../middlewares/userAttacher.middleware");
const { db } = require("../config/db");


const postRouter = express.Router();

postRouter.post("/add", userAttacher, (req, res) => {
    try {
        const { id, name, title, body, company, userId } = req.body;
        const query = `INSERT INTO posts (id, name, title, body, company, userId) VALUES (?, ?, ?, ?, ?, ?)`
        db.query(query, [id, name, title, body, company, userId], (err, result) => {
            if (err) res.status(400).json({"Error while adding new user": err})
            else res.status(200).json({"Added all Posts": result})
        } )
    } catch (error) {
        console.error("Internal Server Error", error);
        res.status(500).json({message: error})
    }
})

postRouter.get("/:userId", (req, res) => {
    try {
        const { userId } = req.params;
        const query = `SELECT * FROM posts WHERE userId = ?`
        db.query(query, [userId], (err, result) => {
            if (err) {
                res.status(400).json({"Error Getting Posts for user": err})
            }
            else res.status(200).json({"All Posts": result})
        } )
    } catch (error) {
        console.error("Error getting posts for user:", error);
        res.status(500).json({"Internal Server Error": error})
    }
})

postRouter.get("/excel/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        // Parameterized query to prevent SQL injection
        const query = `SELECT * FROM posts WHERE userId = ?`;
        db.query(query, [userId], async (err, result) => {
            if (err) {
                return res.status(400).json({ "Error Getting Posts for user": err });
            } else {
                const workbook = new exceljs.Workbook();
                const worksheet = workbook.addWorksheet('Posts');
                worksheet.columns = [
                    { header: 'ID', key: 'id' },
                    { header: 'Name', key: 'name' },
                    { header: 'Title', key: 'title' },
                    { header: 'Body', key: 'body' },
                    { header: 'Company', key: 'company' },
                ];
                result.forEach(post => worksheet.addRow({
                    id: post.id,
                    name: post.name,
                    title: post.title,
                    body: post.body,
                    company: post.company
                }));

                // Write the workbook to a buffer
                workbook.xlsx.writeBuffer().then(buffer => {
                    res.setHeader(
                        "Content-Type",
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    );
                    res.setHeader(
                        "Content-Disposition",
                        "attachment; filename=Posts.xlsx"
                    );
                    res.send(Buffer.from(buffer)); // Send the buffer as the response
                }).catch(error => {
                    console.error("Error writing Excel buffer:", error);
                    res.status(500).json({ message: "Error generating Excel file" });
                });
            }
        });
    } catch (error) {
        console.error("Error generating Excel file:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = {
    postRouter,
}
