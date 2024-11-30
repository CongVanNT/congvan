const express = require("express");
require("dotenv").config();
const {
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
} = require("../controllers/userControllers");

const router = express.Router();
const auth = require("../middlewares/authenticated");

// lấy danh sách sản phẩm
router.get("/product/all-products", getProducts);

// lấy danh sách danh mục
router.get("/category/all-categies", getAllCategory);

// lấy thời gian hoạt động của cửa hàng
router.get("/get-time-open", getAllTimeOpen);

// đặt bàn
router.post("/booking-table", auth, postReservation);

// lấy danh sách đầu bếp
router.get("/chef/all-chef", getAllChef);

// lấy danh sách bài viết
router.get("/post/all-posts", getPosts);

// lấy giỏ hàng
router.get("/cart", auth, getCart);

// thao tác với giỏ hàng
router.post("/cart/handle-cart", auth, handleCart);

// dat hang
router.post("/order", auth, order);

// aly danh sach don hang
router.get("/all-order", auth, getAllOrder);

router.post("/payment", Payment);

router.post("/callback", async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: 23 });
});

router.post("/check-status-transaction", CheckStatusPayment);

module.exports = router;
