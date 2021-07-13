const {Schema, pluralize, model} = require('mongoose');
pluralize(null);
const validator = require('validator');


const taskSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("email is not correct")
      }
    }
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  edit: {
    type: Boolean,
    required: true,
    default: false
  },

})


const Task = model('task', taskSchema);

module.exports = Task;

