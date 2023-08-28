import express from 'express';
import cors from 'cors';
import {connectDB} from "./config.js";
import productRoutes from "./routes/productRoutes.js";
import defaultRoutes from "./routes/defaultRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

await connectDB('mongodb://127.0.0.1:27017/shop_nicu');
const app = express(), port = 3000;

app.use(cors());
app.use('/', defaultRoutes);
app.use('/', clientRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes)
app.use('/reviews', reviewRoutes)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
