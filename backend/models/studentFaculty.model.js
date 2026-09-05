module.exports = (sequelize, DataTypes) => {

    const StudentFaculty = sequelize.define(
        "StudentFaculty",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            studentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },

            facultyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "student_faculty",
            timestamps: true,
        }
    );

    return StudentFaculty;
};