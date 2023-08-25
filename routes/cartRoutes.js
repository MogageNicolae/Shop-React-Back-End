import express from 'express';
import bodyParser from 'body-parser';
import CartModel from "../model/cart.js";
import { checkToken } from "../utils/defaultUtils.js";
import { createNewCart, getCartProduct, getUpdatedCartProducts, updateCart } from "../utils/cartUtils.js";
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
    if (clientId === null) {
        res.json(0);
        return;
    }
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
    const next = () => getCartProduct(req.body.productId).then((product) => {
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
                cartData.discountTotal += Math.floor(product.price * (1 - product.discountPercentage / 100));
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
                if (product.id == productId) {
                    data.quantity += quantity - product.quantity;
                    data.total += (quantity - product.quantity) * product.price;
                    data.discountTotal += Math.floor(product.price * (1 - product.discountPercentage / 100)) * (quantity - product.quantity);
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
    const clientId = req.body.id, productId = req.body.productId, next = () => CartModel.findOne({ clientId: clientId }).exec().then((data) => {
        if (data) {
            let removedProduct = data.products.find((product) => product.id == productId);
            if (removedProduct === undefined) {
                res.json('Product not found');
                return;
            }
            data.products = data.products.filter((product) => product.id != productId);
            data.quantity -= removedProduct.quantity;
            data.total -= removedProduct.quantity * removedProduct.price;
            data.discountTotal -= Math.floor(removedProduct.price * (1 - removedProduct.discountPercentage / 100)) * removedProduct.quantity;
            updateCart(clientId, data).then((data) => {
                res.json(data);
            });
        }
    });
    checkToken(req, res, clientId, next);
});
export default router;
