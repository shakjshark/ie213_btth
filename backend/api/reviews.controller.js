import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = req.body.movie_id;
            const review = req.body.review;

            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            };

            const date = new Date();

            const ReviewResponse = await ReviewsDAO.addReview(
                movieId, review, userInfo, date
            );

            res.json({
                success: true,
                message: 'Review created successfully!',
                review: ReviewResponse
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Create new review failed, error: ${error.message}`
            });
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const review = req.body.review;
            const userId = req.body.user_id;
            const date = new Date();

            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId, userId, review, date
            );

            var {error} = ReviewResponse;
            if (error) {
                console.log("Error");
            }

            if (ReviewResponse.modifiedCount === 0) {
                throw new Error("Unable to update review - maybe user not authorized");
            }

            res.json({
                success: true,
                message: 'Review updated successfully!',
                review: review
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Update review failed, error: ${error.message}`
            });
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const userId = req.body.user_id;

            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId, userId
            );

            res.json({
                success: true,
                message: 'Review deleted successfully!'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Delete review failed, error: ${error.message}`
            });
        }
    }
}
