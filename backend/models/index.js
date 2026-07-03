const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/database");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT, // ✅ ADD THIS
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false,

    dialectOptions: process.env.NODE_ENV === "production" ? {
      ssl: {
        require: false,
        rejectUnauthorized: false
      }
    } : {}
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, DataTypes);
db.Topic = require("./topic.model")(sequelize, DataTypes);
db.Passage = require("./passage.model")(sequelize, DataTypes);
db.ChatSession = require("./chatSession.model")(sequelize, DataTypes);
db.Message = require("./message.model")(sequelize, DataTypes);
db.Correction = require("./correction.model")(sequelize, DataTypes);
db.FunctionalTask = require("./functionalTask.model")(sequelize, DataTypes);
db.FunctionalExercise = require("./funactionalExercise.model")(sequelize, DataTypes);
db.Attempt = require("./attempt.model")(sequelize, DataTypes);

// User ↔ ChatSession
db.User.hasMany(db.ChatSession, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

db.ChatSession.belongsTo(db.User, {
  foreignKey: { name: "userId", allowNull: false },
});

// ChatSession ↔ Message
db.ChatSession.hasMany(db.Message, {
  foreignKey: { name: "sessionId", allowNull: false },
  onDelete: "CASCADE",
});

db.Message.belongsTo(db.ChatSession, {
  foreignKey: { name: "sessionId", allowNull: false },
});

// Message ↔ Correction
db.Message.hasOne(db.Correction, {
  foreignKey: { name: "messageId", allowNull: false },
  onDelete: "CASCADE",
});

db.Correction.belongsTo(db.Message, {
  foreignKey: { name: "messageId", allowNull: false },
});

// Topic ↔ ChatSession
db.Topic.hasMany(db.ChatSession, {
  foreignKey: { name: "topicId", allowNull: true },
});

db.ChatSession.belongsTo(db.Topic, {
  foreignKey: { name: "topicId", allowNull: true },
});

// Passage ↔ ChatSession
db.Passage.hasMany(db.ChatSession, {
  foreignKey: { name: "passageId", allowNull: true },
});

db.ChatSession.belongsTo(db.Passage, {
  foreignKey: { name: "passageId", allowNull: true },
});

db.User.hasMany(db.Attempt, {
    foreignKey: "userId"
});

db.Attempt.belongsTo(db.User, {
    foreignKey: "userId"
});


db.FunctionalTask.hasMany(db.FunctionalExercise, {
    foreignKey: "taskId",
    onDelete: "CASCADE"
});

db.FunctionalExercise.belongsTo(db.FunctionalTask, {
    foreignKey: "taskId"
});

db.FunctionalTask.hasMany(db.Attempt, {
    foreignKey: "taskId"
});

db.Attempt.belongsTo(db.FunctionalTask, {
    foreignKey: "taskId"
});

db.FunctionalExercise.hasMany(db.Attempt, {
    foreignKey: "exerciseId"
});

db.Attempt.belongsTo(db.FunctionalExercise, {
    foreignKey: "exerciseId"
});

db.Passage.hasMany(db.Attempt, {
    foreignKey: "passageId"
});

db.Attempt.belongsTo(db.Passage, {
    foreignKey: "passageId"
});


db.connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    await sequelize.sync({
      // alter: true
    });
    console.log("✅ All models synchronized.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = db;
