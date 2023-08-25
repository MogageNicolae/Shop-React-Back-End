import { model, Schema } from "mongoose";
import { cartSchema } from "./cart.js";
const orderSchema = new Schema({
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    cart: {
        type: cartSchema,
        required: true,
    },
}), OrderModel = model('order', orderSchema);
export default OrderModel;
