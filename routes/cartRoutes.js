import express from 'express';
import bodyParser from 'body-parser';
import CartModel from "../model/cart.js";
import ProductModel from "../model/product.js";
import ClientModel from "../model/client.js";
const router = express.Router();
const jsonParser = bodyParser.json();
router.post('/get', jsonParser, (req, res) => {
    const clientId = req.body.id;
    const next = () => CartModel.findOne({ clientId: clientId }, { '_id': 0, 'products._id': 0 }).exec().then((data) => {
        res.json(data);
    });
    checkToken(req, res, clientId, next);
});
router.post('/get/size', jsonParser, (req, res) => {
    const clientId = req.body.id;
    const next = () => CartModel.findOne({ clientId: clientId }).exec().then((data) => {
        if (data === null) {
            res.json(0);
        }
        else {
            res.json(data.quantity);
        }
    });
    checkToken(req, res, clientId, next);
});
router.post('', jsonParser, async (req, res) => {
    const clientId = req.body.id;
    const next = () => getCartProducts(req.body.productId).then((product) => {
        if (product === null) {
            res.json('Product not found');
            return;
        }
        CartModel.findOne({ clientId: clientId }).exec().then((cartData) => {
            if (cartData === null) {
                createNewCart(clientId, product).then((data) => {
                    res.json(data);
                });
            }
            else {
                cartData.products = getUpdatedCartProducts(cartData.products, product);
                cartData.quantity += 1;
                cartData.total += product.price;
                cartData.discountTotal += product.price * (1 - product.discountPercentage / 100);
                updateCart(clientId, cartData).then((data) => {
                    res.json(data);
                });
            }
        });
    });
    checkToken(req, res, clientId, next);
});
router.put('', jsonParser, async (req, res) => {
    const clientId = req.body.id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const next = () => CartModel.findOne({ clientId: clientId }).exec().then((data) => {
        if (data) {
            data.products = data.products.map((product) => {
                if (product.productId == productId) {
                    data.quantity += quantity - product.quantity;
                    data.total += data.quantity * product.price;
                    data.discountTotal += data.total * (1 - product.discountPercentage / 100);
                    product.quantity = quantity;
                }
                return product;
            });
            updateCart(clientId, data).then((data) => {
                res.json(data);
            });
        }
    });
    checkToken(req, res, clientId, next);
});
router.delete('', jsonParser, async (req, res) => {
    const clientId = req.body.id;
    const productId = req.body.productId;
    const next = () => CartModel.findOne({ clientId: clientId }).exec().then((data) => {
        if (data) {
            let removedProduct = data.products.find((product) => product.productId == productId);
            if (removedProduct === undefined) {
                res.json('Product not found');
                return;
            }
            data.products = data.products.filter((product) => product.productId != productId);
            data.quantity -= removedProduct.quantity;
            data.total -= removedProduct.quantity * removedProduct.price;
            data.discountTotal -= removedProduct.quantity * removedProduct.price * (1 - removedProduct.discountPercentage / 100);
            updateCart(clientId, data).then((data) => {
                res.json(data);
            });
        }
    });
    checkToken(req, res, clientId, next);
});
const checkToken = (req, res, clientId, next) => {
    const token = req.header('Auth') || '';
    ClientModel.findById({ _id: clientId }).exec().then((data) => {
        if (data === null || token == '' || data.token != token) {
            res.json('Invalid session.');
            return;
        }
        next();
    });
};
const createNewCart = async (clientId, product) => {
    const cart = new CartModel({
        clientId: clientId,
        discountTotal: product.price * (1 - product.discountPercentage / 100),
        total: product.price,
        quantity: 1,
        products: [product],
    });
    return await cart.save();
};
const updateCart = async (clientId, updatedCart) => {
    return await CartModel.updateOne({ clientId: clientId }, updatedCart).exec();
};
const getCartProducts = async (productId) => {
    const productData = await ProductModel.findOne({ productId: productId }).exec();
    if (productData === null) {
        return null;
    }
    const product = {
        productId: productData.productId,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        discountPercentage: productData.discountPercentage,
        thumbnail: productData.thumbnail,
        quantity: 1,
    };
    return product;
};
const getUpdatedCartProducts = (products, productToAdd) => {
    let updatedProducts = products;
    if (products.find((product) => product.productId == productToAdd.productId)) {
        const index = products.findIndex((product) => product.productId == productToAdd.productId);
        updatedProducts[index].quantity += 1;
    }
    else {
        productToAdd.quantity = 1;
        updatedProducts = [...products, productToAdd];
    }
    return updatedProducts;
};
export default router;