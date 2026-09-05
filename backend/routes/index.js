const authRoutes = require("./authRoutes");
const sessionRoutes = require("./sessionRoutes");
const messageRoutes = require("./messageRoutes");
const topicRoutes = require("./topicRoutes");
const passageRoutes = require("./passageRoutes");
const userRoutes = require("./userRoutes");
const functionalTaskRoutes = require("./functionalTaskRoutes");
const adminRoutes = require("./admin");

module.exports = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/session", sessionRoutes);
  app.use("/api/message", messageRoutes);
  app.use("/api/topic", topicRoutes);
  app.use("/api/passage", passageRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/functional-tasks", functionalTaskRoutes);
  app.use("/api/admin", adminRoutes);
};