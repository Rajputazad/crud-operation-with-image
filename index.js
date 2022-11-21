require("./db.conn/confis");
const datas = require("./db.conn/datas");
const file = require("./db.conn/uploadimg");
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();
const port = 338;
app.use(express.json());
const cors= require("cors")
app.use(cors({
  origin:["http://localhost:4200","*"],
  allowedHeaders: ['Content-Type', 'authorization'],
    credentials: true
}));
app.post("/get",  async (req, res) => {
  // console.log(req.params)
  let userdatas=req.body
  let data = await datas.findOne({Username:req.body.Username});
  res.status(200).json(data);
});

app.post("/Home", file.single("image_file"), async (req, res) => {
  try {
	// if (
	//   //  " req.file == null ||
	//     req.body.Username == "fsefsef"
	//   //   req.body.name == null ||
	//   //   req.body.email == null ||
	//   //   req.body.mobile == null ||
	//   //   req.body.rollno == null"
    
	//   ) {
	//     res.send("Submit all the inputs!",403);
	//     console.log("Submit all the inputs!");
	//     try {
	//       fs.unlinkSync(`${__dirname}/assets/imgs/${req.file.filename}`);
	//     } catch (error) {}
	//   } else {
	    // let a = req.file.filename;
	    // req.body.image_file = a;
	    let data = await datas(req.body);
	    let result = await data.save();
	    console.log(result);
	    // console.log(req.file.filename);
      res.status(200).json("Done")
	  // }
} catch (error) {
	res.status(403).json(error)
  console.log(error);
}
});

app.delete("/delete/:_id", async (req, res) => {
  let img = await datas.findOne(req.params);
  console.log(img.image_file)
  let delimg = img.image_file;
  try {
    fs.unlinkSync(`${__dirname}/assets/imgs/` + delimg);
  } catch (error) {}
  let data = await datas.deleteOne(req.params);
  if (data.deletedCount == 0) {
    console.log("Data not found!");
    res.send("Data not found!")
  }else{
  res.send(data);
  }
});

app.put("/update/:_id", file.single("image_file"), async (req, res) => {
 try {
   let upimg=req.file.filename
   let img = await datas.findById(req.params);
   console.log(req.params);
   console.log(img);
   if (img == null) {
     console.log("id not found");
     res.status(404).json("id not found");
   } else {
     if(upimg==null){
       res.status(404).json("profile not found");
       console.log("profile not found")
      }
      else{
        let delimg = img.image_file;
        try {
          fs.unlinkSync(`${__dirname}/assets/imgs/` + delimg);
     } catch (error) {}
    }
    try {
      req.body.image_file = upimg;
    } catch (error) {
      console.log(error);
    }
    console.log(req.params);
    console.log(req.body);
    let data = await datas.updateOne(req.params, { $set: req.body });
    console.log(data);
    if (data.modifiedCount==1) {
      console.log("Profile and details updated!");
      res.status(200).json("Profile and details updated!");
    }
  }
} catch (error) {
  res.status(404).json("Profile not found");
  console.log(error);
  
 }
});

app.listen(port, () => {
  console.log(
    "Server started on port " + port + ` URL:-http://localhost:${port}/`
  );
});

//code for only img name
// app.get("/find/:_id", async (req, res) => {
// let data = await datas.findOne( {},{_id:req.params,image_file:1});
//   res.send(data.image_file);
// });
