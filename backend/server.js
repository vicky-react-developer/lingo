const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");

const registerRoutes = require("./routes");

const app = express();

app.use(cors());

app.use(bodyParser.json());

db.connectDB();

registerRoutes(app);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);