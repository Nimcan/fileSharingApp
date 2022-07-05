const express = require("express");
const mongoose = require("mongoose")
const multer = require("multer")
require("dotenv").config()
const app = express()

const upload = multer({dest: "uploads"})

mongoose.connect(process.env.DATABASE)

app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    res.render('index')
})

app.post("/upload", upload.single("file"), (req, res)=>{
    res.send("hi")

} )


Port = process.env.PORT || 3000


app.listen(Port, ()=> console.log("port connected"))