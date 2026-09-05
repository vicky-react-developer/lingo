const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");
const errorHandler = require("./middleware/errorHandler");

const registerRoutes = require("./routes");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://lingorefresh.in/", "https://www.lingorefresh.in/"],
  credentials: true
}));

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Welcome to Lingo Refresh"));

db.connectDB();

registerRoutes(app);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);