const express = require("express");
const multer = require("multer");
const Project = require("../models/project");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Get All Projects
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.status(200).send(projects);
});

// Add Project
router.post("/add", upload.single("image"), async (req, res) => {
  const { name, description, viewLink, githubLink, languages } = req.body;
  const project = new Project({
    name,
    description,
    viewLink,
    githubLink,
    image: req.file ? req.file.path : "",
    languages: languages.split(",").map((lang) => lang.trim()),
  });
  await project.save();
  res.status(201).send(project);
});

// Delete Project
router.delete("/delete/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Project deleted" });
});

// Update Project
router.put("/edit/:id", upload.single("image"), async (req, res) => {
  const { name, description, viewLink, githubLink, languages } = req.body;
  const project = await Project.findById(req.params.id);
  if (project) {
    project.name = name || project.name;
    project.description = description || project.description;
    project.viewLink = viewLink || project.viewLink;
    project.githubLink = githubLink || project.githubLink;
    project.languages = languages
      ? languages.split(",").map((lang) => lang.trim())
      : project.languages;
    if (req.file) {
      project.image = req.file.path;
    }
    await project.save();
    res.status(200).send(project);
  } else {
    res.status(404).send({ message: "Project not found" });
  }
});

module.exports = router;
