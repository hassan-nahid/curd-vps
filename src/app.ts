import express, { type Request, type Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Root route
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Product CRUD API Server is running",
    });
});

// Mount routes at /api/v1 and /api
app.use("/api/v1", router);

// Error handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
