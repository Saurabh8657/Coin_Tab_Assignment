const express = require("express");
const cors = require("cors");
const exceljs = require('exceljs');
const { userAttacher } = require("./middlewares/userAttacher.middleware");
const { db } = require("./config/db");
const { createUsersTable } = require("./model/user.model");
const { createPostsTable } = require("./model/post.model");


const app = express();

//-- middleware --//
app.use(express.json());
app.use(express.text());
app.use(cors());

//-- user routes --//


//-- routes --//
app.get("/", (req, res) => {
    res.status(200).json({msg:"Cointab SE-ASSIGNMENT."})
})

app.get("/users", createUsersTable, (req, res) => {
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
app.get("/users/:id", createUsersTable, (req, res) => {
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

app.post("/users/add", createUsersTable, (req, res) => {
    try {
        console.log(req.body)
        const { id, name, email, phone, website, company, city } = req.body;
        const query = `INSERT INTO users (id, name, email, phone, website, company, city) VALUES (?, ?, ?, ?, ?, ?, ?)`
        db.query(query, [id, name, email, phone, website, company, city], (err, result) => {
            if (err) {
                // console.log(err)
                res.status(400).json({"Error inserting user": err})
            }
            else res.status(200).json({"Added User":result})
        } )
    } catch (error) {
        res.status(500).json({message: error})
    }
})

app.post("/posts/add", createPostsTable, userAttacher, (req, res) => {
    try {
        const { id, name, title, body, company, userId } = req.body;
        const query = `INSERT INTO posts (id, name, title, body, company, userId) VALUES (?, ?, ?, ?, ?, ?)`
        db.query(query, [id, name, title, body, company, userId], (err, result) => {
            if (err) res.status(400).json({"Error inserting user": err})
            else res.status(200).json({"Added all Posts": result})
        } )
    } catch (error) {
        res.status(500).json({message: error})
    }
})

app.get("/posts/:userId", createPostsTable, (req, res) => {
    try {
        const { userId } = req.params;
        const query = `SELECT * FROM posts WHERE userId = ?`
        db.query(query, [userId], (err, result) => {
            if (err) {
                res.status(400).json({"Error Getting Posts for user": err})
            }
            else res.status(200).json({"Posts": result})
        } )
    } catch (error) {
        res.status(500).json({message: error})
    }
})

app.get("/excel/:userId", async (req, res) => {
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

const PORT = 8080 ;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})