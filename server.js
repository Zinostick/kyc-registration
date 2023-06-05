const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 5001;
const dbConnect = require("./dbConnect");
const multer = require("multer");
const imageModel = require("./imageModel");
//const { File } = require("buffer");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dbConnect();
imageModel();

//storage
const Storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

app.post("/uploadKyc", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new imageModel({
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        maritalStatus: req.body.maritalStatus,
        image: {
          data: req.file.filename,
          contentType: "image/png",
        },
      });
      newImage
        .save()
        .then(() => res.send("successfully uploaded"))
        .catch((err) => console.log(err));
    }
  });
});

app.get("/", async (req, res) => {
  const allData = await imageModel.find();
  res.json(allData);
});

app.listen(port, () => {
  console.log(`successfully running at port ${port}`);
});
