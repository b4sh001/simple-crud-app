import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());



app.listen(5000, () => {
    connectDB();  // Connect to MongoDB
});




// 