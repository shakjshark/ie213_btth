import express, { json } from 'express';
import cors from 'cors';
import movies from './api/movies.route.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/movies", movies);
app.use('*', (req, res) => {
    res.status(404).json({ error: "Page Not Found" });
});

// Add port listening
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

export default app;