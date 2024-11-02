import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import { getProduct } from '../controllers/product.controller.js';

const router = express.Router();


router.get("/", getProduct)

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
    const { id } = req.params
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct })


    } catch (error) {

        res.status(500).json({ success: false, msg: "Server error" });

    }
})
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

