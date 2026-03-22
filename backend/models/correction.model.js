module.exports = (sequelize, DataTypes) => {
  const Correction = sequelize.define("Correction", {
    wrongText: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    correctedText: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    explanation: {
      type: DataTypes.TEXT
    }
  });

  return Correction;
};
