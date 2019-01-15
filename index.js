require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
const bodyParser = require("body-parser");

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", todoRoutes);

mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${
    process.env.MONGO_PASS
  }@ds021689.mlab.com:21689/notes-material`,
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected succesfully to the database");
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
