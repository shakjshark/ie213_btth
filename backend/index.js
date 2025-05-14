import dotenv from "dotenv";
import app from "./server.js";
import mongodb from "mongodb";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from './dao/reviewsDAO.js';

async function main() {
    dotenv.config();
    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
    const port = process.env.PORT || 8000;

    try {
        // Connect to MongoDB Cluster
        await client.connect();
        await MoviesDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);

        app.listen(port, () => {
            console.log("Server is running on port: " + port);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

main().catch(console.error);