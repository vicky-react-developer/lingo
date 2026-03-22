module.exports = (sequelize, DataTypes) => {
  const ChatSession = sequelize.define("ChatSession", {
    mode: {
      type: DataTypes.ENUM("normal", "topic", "passage"),
      allowNull: false
    },

    startedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    endedAt: {
      type: DataTypes.DATE
    }
  });

  return ChatSession;
};
