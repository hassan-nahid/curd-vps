import AppError from "../../errorHelpers/AppError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";
import httpStatus from "http-status-codes";

const createProduct = async (payload: IProduct) => {
    const result = await Product.create(payload);
    return result;
};

const getAllProducts = async () => {
    const result = await Product.find();
    return result;
};

const getSingleProduct = async (productId: string) => {
    const result = await Product.findById(productId);
    return result;
}

const updateProduct = async (productId: string, payload: Partial<IProduct>) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, "Product not found");
    }
    const result = await Product.findByIdAndUpdate(productId, payload, { new: true });
    return result;
}

const deleteProduct = async (productId: string) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, "Product not found");
    }
    const result = await Product.findByIdAndDelete(productId);
    return result;
}

export const ProductServices = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};


