import z from "zod";

export const createProductValidationSchema = z.object({
    body: z.object({
        productName: z.string({
            error: () => ({ message: "Name must be string" })
        })
            .trim().max(100, "Product name must not exceed 100 characters").min(2, "Product name must be at least 2 characters long"),
        productDescription: z.string({
            error: () => ({ message: "Description must be string" })
        }).max(200, "Product description must not exceed 200 characters").min(10, "Product description must be at least 10 characters long"),
        productPrice: z.number({
            error: () => ({ message: "Price must be a number" })
        }).min(0, "Product price must be a non-negative number"),
        productQuantity: z.number({
            error: () => ({ message: "Quantity must be a number" })
        }).min(0, "Product quantity must be a non-negative number")

    })
});

export const updateProductValidationSchema = z.object({
    body: z.object({
        productName: z.string({
            error: () => ({ message: "Name must be string" })
        }).max(100, "Product name must not exceed 100 characters").min(2, "Product name must be at least 2 characters long").optional(),
        productDescription: z.string({
            error: () => ({ message: "Description must be string" })
        }).max(200, "Product description must not exceed 200 characters").min(10, "Product description must be at least 10 characters long").optional(),
        productPrice: z.number({
            error: () => ({ message: "Price must be a number" })
        }).min(0, "Product price must be a non-negative number").optional(),
        productQuantity: z.number({
            error: () => ({ message: "Quantity must be a number" })
        }).min(0, "Product quantity must be a non-negative number").optional()
    })
});