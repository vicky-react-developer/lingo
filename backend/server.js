const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./models");

const registerRoutes = require("./routes");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://lingo-six-sigma.vercel.app/"],
  credentials: true
}));

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hi"));

db.connectDB();

registerRoutes(app);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);