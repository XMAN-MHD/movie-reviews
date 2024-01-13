// import modules
import express from 'express'
import MoviesController from './movies.controller.js' // get access to moviesController
import ReviewsController from './reviews.controller.js' // get access to reviewsController
// create a router
const router = express.Router() // get access to express router
// create routes for the server
router.route('/').get(MoviesController.apiGetMovies)
// reviews routes
router
.route("/review")
.post(ReviewsController.apiPostReview)
.put(ReviewsController.apiUpdateReview)
.delete(ReviewsController.apiDeleteReview)
router.route("/id/:id").get(MoviesController.apiGetMovieById)
router.route("/ratings").get(MoviesController.apiGetRatings)
// export the router
export default router;
