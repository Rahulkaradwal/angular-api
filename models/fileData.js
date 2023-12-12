const mongoose = require("mongoose");

// Define the schema for your data
const fileDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  filenames: [String],
});

// Create a model from the schema
const FileData = mongoose.model("FileData", fileDataSchema);

module.exports = FileData;
