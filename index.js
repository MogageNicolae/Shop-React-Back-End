import express from 'express';
import productRoutes from "./routes/productRoutes.js";
import defaultRoutes from "./routes/defaultRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { connectDB } from "./config.js";
import cors from 'cors';
await connectDB('mongodb://localhost:27017/Shop');
const app = express(), port = 3124;
app.use(cors());
app.use('/', defaultRoutes);
app.use('/', clientRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});