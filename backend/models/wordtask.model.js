module.exports = (sequelize, DataTypes) => {

    const WordTask = sequelize.define("WordTask", {

        word: {
            type: DataTypes.STRING,
            allowNull: false
        },

        type: {
            type: DataTypes.STRING,
            allowNull: true
        }

    });

    return WordTask;
};