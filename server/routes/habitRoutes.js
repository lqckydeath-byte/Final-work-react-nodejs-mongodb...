const express = require("express");
const router = express.Router();

const Habit = require("../models/Habit");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async(req,res)=>{

  try {
    console.log("Get habits for user:", req.user.id);
    const habits = await Habit.find({user:req.user.id});
    console.log("Found habits:", habits);
    res.json(habits);
  } catch(err) {
    console.error("Get habits error:", err.message);
    res.status(500).json({message: err.message});
  }

});


router.post("/", auth, async(req,res)=>{

  console.log("Create habit request from user:", req.user.id, "Data:", req.body);

  try {
    const habit = new Habit({
      title:req.body.title,
      description:req.body.description,
      user:req.user.id
    });

    console.log("Saving habit...");
    await habit.save();

    console.log("✓ Habit saved successfully:", habit);
    res.status(201).json(habit);
  } catch(err) {
    console.error("✗ Create habit error:", err.message);
    res.status(500).json({message: err.message});
  }

});


router.put("/:id", auth, async(req,res)=>{

  const habit = await Habit.findById(req.params.id);

  if(habit.user.toString() !== req.user.id){
    return res.status(403).json({message:"Forbidden"});
  }

  habit.title = req.body.title || habit.title;
  habit.completed = req.body.completed ?? habit.completed;

  await habit.save();

  res.json(habit);

});


router.delete("/:id", auth, async(req,res)=>{

  const habit = await Habit.findById(req.params.id);

  if(habit.user.toString() !== req.user.id){
    return res.status(403).json({message:"Forbidden"});
  }

  await habit.deleteOne();

  res.json({message:"Deleted"});

});

module.exports = router;