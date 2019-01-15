require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
const bodyParser = require("body-parser");
const path = require("path");

app.use(cors());

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", todoRoutes);

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

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || 8000, function() {
  console.log("Your app is listening on port ");
});
