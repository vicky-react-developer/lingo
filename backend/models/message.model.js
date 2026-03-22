module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    sender: {
      type: DataTypes.ENUM("user", "ai"),
      allowNull: false
    },

    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  return Message;
};
