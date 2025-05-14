import mongodb, { ObjectId } from 'mongodb';

let reviews;

export default class ReviewsDAO {
    static async injectDB(connection) {
        if (reviews) {
            return;
        }

        try {
            reviews = await connection.db(process.env.MOVIEREVIEWS_NS).collection('reviews');
        } catch (error) {
            console.error(`Unable to establish connection handle in reviewsDAO: ${error}`);
        }
    }
    static async addReview(movieId, review, userInfo, date) {
        try {
            const reviewDoc = {
                name: userInfo.name,
                user_id: userInfo._id,
                date: date,
                review: review,
                movie_id: new ObjectId(String(movieId))
            };

            return await reviews.insertOne(reviewDoc);
        } catch (error) {
            console.error(`Unable to post review, error: ${error}`);
            return { error: error };
        }
    }
    static async updateReview(reviewId, userId, review, date) {
        try {
            const updateResponse = await reviews.updateOne(
                {
                    _id: new ObjectId(String(reviewId)),
                    user_id: userId
                },
                {
                    $set: {
                        review: review,
                        date: date
                    }
                }
            );
            return updateResponse;
        } catch (error) {
            console.error(`Unable to update review: ${error}`);
            return { error };
        }
    }
    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(String(reviewId)),
                user_id: userId
            });
            return deleteResponse;
        } catch (error) {
            console.error(`Unable to delete review: ${error}`);
            return { error };
        }
    }    
}