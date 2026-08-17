require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("../models");

async function createAdmin() {
  try {
    await db.sequelize.authenticate();

    const existing = await db.User.findOne({
      where: { userName: "admin" }
    });

    if (existing) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash("lingo", 10);

    await db.User.create({
      name: "Super Admin",
      role: "Admin",
      userName: "superadmin",
      passwordHash
    });

    console.log("Admin created successfully");
    process.exit(0);

  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();