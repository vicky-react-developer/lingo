module.exports = (sequelize, DataTypes) => {

    const TamilSentence = sequelize.define("TamilSentence", {

        tamilText: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        expectedEnglish: {
            type: DataTypes.TEXT
        },

        orderNo: {
            type: DataTypes.INTEGER
        }

    });

    return TamilSentence;
};