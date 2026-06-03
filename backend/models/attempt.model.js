module.exports = (sequelize, DataTypes) => {

    const Attempt = sequelize.define("Attempt", {

        userAnswer: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        correctedAnswer: {
            type: DataTypes.TEXT
        },

        explanation: {
            type: DataTypes.TEXT
        },

        isCorrect: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    });

    return Attempt;
};