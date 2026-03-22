module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define("Topic", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT
    }
  });

  return Topic;
};
