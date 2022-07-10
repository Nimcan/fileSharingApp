const express = require("express");
const mongoose = require("mongoose")
const multer = require("multer")
const path = require("path")
const File = require("./Model/File")
const bycrypt = require("bcrypt")
require("dotenv").config({path: "./config.env"})
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const upload = multer({dest: "uploads"})


mongoose.connect(process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD))

app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    res.render('index')
})

app.post("/upload", upload.single("file"), async(req, res)=>{
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,
    }
    if(req.body.password != null && req.body.password != ""){
        fileData.password = await bycrypt.hash(req.body.password, 10)
    }

    const file = await File.create(fileData)
    
    res.render("index", {fileLink: `${req.headers.origin}/file/${file.id}`})

} )

app.route("/file/:id").get(Download).post(Download)

async function Download(req, res){
    const findFile = await File.findById(req.params.id)

    if(findFile.password != null){
        if(req.body.password == null){
            res.render("password")
            return
        }
        if(!(await bycrypt.compare(req.body.password, findFile.password))){
            res.render("password", {err : true})
            return
        }
    }

    findFile.downloadCount++
    await findFile.save()

    res.download(findFile.path, findFile.originalName)

}

Port = process.env.PORT || 3000


app.listen(Port, ()=> console.log("port connected"))