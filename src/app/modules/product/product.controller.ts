import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createProduct = catchAsync(async (req: Request, res: Response) => {

    const result = await ProductServices.createProduct(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Product created successfully",
        data: result,
    });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductServices.getAllProducts();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Products retrieved successfully",
        data: result,
    });
})

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const result = await ProductServices.getSingleProduct(productId as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product retrieved successfully",
        data: result,
    });
})

const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const result = await ProductServices.updateProduct(productId as string, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product updated successfully",
        data: result,
    });
})

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const result = await ProductServices.deleteProduct(productId as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product deleted successfully",
        data: result,
    });
})

export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};

