import mongodb, { ObjectId } from 'mongodb';

let movies;

export default class MoviesDAO {
    static async injectDB(connection) {
        if (movies) {
            return;
        }
        try {
            movies = await connection.db(process.env.MOVIEREVIEWS_NS).collection('movies');
        } catch (error) {
            console.error(`Unable to connect in MoviesDAO: ${error}`);
        }
    }

    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20,
    } = {}) {

        let query;
        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters['title'] } };
            } else if ("rated" in filters) {
                query = { "rated": { $eq: filters['rated'] } };
            }
        }

        let cursor;
        try {
            cursor = await movies.find(query).limit(moviesPerPage).skip(moviesPerPage * page);
            const moviesList = await cursor.toArray();
            const totalNumMovies = await movies.countDocuments(query);

            return {
                moviesList,
                totalNumMovies
            };
        } catch (error) {
            console.error(`Unable to issue find command, ${error}`);
            return { moviesList: [], totalNumMovies: 0 };
        }
    }
    static async getRatings() {
        let ratings = [];
        try {
            ratings = await movies.distinct("rated");
            return ratings;
        } catch (e) {
            console.error(`Unable to get ratings, ${e}`);
            return ratings;
        }
    }
    static async getMovieById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(String(id))
                    }
                },
                {
                    $lookup: {
                        from: "reviews",              
                        let: { id: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$movie_id", "$$id"]
                                    }
                                }
                            },
                            {
                                $sort: { date: -1 }
                            }
                        ],
                        as: "reviews"
                    }
                }
            ];

            return await movies.aggregate(pipeline).next(); 
        } catch (e) {
            console.error(`Something went wrong in getMovieById: ${e}`);
            throw e;
        }
    }
}