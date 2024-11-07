const express = require('express')
require('./db/Config')
const cors=require('cors');
const User = require('./db/User');
const Book =require('./db/Book')
const app= express();
const mongoose = require('mongoose'); // Add this line to import mongoose
app.use(express.json());
app.use(cors());

app.post("/register",async(req,resp)=>{//used in the signup page
    let user=new User(req.body);//User here is the model
    let result=await user.save();
    // console.log(req.body) use this to see the output
    resp.send(result)
})

app.post("/login",async (req,resp)=>{
    if(req.body.password&&req.body.email){
        let user=await User.findOne(req.body).select("-password");// This is a common security practice because passwords should not be sent to clients or logged unnecessarily.
        if(user){
            resp.send(user)
        }else{
            resp.send({result:"No User Found"})
        }
    }else{
        resp.send({result:"no main user found"})
    }
})

app.post('/add-book',async(req,resp)=>{
    let book=new Book(req.body)//Book here is the model name
    let result=await book.save();
    resp.send(result)
})

app.get('/books',async(req,resp)=>{
    let books=await Book.find();
    if(books.length>0){
        resp.send(books)
    }else{
        resp.send({book:"No books found"})
    }
})

//the below two node code is for the updateBook feature
app.get("/book/:id",async (req,resp)=>{//this particular code is to find the particular book
    let result=await Book.findOne({_id:req.params.id});
    if(result){
        resp.send(result)
    }else{
        resp.send({mesaage:"No Book found"})
    }
})

app.put("/book/:id",async (req,resp)=>{//this code is to update the book contents,updateOne accepts 2 values
    let result=await Book.updateOne(
        {_id:req.params.id},
        {$set:req.body}// $set operator to update the fields in the document with the values from req.body.
    )
    resp.send(result)
})

app.delete("/book/:id",async(req,resp)=>{
    let result=await Book.deleteOne({_id:req.params.id})
    resp.send(result)
})



///addding image details

require("./db/imageDetails");
const Images = mongoose.model("ImageDetails");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/src/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-image", upload.single("image"), async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;

  try {
    await Images.create({ image: imageName });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    Images.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});

////////////////////////



app.listen(5000)