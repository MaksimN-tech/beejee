const router = require("express").Router();
const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");

router.route("/").post(async (req, res) => {
  const { name, password } = req.body;
  try {
    let admin = await Admin.findOne({ name });
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (admin && isPasswordCorrect) {
      res.json({ token: admin.token });
    } else {
      throw new Error("Incorrect value");
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;
