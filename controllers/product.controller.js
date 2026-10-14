import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const data = req.body;
    const product = await Product.create(data);

    console.log("Product Data Created", data);

    res.json({
      message: "Create Product Successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const page = parseInt(req.query.page) || 1;

    const sort = req.query.sort || "price";

    const order = req.query.order === "desc" ? -1 : 1;

    const search = req.query.search?.trim();

    const skip = (page - 1) * limit;

    const filter = {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (maxPrice !== undefined || minPrice !== undefined) {
      filter.price = {};

      if (maxPrice !== undefined) {
        filter.price.$lte = Number(maxPrice);
      }
      if (minPrice !== undefined) {
        filter.price.$gte = Number(minPrice);
      }
    }

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit);

    res.json({
      message: "Get All Products Successfully",
      data: products,
      meta: {
        currentPage: page,
        limit: limit,
        totalProducts: totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get products",
      error: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const products = await Product.findById(productId);

    res.json({
      message: "Get Single Products Successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get product",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.quantity = req.body.quantity;

    await product.save();

    res.json({
      message: "Update Product Successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Delete Product Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};
