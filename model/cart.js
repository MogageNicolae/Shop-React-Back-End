import { Schema, model } from "mongoose";
const cartProductSchema = new Schema({
    productId: Number,
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    thumbnail: String,
    quantity: Number,
});
const cartSchema = new Schema({
    clientId: {
        type: String,
        required: true,
    },
    discountTotal: Number,
    total: Number,
    quantity: Number,
    products: [cartProductSchema]
});
const CartModel = model('cart', cartSchema);
export default CartModel;