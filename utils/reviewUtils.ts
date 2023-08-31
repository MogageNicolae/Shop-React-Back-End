import ReviewModel, {ReviewInterface} from "../model/review.js";

/**
 * Creates a new review
 * @param reviewData : {description, userID, productID, stars, date} - review information
 * @returns ReviewInterface - the new review
 */
export const createNewReview = async (reviewData: ReviewInterface) => {
    const review = new ReviewModel({
        description: reviewData.description,
        userId: reviewData.userId,
        productId: reviewData.productId,
        rating: reviewData.rating,
        title: reviewData.title
    })

    return await review.save();
}