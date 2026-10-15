import dotenv from "dotenv";

dotenv.config();

export const envVars = {
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/assigenment-1",
    NODE_ENV: (process.env.NODE_ENV || "development") as "development" | "production",
};