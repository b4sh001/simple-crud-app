import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from './models/product.mode.js';

dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/products", async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
        console.error("Error in creating new Product: ", err.message)
        res.status(500).json({ success: false, msg: "Server error" });
    }
});

app.listen(5000, () => {
    connectDB();  // Connect to MongoDB
});




// 