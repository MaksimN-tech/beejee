const {Schema, pluralize, model} = require('mongoose');
pluralize(null);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const adminSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 16
  },
  token: {
    type: String
  }
})

adminSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 7);
  this.token = await jwt.sign({admin:"admin"}, "environment", {
    expiresIn: "24 hours",
  });
  next();
})

const Admin = model('user', adminSchema);

module.exports = Admin;
