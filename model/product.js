import { Schema, model } from "mongoose";
export const productSchema = new Schema({
    id: {
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
});
const ProductModel = model('product', productSchema);
export default ProductModel;
//# sourceMappingURL=product.js.map