const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken");
const crypto = require("crypto");
const db     = require("../models");

const User = db.User;

// ── Helper: SHA-256 hash (for storing tokens in DB) ───────────────────────────
const sha256 = (value) =>
  crypto.createHash("sha256").update(value).digest("hex");


// ── REGISTER ──────────────────────────────────────────────────────────────────
const registerUser = async (req, res) => {
  try {
    const {
      name, fatherName, gender, role, age,
      qualification, organisation, address, place,
      phoneNumber, userName, password,
    } = req.body;

    const requiredFields = {
      name, fatherName, gender, role, age,
      qualification, organisation, address, place,
      phoneNumber, userName, password,
    };

    for (const [field, val] of Object.entries(requiredFields)) {
      if (!val || String(val).trim() === "") {
        return res.status(400).json({ success: false, message: `${field} is required.` });
      }
    }

    if (!/^[0-9]{10,15}$/.test(phoneNumber)) {
      return res.status(400).json({ success: false, message: "Enter a valid phone number (10–15 digits)." });
    }

    if (await User.findOne({ where: { userName } })) {
      return res.status(409).json({ success: false, message: "Username is already taken." });
    }

    if (await User.findOne({ where: { phoneNumber } })) {
      return res.status(409).json({ success: false, message: "Phone number is already registered." });
    }

    const salt         = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: name.trim(), fatherName: fatherName.trim(),
      gender, role,
      dateOfBirth:   age,
      qualification: qualification.trim(),
      organisation:  organisation.trim(),
      address:       address.trim(),
      place:         place.trim(),
      phoneNumber:   phoneNumber.trim(),
      userName:      userName.trim(),
      passwordHash,
    });

    const { passwordHash: _ph, tokenHash: _th,
            resetTokenHash: _rth, resetTokenExpiresAt: _rte,
            ...userData } = newUser.toJSON();

    return res.status(201).json({ success: true, message: "User registered successfully.", data: userData });
  } catch (error) {
    console.error("Register error:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ success: false, message: "A user with the given details already exists." });
    }
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


// ── LOGIN ─────────────────────────────────────────────────────────────────────
const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ success: false, message: "Please fill all the fields." });
    }

    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid username or password." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid username or password." });
    }

    // Issue JWT
    const token = jwt.sign(
      { id: user.id, userName: user.userName, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Persist a SHA-256 hash of the token in the DB for session validation
    await user.update({ tokenHash: sha256(token) });

    const { passwordHash: _ph, tokenHash: _th,
            resetTokenHash: _rth, resetTokenExpiresAt: _rte,
            ...userData } = user.toJSON();

    return res.status(200).json({ success: true, message: "Login successful.", token, data: userData });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


// ── LOGOUT ────────────────────────────────────────────────────────────────────
// Clears the stored tokenHash so the JWT is invalidated server-side.
const logoutUser = async (req, res) => {
  try {
    // req.user is set by the auth middleware (see middleware/auth.js)
    await User.update({ tokenHash: null }, { where: { id: req.user.id } });
    return res.status(200).json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


// ── FORGOT PASSWORD ───────────────────────────────────────────────────────────
const forgotPassword = async (req, res) => {
  try {
    const { userName, mobile, dob } = req.body;

    if (!userName || !mobile || !dob) {
      return res.status(400).json({ success: false, message: "Please fill all the fields." });
    }

    if (!/^[0-9]{10,15}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: "Enter a valid mobile number." });
    }

    const NOT_FOUND_MSG = "Details do not match our records.";
    const user = await User.findOne({ where: { userName } });

    if (!user)                                    return res.status(404).json({ success: false, message: NOT_FOUND_MSG });
    if (user.phoneNumber !== String(mobile).trim()) return res.status(404).json({ success: false, message: NOT_FOUND_MSG });
    if (user.dateOfBirth !== dob)                 return res.status(404).json({ success: false, message: NOT_FOUND_MSG });

    // Generate raw token (sent to client) and store only its hash in the DB
    const resetToken     = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = sha256(resetToken);
    const resetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    await user.update({ resetTokenHash, resetTokenExpiresAt });

    return res.status(200).json({ success: true, resetToken });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


// ── RESET PASSWORD ────────────────────────────────────────────────────────────
const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).json({ success: false, message: "Token and new password are required." });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
    }

    // Look up the user by the hashed version of the incoming raw token
    const user = await User.findOne({ where: { resetTokenHash: sha256(resetToken) } });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset token." });
    }

    if (new Date() > user.resetTokenExpiresAt) {
      // Clear expired token
      await user.update({ resetTokenHash: null, resetTokenExpiresAt: null });
      return res.status(400).json({ success: false, message: "Reset token has expired. Please try again." });
    }

    const salt         = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Update password and clear the reset token fields (one-time use)
    await user.update({
      passwordHash,
      resetTokenHash:     null,
      resetTokenExpiresAt: null,
    });

    return res.status(200).json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


module.exports = { registerUser, loginUser, logoutUser, forgotPassword, resetPassword };