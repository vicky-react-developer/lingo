module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define("Topic", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    mode: {
      type: DataTypes.ENUM("Real-life Speaking", "Dual Language"),
      defaultValue: "Real-life Speaking"
    }
  }, {
    tableName: "topics"
  });

  return Topic;
};
