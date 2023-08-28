import express from "express";
import bodyParser from "body-parser";
import ReviewModel from "../model/review.js";
import {createNewReview} from "../utils/reviewUtils.js";
import {checkToken} from "../utils/defaultUtils.js";

const router = express.Router();
const jsonParser = bodyParser.json()

router.get('/', jsonParser, async (req, res) => {
    ReviewModel.find({productID: req.body.productID}).exec().then(
        (data) => {
            if (data.length > 0) {
                res.json(data)
            }
            else {
                res.status(401).send({"message": "This product has no reviews"})
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

export default router;