import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import { createProduct, getProduct, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();


router.get("/", getProduct)

router.post("/", createProduct);

router.put("/:id", updateProduct)
router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        await Product.findByIdAndDelete(id);
        console.log("Product deleted successfully");
        res.status(200).json({ success: true, msg: "Product deleted successfully" })
    }
    catch (err) {
        res.status(404).json({ success: false, msg: "Product not found" });
    }
})

export default router;

