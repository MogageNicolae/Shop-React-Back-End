import CartModel, {CartInterface, CartProductInterface} from "../model/cart.js";
import ProductModel from "../model/product.js";

export const createNewCart = async (clientId: string, product: CartProductInterface) => {
        const cart = new CartModel({
                clientId: clientId,
                discountTotal: product.price * (1 - product.discountPercentage / 100),
                total: product.price,
                quantity: 1,
                products: [product],
            });
        return await cart.save();
    },

    updateCart = async (clientId: string, updatedCart: CartInterface) => {
        return await CartModel.findOneAndUpdate({clientId: clientId}, updatedCart, {new: true}).exec();
    },

    getCartProduct = async (productId: number) => {
        const productData = await ProductModel.findOne({id: productId}).exec();
        if (productData === null) {
            return null;
        }
        const product: CartProductInterface = {
            id: productData.id,
            title: productData.title,
            description: productData.description,
            price: productData.price,
            discountPercentage: productData.discountPercentage,
            thumbnail: productData.thumbnail,
            quantity: 1,
        }
        return product;
    },

    getUpdatedCartProducts = (products: CartProductInterface[], productToAdd: CartProductInterface) => {
        let updatedProducts: CartProductInterface[] = products;
        if (products.find((product: CartProductInterface): boolean => product.id == productToAdd.id)) {
            const index: number = products.findIndex((product: CartProductInterface): boolean => product.id == productToAdd.id);
            updatedProducts[index].quantity += 1;
        } else {
            productToAdd.quantity = 1;
            updatedProducts = [...products, productToAdd];
        }
        return updatedProducts;
    }