const mongoose = require("mongoose");

const userSignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name must be provided."],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (v) {
        return (
          v.length < 8 ||
          !/[a-z]/.test(v) ||
          !/[A-Z]/.test(v) ||
          !/\d/.test(v) ||
          !/[!@*+_=#?]/.test(v)
        );
      },
      message:
        "Your password isn't strong enough. It should have at least 8 characters, a mixture of uppercase and lowercase letters, a mixture of letters and numbers, and include at least one special character (!@#?)]",
    },
  },
});

module.exports = mongoose.model("User", userSignupSchema);