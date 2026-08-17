module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    // Common fields
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("Admin", "Student", "Faculty"),
      allowNull: false,
      defaultValue: "Student",
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Student / Faculty only
    fatherName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: true,
    },

    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    qualification: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    organisation: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    place: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: true,
      validate: {
        is: /^[0-9]{10,15}$/
      }
    },

    tokenHash: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    resetTokenHash: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    resetTokenExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },

  }, {
    tableName: "users"
  });

  return User;
};