import express from "express";
import mongoose from "mongoose";


export const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        console.log("All products found");
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        console.error("Error in getting products: ", err.message)
        res.status(500).json({ success: false, msg: "Server error" });
    }
}
