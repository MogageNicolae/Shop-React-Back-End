import express from 'express';
import bodyParser from 'body-parser';
import ProductModel from "../model/product.js";

const router = express.Router();
const jsonParser = bodyParser.json()

router.get('/size', (req, res) => {
    ProductModel.countDocuments().exec().then(
        (data) => {
            res.json(data);
        });
});

router.get('', (req, res) => {
    const page: number = (req.query.page == undefined) ? 1 : +req.query.page;
    const noOfProducts: number = (req.query.noOfProducts == undefined) ? 12 : +req.query.noOfProducts;
    ProductModel.find({}, {'_id': 0}).skip(noOfProducts * (page - 1)).limit(noOfProducts).exec().then(
        (data) => {
            res.json(data);
        });
});

router.get('/categories', (req, res) => {
    if (req.query.categories == undefined) {
        ProductModel.distinct('category').exec().then(
            (data) => {
                res.json(data);
            });
    } else {
        const page: number = (req.query.page == undefined) ? 1 : +req.query.page;
        const noOfProducts: number = (req.query.noOfProducts == undefined) ? 12 : +req.query.noOfProducts;
        const categoriesParam: string = req.query.categories as string;
        const categories: string[] = categoriesParam.split(',');
        ProductModel.find({'category': {$in: categories}}, {'_id': 0}).skip(noOfProducts * (page - 1)).limit(noOfProducts).exec().then(
            (data) => {
                res.json(data);
            });
    }
});

router.get('/:id', (req, res) => {
    const productId: number = +req.params.id;
    ProductModel.find({'productId': productId}, {'_id': 0}).exec().then(
        (data) => {
            res.json(data);
        });
});



export default router;