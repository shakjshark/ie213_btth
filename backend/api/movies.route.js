import express from 'express';
import MoviesController from './movies.controller.js';
import ReviewsController from './reviews.controller.js';

const router = express.Router();

// router.route('/').get((req, res) => res.send('hello world'));
router.route('/').get(MoviesController.apiGetMovies);
router.route('/review').post(ReviewsController.apiPostReview);
router.route('/review').put(ReviewsController.apiUpdateReview);
router.route('/review').delete(ReviewsController.apiDeleteReview);
router.route('/id/:id').get(MoviesController.apiGetMovieById);
router.route('/ratings').get(MoviesController.apiGetRatings);

export default router;
