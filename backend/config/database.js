require("dotenv").config();

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD, // ✅ FIXED
  DB: process.env.DB_NAME,
  PORT: process.env.DB_PORT, // ✅ ADDED
  dialect: "mysql", // better to hardcode

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
