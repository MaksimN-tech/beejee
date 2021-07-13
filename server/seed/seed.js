require("../db/connect");
const mongoose = require("mongoose");
const Task = require("../models/task.model");
const Admin = require("../models/admin.model")
const faker = require('faker');

(async function seed() {
  for(let i = 0; i < 8; i++){
    const task = new Task({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      description: faker.lorem.sentence(),
    });
    await task.save();
  }
  const admin = new Admin ({
    name: 'admin',
    password: '123'
  })
  await admin.save();
  mongoose.disconnect(() => {
    console.log("connection was closed!");
  });
})();
