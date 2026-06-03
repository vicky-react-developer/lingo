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
db.FoundationalTask = require("./foundationalTask.model")(sequelize, DataTypes);
db.TamilSentence = require("./tamilSentence.model")(sequelize, DataTypes);
db.WordTask = require("./wordtask.model")(sequelize, DataTypes);
db.Attempt = require("./attempt.model")(sequelize, DataTypes);
db.StoryConversion = require("./storyConversion.model")(sequelize, DataTypes);

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



db.FoundationalTask.hasMany(db.TamilSentence, {
    foreignKey: "taskId"
});

db.TamilSentence.belongsTo(db.FoundationalTask, {
    foreignKey: "taskId"
});

db.FoundationalTask.hasMany(db.WordTask, {
    foreignKey: "taskId"
});

db.WordTask.belongsTo(db.FoundationalTask, {
    foreignKey: "taskId"
});

db.User.hasMany(db.Attempt, {
    foreignKey: "userId"
});

db.Attempt.belongsTo(db.User, {
    foreignKey: "userId"
});

db.TamilSentence.hasMany(db.Attempt, {
    foreignKey: "sentenceId"
});

db.Attempt.belongsTo(db.TamilSentence, {
    foreignKey: "sentenceId"
});

db.WordTask.hasMany(db.Attempt, {
    foreignKey: "wordTaskId"
});

db.Attempt.belongsTo(db.WordTask, {
    foreignKey: "wordTaskId"
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
