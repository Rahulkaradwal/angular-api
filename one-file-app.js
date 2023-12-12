/*
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
const fs = require("fs");

// Import the model
const FileData = require("./models/fileData");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://rahulkaradwal:14%40February@cluster0.4cjd0lx.mongodb.net/mydatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Uploads will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Generate unique filenames
  },
});

const upload = multer({ storage });

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Define a route for uploading a file
app.post("/uploads", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Access first name and last name from the request body
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    // Create a new instance of the model and save it to the database using promises
    const fileData = new FileData({
      firstName: firstName,
      lastName: lastName,
      email: email,
      filename: req.file.filename,
    });

    fileData
      .save()
      .then(() => {
        res.json({
          filename: req.file.filename,
          firstName: firstName,
          lastName: lastName,
          email: email,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error saving data to MongoDB");
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/display/:email", async (req, res) => {
  try {
    const email = req.params.email;

    // Use await and findOne to search for a user with the specified email
    const user = await FileData.findOne({ email });

    // Check if a user with the specified email was found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Construct the data to send in the response
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    // Get the file path
    const filePath = path.join(__dirname, "uploads", user.filename);

    // Read the file content
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error reading file" });
      } else {
        // Include the file content in the response
        userData.fileContent = fileContent.toString("base64"); // Send the file content as base64-encoded string
        res.json(userData);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
*/
