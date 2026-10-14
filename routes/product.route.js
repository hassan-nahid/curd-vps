import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/product/create", createProduct);
router.get("/product/get", getProduct);
router.get("/product/:id", getSingleProduct);
router.patch("/product/update/:id", updateProduct);
router.delete("/product/delete/:id", deleteProduct);

export default router;
