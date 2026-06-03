module.exports = (sequelize, DataTypes) => {

    const FoundationalTask = sequelize.define("FoundationalTask", {

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        type: {
            type: DataTypes.ENUM(
                "tamil_to_english",
                "own_words"
            ),
            allowNull: false
        }

    });

    return FoundationalTask;
};