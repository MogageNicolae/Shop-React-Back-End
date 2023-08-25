import {Schema, model} from "mongoose";

export interface CartProductInterface {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    thumbnail: string;
    quantity: number;
}

export interface CartInterface {
    clientId: string,
    discountTotal: number,
    total: number,
    quantity: number,
    products: CartProductInterface[];
}

const cartProductSchema = new Schema<CartProductInterface>(
    {
        id: Number,
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        thumbnail: String,
        quantity: Number,
    });

export const cartSchema = new Schema<CartInterface>(
    {
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