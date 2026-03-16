const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/register", async (req,res)=>{

  try{
    const {email,password} = req.body;

    const hashed = await bcrypt.hash(password,10);

    const user = new User({
      email,
      password:hashed
    });

    await user.save();

    res.status(201).json({message:"User created"});

  }catch(err){
    res.status(500).json({message: err.message});
  }

});


router.post("/login", async (req,res)=>{

  try{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message:"User not found"});
    }

    const valid = await bcrypt.compare(password,user.password);

    if(!valid){
      return res.status(400).json({message:"Wrong password"});
    }

    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"1d"}
    );

    res.json({token});
  }catch(err){
    res.status(500).json({message: err.message});
  }

});

module.exports = router;