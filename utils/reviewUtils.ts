import ReviewModel, {ReviewInterface} from "../model/review.js";

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
        date: new Date().toISOString()
    })

    return await review.save();
}