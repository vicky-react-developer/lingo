module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fatherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("Student", "Faculty"),
      allowNull: false,
      defaultValue: "Student",
    },

    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    organisation: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    place: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[0-9]{10,15}$/,
      },
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

    // ── Session token (hashed) ─────────────────────────────────────────────
    // Stores a SHA-256 hash of the JWT so sessions can be invalidated server-side.
    // Null when the user is logged out.
    tokenHash: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    // ── Password reset token (hashed) ─────────────────────────────────────
    // Raw token is sent to the client; only the hash is stored here.
    resetTokenHash: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    // Expiry for the reset token (15 minutes from issue time)
    resetTokenExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  });

  return User;
};