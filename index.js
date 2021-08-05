require("dotenv").config();
const express = require("express");

//mongoose connection
const connectDB = require("./connection");

//mongoose model
const userModel = require("./user");

const app = express();

//configuration
app.use(express.json());

//route : /
//description : To get all user
//parameter : none

app.get("/", async (req, res) => {
  const user = await userModel.find();

  return res.json({ user });
});

//route : /user/type/:type
//description : To get all user based on type
//parameter : type

app.get("/user/type/:type", async (req, res) => {
  const { type } = req.params;

  const user = await userModel.find({ userType: type });

  if(!user){
    return res.json({message:"No user found"});
  }
  
  return res.json({ user });
});


//route : /user/:_id
//description : To get all user based on type
//parameter : _id

app.get("/user/:_id", async (req, res) => {
  const { _id } = req.params;

  const user = await userModel.findOne(_id);

  if(!user){
    return res.json({message:"No user found"});
  }
  
  return res.json({ user });
});


app.post("/user/new", async (req, res) => {
  const { newUser } = req.body;

  await userModel.create(newUser);

  return res.json({ message: "User Created" });
});

app.listen(4000, () =>
  connectDB()
    .then((data) => console.log("Server is running"))
    .then((error) => console.log(error))
);
