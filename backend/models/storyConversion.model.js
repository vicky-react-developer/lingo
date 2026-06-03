module.exports = (sequelize, DataTypes) => {

    const StoryConversion = sequelize.define("StoryConversion", {

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        tamilPassage: {
            type: DataTypes.TEXT("long"),
            allowNull: false
        }

    });

    return StoryConversion;
};