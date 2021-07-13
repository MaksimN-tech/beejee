const router = require("express").Router();
const Task = require("../models/task.model");

router
  .route("/")
  .get(async (req, res) => {
    const data = await Task.find({});
    res.json(data);
  })
  .post(async (req, res) => {
    try {
      const { name, email, description } = req.body;

      const task = new Task({
        name,
        email,
        description,
      });

      await task.save();

      const data = await Task.find({});
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
// .patch(async (req, res) => {});

module.exports = router;
