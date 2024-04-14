const express = require("express");
const cors = require("cors");
const exceljs = require('exceljs');
const { db } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/posts.router");
const { createPostsTable } = require("./model/post.model");
const { createUsersTable } = require("./model/user.model");


const app = express();

//-- middleware --//
app.use(express.json());
app.use(express.text());
app.use(cors());

//-- user routes --//
app.use("/users", createUsersTable, userRouter) ;

//-- posts routes --//
app.use("/posts", createPostsTable, postRouter) ;

//-- routes --//
app.get("/", (req, res) => {
    res.status(200).json({msg:"Cointab SE-ASSIGNMENT."})
})


const PORT = 8080 ;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})