require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { connect } = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Encore API is running");
});

const PORT = process.env.PORT || 3001;

connectDB()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});