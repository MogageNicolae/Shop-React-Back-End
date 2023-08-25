import express from 'express';
import bodyParser from 'body-parser';
import ProductModel from "../model/product.js";

const router = express.Router();
const jsonParser = bodyParser.json()

router.get('/size', (req, res) => {
    interface FilterType {
        title: RegExp;
        category?: { $in: string[] };
    }

    const categoriesParam: string = (req.query.categories === undefined) ? '' : req.query.categories as string,
        categories: string[] = categoriesParam.split(','),
        search: string = (req.query.search == undefined) ? '.' : req.query.search as string,
        searchRegex = new RegExp(search, 'i'),
        filter: FilterType = {
            'title': searchRegex,
        };
    if (categoriesParam !== '') {
        filter['category'] = {$in: categories};
    }
    ProductModel.countDocuments(filter).exec().then(
        (data) => {
            res.json(data);
        });
});

router.get('', (req, res) => {
    const page: number = (req.query.page == undefined) ? 1 : +req.query.page,
        noOfProducts: number = (req.query.noOfProducts == undefined) ? 12 : +req.query.noOfProducts,
        search: string = (req.query.search == undefined) ? '.' : req.query.search as string,
        searchRegex = new RegExp(search, 'i');
    ProductModel.find({'title': searchRegex}, {'_id': 0}).skip(noOfProducts * (page - 1)).limit(noOfProducts).exec().then(
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
        const page: number = (req.query.page == undefined) ? 1 : +req.query.page,
            noOfProducts: number = (req.query.noOfProducts == undefined) ? 12 : +req.query.noOfProducts,
            search: string = (req.query.search == undefined) ? '.' : req.query.search as string,
            searchRegex = new RegExp(search, 'i'),
            categoriesParam: string = req.query.categories as string,
            categories: string[] = categoriesParam.split(',');
        ProductModel.find({'category': {$in: categories}, 'title': searchRegex}, {'_id': 0})
            .skip(noOfProducts * (page - 1))
            .limit(noOfProducts).exec().then(
            (data) => {
                res.json(data);
            });
    }
});

router.get('/:id', (req, res) => {
    const productId: number = +req.params.id;
    ProductModel.findOne({'id': productId}, {'_id': 0}).exec().then(
        (data) => {
            res.json(data);
        });
});


export default router;