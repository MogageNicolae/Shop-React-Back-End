import express from "express";
import bodyParser from "body-parser";
import ReviewModel from "../model/review.js";
import {createNewReview} from "../utils/reviewUtils.js";
import {checkToken} from "../utils/defaultUtils.js";

const router = express.Router();
const jsonParser = bodyParser.json()

router.get('/product/:productID', jsonParser, async (req, res) => {
    ReviewModel.find({productID: req.params.productID}).exec().then(
        (data) => {
            if (data.length > 0) {
                res.json(data)
            }
            else {
                res.status(401).send({"message": "This product has no reviews"})
            }
        })
})

router.get('/user/:userID', jsonParser, async (req, res) => {
    ReviewModel.find({userID: req.params.userID}).exec().then(
        (data) => {
            if (data.length > 0) {
                res.json(data)
            }
            else {
                res.status(401).send({"message": "This user has no reviews"})
            }
        })
})

router.post('/', jsonParser, async (req, res) => {
    const clientID = req.body.userID
    const next = () => {
        createNewReview(req.body).then((data) => res.json(data))
    }
    checkToken(req, res, clientID, next)
})

router.delete('/:reviewID', async (req, res) => {
    const reviewID = req.params.reviewID

    ReviewModel.deleteOne({"_id": reviewID}).then((reviews) => res.json(reviews))
})

export default router;