import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.route";

export const router = Router();

const moduleRoutes = [
    {
        path: "/product",
        route: ProductRoutes,
    },
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});