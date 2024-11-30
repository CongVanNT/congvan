const crypto = require("crypto");
const axios = require("axios");
require("dotenv").config();
const mongoose = require("mongoose");
const HttpError = require("../models/HttpError");
const User = require("../models/User");
const Category = require("../models/Category");
const Chef = require("../models/Chef");
const TimeOpen = require("../models/OpeningHours");
const Reservation = require("../models/Reservation");
const OpeningHours = require("../models/OpeningHours");
const { timeToMinutes, normalizeDate } = require("../utils/functions");
const Product = require("../models/Product");
const Post = require("../models/Post");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const ACCESS_KEY_PAYMENT = process.env.ACCESS_KEY_PAYMENT;
const SECET_KEY_PAYMENT = process.env.SECET_KEY_PAYMENT;

const WEEKDAYS = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      message: "Good",
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
};

const getAllChef = async (req, res, next) => {
  try {
    const chefs = await Chef.find();
    res.status(200).json({
      message: "Good",
      chefs: chefs,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTimeOpen = async (req, res, next) => {
  try {
    const timeOpens = await TimeOpen.find();
    res.status(200).json({
      message: "Good",
      timeOpens: timeOpens,
    });
  } catch (error) {
    next(error);
  }
};
const postReservation = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { phone, reservationDate, timeSlot, numberOfGuests } = req.body;

    const formatDay = new Date(reservationDate);
    const dNow = new Date();

    const formatDayNormalized = normalizeDate(formatDay);
    const dNowNormalized = normalizeDate(dNow);

    if (dNowNormalized > formatDayNormalized) {
      throw new HttpError(
        "Reservation date must be today or in the future",
        400
      );
    }

    const dayIndex = formatDayNormalized.getDay();
    const dayName = WEEKDAYS[dayIndex];
    console.log(req.body, dayIndex, dayName);

    const orderDay = await OpeningHours.findOne({ dayName });
    if (!orderDay) {
      throw new HttpError("Restaurant is closed on the selected day", 400);
    }

    const [hours, minutes] = timeSlot.split(":");
    const formattedTimeSlot = `${hours}:${minutes}`;

    const startMinutes = timeToMinutes(orderDay.startTime);
    const endMinutes = timeToMinutes(orderDay.endTime);
    const timeSlotMinutes = timeToMinutes(formattedTimeSlot);

    if (timeSlotMinutes < startMinutes || timeSlotMinutes > endMinutes) {
      throw new HttpError(
        "Selected time is outside the restaurant's operating hours",
        400
      );
    }

    const newReservation = new Reservation({
      customer: id,
      reservationDate: formatDay,
      timeSlot,
      numberOfGuests,
      phone,
    });

    await newReservation.save();

    res.status(201).json({
      message: "Reservation successful",
      newReservation,
    });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      message: "OK",
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      message: "OK",
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      posts,
    });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findOne({ userId: id }).populate(
      "products.productId",
      "price productName image quantity"
    );
    res.status(200).json({ message: "OK", cart: cart });
  } catch (error) {
    next(error);
  }
};

const handleCart = async (req, res, next) => {
  try {
    const { id } = req.user;
    let action = req.query.action;
    let quantity = req.query.quantity;
    let message = "";
    const { productId } = req.body;
    if (!quantity) quantity = 1;
    if (!action) action = "remove-all";
    let cart = null;
    switch (action) {
      case "remove-all":
        cart = await Cart.updateOne({ userId: id }, { $set: { products: [] } });
        message = "Delete all products from cart";
        break;
      case "add":
        cart = await Cart.updateOne(
          { userId: id, "products.productId": productId },
          {
            $inc: { "products.$.quantity": quantity },
          },
          { upsert: false }
        );

        if (cart.matchedCount === 0) {
          cart = await Cart.updateOne(
            { userId: id },
            {
              $push: { products: { productId: productId, quantity: quantity } },
            }
          );
        }

        message = "Product added/updated in cart";
        break;
      case "minus":
        cart = await Cart.updateOne(
          { userId: id, "products.productId": productId },
          { $inc: { "products.$.quantity": -1 } }
        );
        message = "Minus 1";
        break;
      case "plus":
        cart = await Cart.updateOne(
          { userId: id, "products.productId": productId },
          { $inc: { "products.$.quantity": 1 } }
        );
        message = "Plus 1";
        break;
      case "delete":
        cart = await Cart.updateOne(
          { userId: id },
          { $pull: { products: { productId: productId } } }
        );
        message = "Delete product from to cart";
        break;
      default:
        break;
    }
    res.status(200).json({ message: message, cart: cart });
  } catch (error) {
    next(error);
  }
};
const order = async (req, res, next) => {
  let session;
  try {
    const { id } = req.user;
    const { products, totalPrice, totalAmount, discount, paymentMethod } =
      req.body;

    const userExist = await User.findById(id);
    if (!userExist) {
      throw new HttpError("User not found", 404);
    }

    session = await mongoose.startSession();
    session.startTransaction();

    for (let index = 0; index < products.length; index++) {
      const existProduct = await Product.findById(
        products[index].productId
      ).session(session);
      if (!existProduct) {
        throw new HttpError(
          `Product not found: ${products[index].productId}`,
          404
        );
      }
      if (existProduct.quantity < products[index].quantity) {
        throw new HttpError("Số lượng sản phẩm không đủ...", 400);
      }
      existProduct.quantity -= products[index].quantity;
      await existProduct.save({ session });
    }

    let totalPriceReal = discount ? (1 - discount) * totalPrice : totalPrice;

    const order = new Order({
      userId: id,
      products,
      totalPrice: totalPriceReal,
      totalAmount,
      paymentMethod,
      phone: userExist.phone,
      discount: discount ? discount : 0,
    });

    await order.save({ session });

    await session.commitTransaction();
    res.status(201).json({ message: "OK", order: order });
  } catch (error) {
    if (session) await session.abortTransaction();
    next(error);
  } finally {
    if (session) session.endSession();
  }
};

const getAllOrder = async (req, res, next) => {
  try {
    const { id } = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    const userExist = await User.findById(id);
    if (!userExist) {
      throw new HttpError("User not found", 404);
    }

    const orders = await Order.find()
      .sort({ crearedAt: -1 })
      .populate("products.productId", "productName price image")
      .limit(limit)
      .skip(skip);

    res.status(201).json({ message: "OK", orders: orders });
  } catch (error) {
    next(error);
  }
};

const Payment = async (req, res, next) => {
  try {
    let { orderId } = req.body;
    const orderExist = await Order.findById(orderId);
    if (!orderExist) {
      throw new HttpError("Order not found", 404);
    }
    console.log(orderExist);

    const partnerCode = "MOMO";
    const accessKey = ACCESS_KEY_PAYMENT;
    const secretkey = SECET_KEY_PAYMENT;
    const requestId = orderExist?.payment
      ? orderExist?.payment
      : partnerCode + new Date().getTime() + "-" + orderId;
    const orderIdd = orderExist?.payment
      ? orderExist?.payment
      : partnerCode + new Date().getTime() + "-" + orderId;
    const orderInfo = "pay with MoMo";
    const redirectUrl = "https://facebook.com";
    const ipnUrl = "https://server-resturent.onrender.com/api/callback";
    const amountt = orderExist.totalPrice;
    const requestType = "captureWallet";
    const extraData = "";
    const rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amountt +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderIdd +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
    const signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amountt,
      orderId: orderIdd,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: "vi",
    });
    const result = await axios({
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
      data: requestBody,
    });
    if (result?.status === 200 && !orderExist.payment) {
      orderExist.payment = orderIdd;
      await orderExist.save();
    }
    return res.status(200).json({ data: result.data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const CheckStatusPayment = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const orderExist = await Order.findById(orderId);
    if (!orderExist) {
      throw new HttpError("Order not found", 404);
    }
    var secretKey = SECET_KEY_PAYMENT;
    var accessKey = ACCESS_KEY_PAYMENT;
    const rawSignature = `accessKey=${accessKey}&orderId=${orderExist?.payment}&partnerCode=MOMO&requestId=${orderExist?.payment}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = JSON.stringify({
      partnerCode: "MOMO",
      requestId: orderExist?.payment,
      orderId: orderExist?.payment,
      signature: signature,
      lang: "vi",
    });

    const options = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/query",
      headers: {
        "Content-Type": "application/json",
      },
      data: requestBody,
    };

    const result = await axios(options);
    const response = await result.data;
    if (response.resultCode === 0 && orderExist.status !== "Thành công") {
      orderExist.status = "Thành công";
      await orderExist.save();
    }
    return res.status(200).json(result.data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategory,
  getAllChef,
  getAllTimeOpen,
  postReservation,
  getProducts,
  getPosts,
  handleCart,
  getCart,
  order,
  getAllOrder,
  Payment,
  CheckStatusPayment,
};
