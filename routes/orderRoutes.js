import express from "express";
import bodyParser from "body-parser";
import CartModel from "../model/cart.js";
import { createNewOrder } from "../utils/orderUtils.js";
import { checkToken } from "../utils/defaultUtils.js";
import OrderModel from "../model/order.js";
const router = express.Router();
const jsonParser = bodyParser.json();
router.post('', jsonParser, (req, res) => {
    const clientId = req.body.id, next = () => OrderModel.find({ 'cart.clientId': clientId }).exec().then((orderData) => {
        res.json(orderData);
    });
    checkToken(req, res, clientId, next);
});
router.post('/add', jsonParser, (req, res) => {
    const clientId = req.body.id, next = () => CartModel.findOneAndDelete({ clientId: clientId }).exec().then((cartData) => {
        if (cartData === null) {
            res.json("Error placing order.");
            return;
        }
        createNewOrder(req.body, cartData).then((data) => {
            res.json(data);
        });
    });
    checkToken(req, res, clientId, next);
});
router.post('/:id', jsonParser, (req, res) => {
    const clientId = req.body.id, next = () => OrderModel.findById({ _id: req.params.id }).exec().then((orderData) => {
        res.json(orderData);
    });
    checkToken(req, res, clientId, next);
});
export default router;
//# sourceMappingURL=orderRoutes.js.map