const HttpError = require("../models/HttpError");
const author = (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new HttpError("'Unauthorized: No user found'", 401));
    }

    if (user.role !== "admin") {
      return next(new HttpError("Forbidden: You are not an author", 403));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = author;
