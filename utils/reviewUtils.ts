import ReviewModel, {ReviewInterface} from "../model/review.js";
import {Schema} from "mongoose";

/**
 * Creates a new review
 * @param reviewData : {description, userID, productID, stars, date} - review information
 * @returns ReviewInterface - the new review
 */
export const createNewReview = async (reviewData: ReviewInterface) => {
    const review = new ReviewModel({
        description: reviewData.description,
        userID: reviewData.userID,
        productID: reviewData.productID,
        stars: reviewData.stars,
        title: reviewData.title
    })

    return await review.save();
}

/**
 * Updates a review
 * @param reviewData : {description, userID, productID, stars, date} - review information
 * @returns ReviewInterface - the updated review
 */
export const updateReview = async (reviewData: ReviewInterface) => {
    return ReviewModel.findOneAndUpdate({"userID": reviewData.userID, "productID": reviewData.productID},
        {
            "title": reviewData.title,
            "description": reviewData.description,
            "stars": reviewData.stars,
            "date": new Date().toISOString()
        }, {new: true})
}