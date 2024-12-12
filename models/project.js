const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  viewLink: { type: String },
  githubLink: { type: String },
  image: { type: String },
  languages: { type: [String], required: true },
});

module.exports = mongoose.model("Project", projectSchema);
