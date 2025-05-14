import http from "../http-common";

class MovieDataService {
  getAll(page = 0) {
    return http.get(`/movies?page=${page}`);
  }

  get(id) {
    return http.get(`/movies/id/${id}`);
  }

  find(query, by = "title", page = 0) {
    return http.get(`/movies?${by}=${query}&page=${page}`);
  }

  findByTitle(title, page = 0) {
    return this.find(title, "title", page);
  }

  findByRating(rating, page = 0) {
    return this.find(rating, "rated", page);
  }

  getRatings() {
    return http.get(`/movies/ratings`);
  }

  createReview(data) {
    return http.post("/movies/review", data);
  }

  updateReview(data) {
    return http.put("/movies/review", data);
  }

  deleteReview(id, userId) {
    return http.delete("/movies/review", {
      data: {
        review_id: id,
        user_id: userId
      }
    });
  }
}

export default new MovieDataService();