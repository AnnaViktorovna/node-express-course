const mongoose = require("mongoose");

const userSignupSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Username is required"],
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