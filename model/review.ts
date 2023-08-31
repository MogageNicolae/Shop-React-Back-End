import {model, Schema} from "mongoose";

export interface ReviewInterface {
    description: string,
    userId: string,
    productId: number,
    rating: number,
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
        userId: {
            type: String,
            required: true
        },
        productId: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }
);

const ReviewModel = model("review", reviewSchema);

export default ReviewModel;