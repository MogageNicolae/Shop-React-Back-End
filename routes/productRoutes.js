import express from 'express';
import bodyParser from 'body-parser';
import ProductModel from "../model/product.js";
const router = express.Router();
const jsonParser = bodyParser.json();
router.get('/size', (req, res) => {
    const categoriesParam = (req.query.categories === undefined) ? '' : req.query.categories, categories = categoriesParam.split(','), search = (req.query.search == undefined) ? '.' : req.query.search, searchRegex = new RegExp(search, 'i'), filter = {
        'title': searchRegex,
    };
    if (categoriesParam !== '') {
        filter['category'] = { $in: categories };
    }
    ProductModel.countDocuments(filter).exec().then((data) => {
        res.json(data);
    });
});
router.get('', (req, res) => {
    const page = (req.query.page == undefined) ? 1 : +req.query.page, noOfProducts = (req.query.noOfProducts == undefined) ? 12 : +req.query.noOfProducts, search = (req.query.search == undefined) ? '.' : req.query.search, searchRegex = new RegExp(search, 'i');
    ProductModel.find({ 'title': searchRegex }, { '_id': 0 }).skip(noOfProducts * (page - 1)).limit(noOfProducts).exec().then((data) => {
        res.json(data);
    });
});
router.get('/categories', (req, res) => {
    if (req.query.categories == undefined) {
        ProductModel.distinct('category').exec().then((data) => {
            res.json(data);
        });
    }
    else {
        const page = (req.query.page == undefined) ? 1 : +req.query.page, noOfProducts = (req.query.noOfProducts == undefined) ? 12 : +req.query.noOfProducts, search = (req.query.search == undefined) ? '.' : req.query.search, searchRegex = new RegExp(search, 'i'), categoriesParam = req.query.categories, categories = categoriesParam.split(',');
        ProductModel.find({ 'category': { $in: categories }, 'title': searchRegex }, { '_id': 0 })
            .skip(noOfProducts * (page - 1))
            .limit(noOfProducts).exec().then((data) => {
            res.json(data);
        });
    }
});
router.get('/:id', (req, res) => {
    const productId = +req.params.id;
    ProductModel.findOne({ 'id': productId }, { '_id': 0 }).exec().then((data) => {
        res.json(data);
    });
});
export default router;
