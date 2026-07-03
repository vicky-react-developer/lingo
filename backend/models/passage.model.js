module.exports = (sequelize, DataTypes) => {
  const Passage = sequelize.define("Passage", {
    tamilText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mode: {
      type: DataTypes.ENUM("Q/A", "Translation"),
      defaultValue: "Q/A"
    }
  });

  return Passage;
};
