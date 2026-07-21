import express from "express";
import productRoutes from "./routes/productRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import stockinRoutes from "./routes/stockinRoutes.js";
import stockoutRoutes from "./routes/stockoutRoutes.js";
// import CategoryRoutes from "./routes/categoryRoutes.js";
import  connectDB  from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

connectDB();
app.use("/products", productRoutes);
app.use("/suppliers",supplierRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);
app.use("/stockin", stockinRoutes);
app.use("/stockout", stockoutRoutes);


app.listen(5000, () => {
  console.log("server is running on port 5000");
});