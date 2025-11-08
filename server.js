
const express = require("express")
const multer = require("multer")
const cors = require("cors")
const path = require("path")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const storage = multer.diskStorage({
  destination: function(req, file, cb){ cb(null, "uploads") },
  filename: function(req, file, cb){ cb(null, Date.now() + ".jpg") }
})
const upload = multer({storage: storage})

app.post("/upload", upload.single("foto"), (req,res)=>{
  res.json({ok:true, archivo:req.file.filename})
})

app.get("/admin", (req,res)=>{
  res.sendFile(path.join(__dirname, "public","admin.html"))
})

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log("Servidor activo en", port))
