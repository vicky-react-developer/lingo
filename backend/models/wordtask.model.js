module.exports = (sequelize, DataTypes) => {

    const WordTask = sequelize.define("WordTask", {

        word: {
            type: DataTypes.STRING,
            allowNull: false
        },

        type: {
            type: DataTypes.STRING
        },

        exampleSentence: {
            type: DataTypes.TEXT
        },

        orderNo: {
            type: DataTypes.INTEGER
        }

    });

    return WordTask;
};