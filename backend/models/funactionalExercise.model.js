module.exports = (sequelize, DataTypes) => {

    const FunctionalExercise = sequelize.define("FunctionalExercise", {

        englishSentence: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        tamilSentence: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    });

    return FunctionalExercise;
};