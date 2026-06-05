module.exports = (sequelize, DataTypes) => {

    const TamilSentence = sequelize.define("TamilSentence", {

        tamilText: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        expectedEnglish: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    });

    return TamilSentence;
};