const express = require("express");
const Skill = require("../models/skill");
const router = express.Router();

// Get All Skills
router.get("/", async (req, res) => {
  const skills = await Skill.find();
  res.status(200).send(skills);
});

// Add Skill
router.post("/add", async (req, res) => {
  const { language, percentage } = req.body;
  const skill = new Skill({ name: language, percentage: parseInt(percentage) });
  await skill.save();
  res.status(201).send(skill);
});

// Delete Skill
router.delete("/delete/:id", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Skill deleted" });
});

// Update Skill
router.put("/edit/:id", async (req, res) => {
  const { language, percentage } = req.body;
  const skill = await Skill.findById(req.params.id);
  if (skill) {
    skill.name = language || skill.name;
    skill.percentage =
      percentage !== undefined ? parseInt(percentage) : skill.percentage;
    await skill.save();
    res.status(200).send(skill);
  } else {
    res.status(404).send({ message: "Skill not found" });
  }
});

module.exports = router;
