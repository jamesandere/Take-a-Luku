const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Please add first name"],
      maxLength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Please add last name"],
      maxLength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please add email address"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid E-mail",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please add a Password"],
      minLength: [6, "Password must have at least 6 characters"],
      match: [
        /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters",
      ],
    },
    role: {
      type: Number,
      default: 0,
    },
    address: {
      type: Object,
      default: {
        landmark: "",
        city: "",
        country: "",
        postal_code: "",
        phone_number: "",
      },
    },
  },
  { timestamps: true }
);

// encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// verify password
userSchema.methods.comparePassword = async function (yourPassword) {
  return await bcrypt.compare(yourPassword, this.password);
};

// generate token
userSchema.methods.generateToken = async function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.JWT_SEC,
    { expiresIn: "10m" }
  );
};

// generate refresh token
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.REFRESH_JWT_SEC,
    { expiresIn: "1d" }
  );
};

module.exports = mongoose.model("User", userSchema);
