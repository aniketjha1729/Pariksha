const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const question = require("./routes/question");

mongoose.connect("mongodb://localhost/pariksha", async (err) => {
  if (err) throw err;
  console.log("conncted to db");
});

app.use(express.json());
app.use(cors());
app.use("/quiz", question);
app.listen(3000, () => {
  console.log("helllo....");
});
