import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const retrieveMovies = () => {
    setLoading(true);
    setError(null);
    MovieDataService.getAll(currentPage)
      .then(response => {
        console.log("Movies response:", response.data);
        setMovies(response.data.movies || []);
        setLoading(false);
      })
      .catch(e => {
        console.error("Error fetching movies:", e);
        setError("Failed to fetch movies");
        setLoading(false);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then(response => {
        console.log("Ratings response:", response.data);
        if (response.data && response.data.rating) {
          setRatings(["All Ratings"].concat(response.data.rating));
        }
      })
      .catch(e => {
        console.error("Error fetching ratings:", e);
      });
  };

  const onChangeSearchTitle = e => {
    setSearchTitle(e.target.value);
  };

  const onChangeSearchRating = e => {
    setSearchRating(e.target.value);
  };

  const findByTitle = () => {
    setLoading(true);
    setError(null);
    MovieDataService.findByTitle(searchTitle, currentPage)
      .then(response => {
        console.log("Search by title response:", response.data);
        setMovies(response.data.movies || []);
        setLoading(false);
      })
      .catch(e => {
        console.error("Error searching by title:", e);
        setError("Failed to search movies");
        setLoading(false);
      });
  };

  const findByRating = () => {
    setLoading(true);
    setError(null);
    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      MovieDataService.findByRating(searchRating, currentPage)
        .then(response => {
          console.log("Search by rating response:", response.data);
          setMovies(response.data.movies || []);
          setLoading(false);
        })
        .catch(e => {
          console.error("Error searching by rating:", e);
          setError("Failed to search movies");
          setLoading(false);
        });
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Movies List</h2>
      
      <div className="row mb-3">
        <div className="col-md-6">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <Button 
              variant="primary"
              onClick={findByTitle}
              className="mt-2"
            >
              Search
            </Button>
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group>
            <Form.Select 
              onChange={onChangeSearchRating}
              value={searchRating}
            >
              {ratings.map((rating, i) => (
                <option value={rating} key={i}>
                  {rating}
                </option>
              ))}
            </Form.Select>
            <Button
              variant="primary"
              onClick={findByRating}
              className="mt-2"
            >
              Search
            </Button>
          </Form.Group>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <div className="row">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <div className="col-lg-4 pb-3" key={movie._id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">
                      Rating: {movie.rated || 'Not rated'}
                    </p>
                    <p className="card-text">
                      {movie.plot ? (
                        movie.plot.length > 150 
                          ? `${movie.plot.substring(0, 150)}...` 
                          : movie.plot
                      ) : 'No plot available'}
                    </p>
                    <Link 
                      to={`/movies/${movie._id}`}
                      className="btn btn-primary"
                    >
                      View Reviews
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No movies found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MoviesList;