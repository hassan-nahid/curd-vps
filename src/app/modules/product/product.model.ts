import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
    {
        productName: {
            type: String,
            required: true,
        },
        productDescription: {
            type: String,
            required: true,
        },
        productPrice: {
            type: Number,
            required: true,
            min: [0, "Price must be a non-negative number"],
        },
        productQuantity: {
            type: Number,
            required: true,
            min: [0, "Quantity must be a non-negative number"],
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Product = model<IProduct>("Product", productSchema);
