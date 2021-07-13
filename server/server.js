const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const dotenv = require("dotenv");
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers")
const Task = require("./models/task.model");
const cors = require("cors");
require("./db/connect");

const tasks = require('./routes/tasks')
const login = require('./routes/login')

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/login',login);
app.use('/tasks',tasks)

app.listen(port, () => {
  console.log(`Server run on port:${port}`);
});
