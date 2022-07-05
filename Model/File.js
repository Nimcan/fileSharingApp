const mongoose = require("mongoose")

const fileSchema = new  mongoose.Schema({

    path:{
        type: String,
        required: true
    },
    originalName:{
        type: String,
        required: true
    },
    password: String,
    downloadCount:{
        type:Number,
        required:true,
        default:0
    }
})

const fileModel = mongoose.model("File", fileSchema)

exports.default = fileModel