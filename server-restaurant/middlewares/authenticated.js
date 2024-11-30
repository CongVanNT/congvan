const jwt = require("jsonwebtoken");
const HttpError = require("../models/HttpError");
const dotenv = require("dotenv");

dotenv.config();

const { SECRET_KEY } = process.env;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY không được định nghĩa trong .env");
}

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return next(
        new HttpError("Thiếu token. Vui lòng đăng nhập để tiếp tục.", 401)
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(
        new HttpError("Token không hợp lệ. Vui lòng đăng nhập lại.", 401)
      );
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return next(new HttpError("Token không hợp lệ hoặc đã hết hạn.", 401));
      }

      req.user = user;
      next();
    });
  } catch (error) {
    next(new HttpError("Đã xảy ra lỗi trong quá trình xác thực.", 500));
  }
};

module.exports = auth;
