module.exports = (sequelize, DataTypes) => {
  const Passage = sequelize.define("Passage", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tamilText: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

  return Passage;
};
