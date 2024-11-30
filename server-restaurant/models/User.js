const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email không được để trống"],
      unique: true,
      match: [/.+@.+\..+/, "Email không hợp lệ"],
    },
    password: {
      type: String,
      required: [true, "Mật khẩu không được để trống"],
      minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
    },
    avatar: String,
    phone: { type: String, unique: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image_public_id: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
