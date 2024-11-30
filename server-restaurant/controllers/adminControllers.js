require("dotenv").config();
const { cloudinary } = require("../utils/upload-file");
const HttpError = require("../models/HttpError");
const Category = require("../models/Category");
const Chef = require("../models/Chef");
const OpeningHours = require("../models/OpeningHours");
const Product = require("../models/Product");
const Post = require("../models/Post");

const createCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    const file = req.file;
    if (!file) {
      throw new HttpError("File image error", 400);
    }
    const category = new Category({
      categoryName,
      image: file.path,
      image_public_id: file.filename,
    });
    await category.save();
    res
      .status(201)
      .json({ message: "Create category successfully", category: category });
  } catch (error) {
    next(error);
  }
};

const updateCategoryById = async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    const { id } = req.params;
    const categoryExist = await Category.findById(id);
    if (!categoryExist) {
      throw new HttpError("Category not found", 404);
    }
    const file = req.file;
    if (file) {
      if (categoryExist.image_public_id) {
        await cloudinary.uploader.destroy(categoryExist.image_public_id);
      }

      categoryExist.image = file.path;
      categoryExist.image_public_id = file.filename;
    }
    if (categoryName) categoryExist.categoryName = categoryName;

    await categoryExist.save();
    res.status(200).json({
      message: "Update category successfully",
      category: categoryExist,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const categoryExist = await Category.findByIdAndDelete(id);
    if (!categoryExist) {
      throw new HttpError("Category not found", 404);
    }
    if (categoryExist.image_public_id) {
      await cloudinary.uploader.destroy(categoryExist.image_public_id);
    }
    res
      .status(200)
      .json({ message: "Category deleted successfully", status: "OKi baby" });
  } catch (error) {
    next(error);
  }
};

const createChef = async (req, res, next) => {
  try {
    const { name, phone, roles } = req.body;
    const file = req.file;
    if (!file) {
      throw new HttpError("File image error", 400);
    }
    const chef = new Chef({
      nameChef: name,
      phoneChef: phone,
      rolesChef: roles,
      avatarChef: file.path,
      image_public_id: file.filename,
    });
    await chef.save();
    res.status(201).json({ message: "Create chef successfully", chef: chef });
  } catch (error) {
    next(error);
  }
};

const updateChefById = async (req, res, next) => {
  try {
    const { name, phone, roles } = req.body;
    const { id } = req.params;
    const chefExist = await Chef.findById(id);
    if (!chefExist) {
      throw new HttpError("Category not found", 404);
    }
    const file = req.file;
    if (file) {
      if (chefExist.image_public_id) {
        await cloudinary.uploader.destroy(chefExist.image_public_id);
      }

      chefExist.avatarChef = file.path;
      chefExist.image_public_id = file.filename;
    }
    if (name) chefExist.nameChef = name;
    if (phone) chefExist.phoneChef = phone;
    if (roles) chefExist.rolesChef = roles;

    await chefExist.save();
    res.status(200).json({
      message: "Update chef successfully",
      chef: chefExist,
    });
  } catch (error) {
    next(error);
  }
};

const deleteChefById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const chefExist = await Chef.findByIdAndDelete(id);
    if (!chefExist) {
      throw new HttpError("Chef not found", 404);
    }
    if (chefExist.image_public_id) {
      await cloudinary.uploader.destroy(chefExist.image_public_id);
    }
    res
      .status(200)
      .json({ message: "Chef deleted successfully", status: "OKi baby" });
  } catch (error) {
    next(error);
  }
};

const createOpeningHours = async (req, res, next) => {
  try {
    const { dayName, startTime, endTime } = req.body;
    const [hours, minutes] = startTime.split(":");
    const formattedStartTime = `${hours}:${minutes}`;
    const [hours2, minutes2] = endTime.split(":");
    const formattedEndTime = `${hours2}:${minutes2}`;
    const openHours = new OpeningHours({
      dayName,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    });
    await openHours.save();
    res
      .status(201)
      .json({ message: "Create open hours successfully", timeOpen: openHours });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { productName, price, quantity, description, categoryId, chefId } =
      req.body;
    const file = req.file;
    if (!file) {
      throw new HttpError("File image error", 400);
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new HttpError("Category not found", 404);
    }
    const chef = await Chef.findById(chefId);
    if (!chef) {
      throw new HttpError("Chef not found", 404);
    }
    const product = new Product({
      productName,
      price,
      quantity,
      description,
      categoryId,
      chefId,
      image: file.path,
      image_public_id: file.filename,
    });
    await product.save();
    res
      .status(201)
      .json({ message: "Create product successfully", product: product });
  } catch (error) {
    next(error);
  }
};

const updateProductById = async (req, res, next) => {
  try {
    const { productName, price, quantity, description, categoryId, chefId } =
      req.body;
    const { id } = req.params;

    const productExist = await Product.findById(id);
    if (!productExist) {
      throw new HttpError("Product not found", 404);
    }
    const file = req.file;

    if (file) {
      if (productExist.image_public_id) {
        await cloudinary.uploader.destroy(productExist.image_public_id);
      }

      productExist.image = file.path;
      productExist.image_public_id = file.filename;
    }

    if (productName) productExist.productName = productName;
    if (price) productExist.price = price;
    if (quantity) productExist.quantity = quantity;
    if (description) productExist.description = description;
    if (categoryId) productExist.categoryId = categoryId;
    if (chefId) productExist.chefId = chefId;

    await productExist.save();
    res
      .status(200)
      .json({ message: "Product updated successfully", product: productExist });
  } catch (error) {
    next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productExist = await Product.findByIdAndDelete(id);
    if (!productExist) {
      throw new HttpError("Product not found", 404);
    }
    if (productExist.image_public_id) {
      await cloudinary.uploader.destroy(productExist.image_public_id);
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", status: "OKi baby" });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, content, topic, chefId } = req.body;
    const file = req.file;
    if (!file) {
      throw new HttpError("File image error", 400);
    }
    const chef = await Chef.findById(chefId);
    if (!chef) {
      throw new HttpError("Chef not found", 404);
    }
    const post = new Post({
      title,
      content,
      topic,
      chefId,
      image: file.path,
      image_public_id: file.filename,
    });
    await post.save();
    res.status(201).json({ message: "Create post successfully", post: post });
  } catch (error) {
    next(error);
  }
};

const updatePostById = async (req, res, next) => {
  try {
    const { title, content, topic, chefId } = req.body;
    const { id } = req.params;
    const postExist = await Post.findById(id);
    if (!postExist) {
      throw new HttpError("Post not found", 404);
    }
    const file = req.file;
    if (file) {
      if (postExist.image_public_id) {
        await cloudinary.uploader.destroy(postExist.image_public_id);
        console.log(file);
      }

      postExist.image = file.path;
      postExist.image_public_id = file.filename;
    }
    if (title) postExist.title = title;
    if (content) postExist.content = content;
    if (topic) postExist.topic = topic;
    if (chefId) postExist.chefId = chefId;
    await postExist.save();
    res.status(200).json({
      message: "Update post successfully",
      category: postExist,
    });
  } catch (error) {
    next(error);
  }
};

const deletePostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const postExist = await Post.findByIdAndDelete(id);
    if (!postExist) {
      throw new HttpError("Post not found", 404);
    }
    if (postExist.image_public_id) {
      await cloudinary.uploader.destroy(postExist.image_public_id);
    }
    res
      .status(200)
      .json({ message: "Post deleted successfully", status: "OKi baby" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
