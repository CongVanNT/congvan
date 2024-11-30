const mongoose = require("mongoose");

const ChefSchema = new mongoose.Schema(
  {
    nameChef: {
      type: String,
      required: [true, "Tên không được để trống"],
    },
    avatarChef: {
      type: String,
      required: true,
    },
    phoneChef: {
      type: String,
      required: [true, "Số điện thoại không được để trống"],
    },
    rolesChef: String,
    image_public_id: String,
  },
  {
    timestamps: true,
  }
);

const Chef = mongoose.model("Chef", ChefSchema);
module.exports = Chef;
