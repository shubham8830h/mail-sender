const express = require("express");
const mongoose = require("mongoose");
const { router } = require("./route/route");
const app = express();
const cors=require("cors")


// middleware
app.use(express.json())
app.use(cors())

mongoose
  .connect(
    "mongodb+srv://shubham108h:LOhyTHS7kcSijNsz@cluster0.ovhwygy.mongodb.net/shubham108h",
    {
      useNewUrlParser: true,
    }
  )
  .then((res) => {
    console.log("mongoDB is connected");
  })
  .catch((err) => console.log(err));


app.use(router);

const port = 3000;
app.listen(port, () => {
  console.log(`express app is running on port ${port}`);
});
