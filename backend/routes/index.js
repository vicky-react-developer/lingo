const authRoutes = require("./authRoutes");
const sessionRoutes = require("./sessionRoutes");
const messageRoutes = require("./messageRoutes");
const topicRoutes = require("./topicRoutes");
const passageRoutes = require("./passageRoutes");

module.exports = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/session", sessionRoutes);
  app.use("/api/message", messageRoutes);
  app.use("/api/topic", topicRoutes);
  app.use("/api/passage", passageRoutes);
};