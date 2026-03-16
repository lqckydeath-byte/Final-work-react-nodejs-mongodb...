require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("✓ MongoDB connected"))
.catch(err=>console.log("✗ MongoDB error:", err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/habits", require("./routes/habitRoutes"));

app.listen(5000, ()=>{
  console.log("🚀 Server running on http://localhost:5000");
});