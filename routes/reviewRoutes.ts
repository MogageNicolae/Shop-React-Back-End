import express from "express";
import bodyParser from "body-parser";
import ReviewModel from "../model/review.js";
import {createNewReview} from "../utils/reviewUtils.js";
import {checkToken} from "../utils/defaultUtils.js";
import ClientModel from "../model/client.js";

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/product/:productId', jsonParser, async (req, res) => {
    ReviewModel.find({productId: req.params.productId}).sort({date : -1}).exec().then(
        (data) => {
            const reviews: object[] = data.map((review) => {
                return ClientModel.findById({_id: review.userId}).exec().then(
                    (clientData) => {
                        if (clientData === null) return;
                        return {review, userName: clientData.name};
                    })
            })
            Promise.all(reviews).then((reviewsWithUserNames) => {
                const validReviews = reviewsWithUserNames.filter((item) => item !== null);
                res.json(validReviews);
            });
        })
})

router.get('/user/:userId', jsonParser, async (req, res) => {
    ReviewModel.find({userId: req.params.userId}).exec().then(
        (data) => {
            if (data.length > 0) {
                res.json(data);
            } else {
                res.status(401).send({"message": "This user has no reviews"});
            }
        })
})

router.post('/', jsonParser, async (req, res) => {
    const clientId = req.body.userId;
    const next = () => {
        createNewReview(req.body).then((data) => res.json(data));
    }
    checkToken(req, res, clientId, next);
})

router.delete('/:reviewId', jsonParser, async (req, res) => {
    const reviewId = req.params.reviewId;

    const next = () => ReviewModel.findOneAndDelete({"_id": reviewId})
        .then((review) => {
            if (review === null) {
                res.status(401).send({"message": "Review not found"});
                return;
            }
            ReviewModel.find({productId: review.productId})
        }).then((reviews) => res.json(reviews));
    checkToken(req, res, req.body.userId, next);
})

export default router;