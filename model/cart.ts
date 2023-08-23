import {Schema, model} from "mongoose";

export interface CartProductInterface {
    productId: number;
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
        productId: Number,
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        thumbnail: String,
        quantity: Number,
    });

const cartSchema = new Schema<CartInterface>(
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