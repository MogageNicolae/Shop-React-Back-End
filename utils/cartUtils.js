import CartModel from "../model/cart.js";
import ProductModel from "../model/product.js";
export const createNewCart = async (clientId, product) => {
    const cart = new CartModel({
        clientId: clientId,
        discountTotal: product.price * (1 - product.discountPercentage / 100),
        total: product.price,
        quantity: 1,
        products: [product],
    });
    return await cart.save();
}, updateCart = async (clientId, updatedCart) => {
    return await CartModel.findOneAndUpdate({ clientId: clientId }, updatedCart, { new: true }).exec();
}, getCartProduct = async (productId) => {
    const productData = await ProductModel.findOne({ id: productId }).exec();
    if (productData === null) {
        return null;
    }
    const product = {
        id: productData.id,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        discountPercentage: productData.discountPercentage,
        thumbnail: productData.thumbnail,
        quantity: 1,
    };
    return product;
}, getUpdatedCartProducts = (products, productToAdd) => {
    let updatedProducts = products;
    if (products.find((product) => product.id == productToAdd.id)) {
        const index = products.findIndex((product) => product.id == productToAdd.id);
        updatedProducts[index].quantity += 1;
    }
    else {
        productToAdd.quantity = 1;
        updatedProducts = [...products, productToAdd];
    }
    return updatedProducts;
};
