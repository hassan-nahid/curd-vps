import dotenv from "dotenv";
dotenv.config();
import express from "express";
import DBConnection from "./config/db.config.js";

const app = express();
const PORT = process.env.PORT || 5001;
import router from "./routes/product.route.js";

// DATABASE CONNECTION

DBConnection();

// MIDDLEWARE
app.use(express.json());

app.use("/api/v1", router);

// SERVER RESPONSE
app.get("/", (req, res) => {
  res.send("Hey! Buddy, This Product CRUD SERVER.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
