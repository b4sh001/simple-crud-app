import express from 'express';
import dotenv from "dotenv";
import router from './routes/product.route.js';
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/products", router);


app.listen(5000, () => {
    connectDB();  // Connect to MongoDB
});




// 