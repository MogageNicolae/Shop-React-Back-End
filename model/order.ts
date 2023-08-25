import {model, Schema} from "mongoose";
import {CartInterface, cartSchema} from "./cart.js";

export interface OrderInterface {
    country: string,
    city: string,
    address: string,
    phone: string,
    date: Date,
    cart: CartInterface,
}

const orderSchema = new Schema<OrderInterface>({
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
    }),

    OrderModel = model('order', orderSchema);

export default OrderModel;