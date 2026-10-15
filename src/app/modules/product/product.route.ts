import { Router } from "express";
import { ProductControllers } from "./product.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProductValidationSchema, updateProductValidationSchema } from "./product.validation";

const router = Router();

// Routes
router.post("/", validateRequest(createProductValidationSchema), ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/:id", ProductControllers.getSingleProduct);
router.patch("/:id", validateRequest(updateProductValidationSchema), ProductControllers.updateProduct);
router.delete("/:id", ProductControllers.deleteProduct);

export const ProductRoutes = router;
