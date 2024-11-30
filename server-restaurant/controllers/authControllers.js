const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/HttpError");
const User = require("../models/User");
const Cart = require("../models/Cart");
const { sendEmail } = require("../utils/connect-email");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      throw new HttpError("User not found", 404);
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      throw new HttpError("Password is not match", 400);
    }
    let cartExist = await Cart.findOne({ userId: userExist._id });
    if (!cartExist) {
      const cart = new Cart({ userId: userExist._id, products: [] });
      await cart.save();
    }
    const accessToken = jwt.sign(
      { id: userExist._id, role: userExist.role },
      SECRET_KEY,
      {
        expiresIn: "60d",
      }
    );
    const refreshToken = jwt.sign({ id: userExist._id }, REFRESH_SECRET_KEY, {
      expiresIn: "180d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res
      .status(200)
      .json({ message: "Login successfully", accessToken, user: userExist });
  } catch (error) {
    next(error);
  }
};

const Register = async (req, res, next) => {
  try {
    const { email, password, phone } = req.body;
    const file = req.file;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      throw new HttpError("User already exist", 400);
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashPassword,
      phone,
      avatar: file.path,
      image_public_id: file.filename,
    });
    // await sendEmail(
    //   email,
    //   "Bạn đã đăng ký tài khoản thành công",
    //   `Nhấp vào liên kết sau để đặt lại mật khẩu của bạn`
    // );
    await user.save();
    res.status(201).json({ message: "Register successfully", user: user });
  } catch (error) {
    next(error);
  }
};

const Logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Đăng xuất thành công." });
  } catch (error) {
    next(error);
  }
};

const RefreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(req.cookies);

    if (!refreshToken) {
      throw new HttpError("Bạn cần đăng nhập lại", 401);
    }

    jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
      if (err) {
        throw new HttpError("Refresh Token không hợp lệ", 403);
      }

      const newAccessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: "15s",
      });

      return res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    next(error);
  }
};

const ResetPassword = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = { Login, Register, Logout, RefreshToken, ResetPassword };
