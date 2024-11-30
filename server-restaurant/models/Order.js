const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Số lượng phải lớn hơn 0"],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      default: "Trả tiến sau khi vào bàn",
      enum: [
        "Trả tiến sau khi vào bàn",
        "Thanh toán ngân hàng",
        "Thanh toán Momo",
        "Thanh toán VNPay",
      ],
    },
    status: {
      type: String,
      default: "Chờ xác nhận",
      enum: ["Chờ xác nhận", "Xác nhận thành công", "Thành công"],
    },
    payment: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
