const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/user.js")
const cors = require("cors");
// const bodypParser = require("body-parser");


    const app = express();
    app.use(express.json());
    
    app.use(cors()); // Enable CORS for all routes

    // Connect to mongodb
  mongoose.set("strictQuery", false);
  mongoose.connect("mongodb+srv://aromal:aromal@crud.rhvwqes.mongodb.net/authapp?retryWrites=true&w=majority")
    .then(() => { 
        console.log("Connected!");       
    }).catch((err) => {
        console.log(err.message);
    })

    app.listen(1234, () =>{
        console.log("Listening to port 1234");
    });

    app.post("/signup", async(req, res) =>{
        try {
            const { userName, password} = req.body; //, confirmPassword 
            /*if ( password !== confirmPassword) {
                return res.status(400).json({ message: "Password and confirm password do not match" });
              } */
              const user = await User.create({ userName, password});
              res.status(200).json(user); 
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message})
        }
    })
 
    app.post("/signin", async(req, res) =>{
        try {
            const { username, password } = req.body;
            
            const user = await User.findOne({ username, password });
            if (!user) {
                return res.status(401).json({ message: "Invalid username or password" });
              }
            res.status(200).json(user);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message})
        }
    })

    app.get("/signin", async(req, res) =>{
        try {
            const { username, password } = req.body;
            
            const users = await User.find({});
            if (!users) {
                return res.status(401).json({ message: "Invalid username or password" });
              }
            res.status(200).json(users);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message})
        }
    })