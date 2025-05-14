import http from "../http-common";

class MovieDataService {
  getAll() {
    return http.get("/movies");
  }

  get(id) {
    return http.get(`/movies/${id}`);
  }

  createReview(data) {
    return http.post("/reviews", data);
  }

  updateReview(data) {
    return http.put("/reviews", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/reviews?id=${id}&user_id=${userId}`);
  }

  getRatings() {
    return http.get("/movies/ratings");
  }
}

export default new MovieDataService();
