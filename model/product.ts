import {Schema, model} from "mongoose";

export interface ProductInterface {
    productId: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[],
}

export const productSchema = new Schema<ProductInterface>(
    {
        productId: {
            type: Number,
            required: true,
        },
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        rating: Number,
        stock: Number,
        brand: String,
        category: String,
        thumbnail: String,
        images: [String],
    }
);

const ProductModel = model('product', productSchema);

export default ProductModel;