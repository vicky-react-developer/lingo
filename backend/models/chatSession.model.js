module.exports = (sequelize, DataTypes) => {
  const ChatSession = sequelize.define("ChatSession", {
    mode: {
      type: DataTypes.ENUM("normal", "topic", "passage", "duolingoChat", "duolingoTopic"),
      allowNull: false
    },

    startedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    endedAt: {
      type: DataTypes.DATE
    }
  }, {
    tableName: "chatsessions"
  });

  return ChatSession;
};
