module.exports = (sequelize, DataTypes) => {

const FunctionalTask = sequelize.define("FunctionalTask", {

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    category: {
        type: DataTypes.ENUM(
            "Task",
            "Practice"
        ),
        allowNull: false
    },

    type: {
        type: DataTypes.ENUM(
            "FIB",
            "OSM"
        ),
        allowNull: false
    }

});

    return FunctionalTask;
};