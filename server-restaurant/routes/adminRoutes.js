const express = require("express");
const multer = require("multer");
const { storage } = require("../utils/upload-file");
const upload = multer({ storage: storage });
const router = express.Router();
const auth = require("../middlewares/authenticated");
const author = require("../middlewares/author");

const {
  createCategory,
  createChef,
  createOpeningHours,
  createProduct,
  createPost,
  updateCategoryById,
  deleteCategoryById,
  updateChefById,
  deleteChefById,
  updateProductById,
  deleteProductById,
  updatePostById,
  deletePostById,
} = require("../controllers/adminControllers");

// tạo món ăn
router.post(
  "/product/create-product",
  // auth,
  // author,
  upload.single("image"),
  createProduct
);

// sửa món ăn
router.put(
  "/product/update-product/:id",
  // auth,
  // author,
  upload.single("image"),
  updateProductById
);

// xóa món ăn
router.delete(
  "/product/delete-product/:id",
  // auth, author,
  deleteProductById
);

// tạo thời gian hoạt động
router.post(
  "/create-time-open",
  // auth, author,
  createOpeningHours
);

// tạo đầu bếp
router.post(
  "/chef/create-chef",
  // auth,
  // author,
  upload.single("image"),
  createChef
);

// sửa đầu bếp
router.put(
  "/chef/update-chef/:id",
  // auth,
  // author,
  upload.single("image"),
  updateChefById
);

// xóa đầu bếp
router.delete(
  "/chef/delete-chef/:id",
  // , auth, author
  deleteChefById
);

// tạo bài biết
router.post(
  "/post/create-post",
  // auth,
  // author,
  upload.single("image"),
  createPost
);

// sửa bài viết
router.put(
  "/post/update-post/:id",
  // auth,
  // author,
  upload.single("image"),
  updatePostById
);

// xóa bài viết
router.delete(
  "/post/delete-post/:id",
  // auth, author,
  deletePostById
);

// tạo danh mục
router.post(
  "/category/create-category",
  // auth,
  // author,
  upload.single("image"),
  createCategory
);

// sửa danh mục
router.put(
  "/category/update-category/:id",
  // auth,
  // author,
  upload.single("image"),
  updateCategoryById
);

// xóa danh mục
router.delete(
  "/category/delete-category/:id",
  // auth,
  // author,
  deleteCategoryById
);

module.exports = router;
