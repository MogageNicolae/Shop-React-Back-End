import {model, Schema} from "mongoose";
import {ProductInterface} from "./product";

export interface ReviewInterface {
    description: string,
    userID: string,
    productID: number,
    stars: number,
    date: Date,
    title: string
}

export const reviewSchema = new Schema<ReviewInterface>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true
        },
        productID: {
            type: Number,
            required: true
        },
        stars: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now(),
            required: true
        }
    }
);

const ReviewModel = model("review", reviewSchema);

export default ReviewModel;