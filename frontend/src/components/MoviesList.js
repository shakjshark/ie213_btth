import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import { Card, Form, Row, Col, Button, Container } from "react-bootstrap";

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
        setMovies(response.data.movies);
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
        setRatings(["All Ratings"].concat(response.data.rating));
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
        setMovies(response.data.movies);
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
          setMovies(response.data.movies);
          setLoading(false);
        })
        .catch(e => {
          console.error("Error searching by rating:", e);
          setError("Failed to search movies");
          setLoading(false);
        });
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <Button 
              variant="primary"
              type="button"
              onClick={findByTitle}
              className="mt-2"
            >
              Search
            </Button>
          </Form.Group>
        </Col>
        <Col md={6}>
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
              type="button"
              onClick={findByRating}
              className="mt-2"
            >
              Search
            </Button>
          </Form.Group>
        </Col>
      </Row>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <Col key={movie._id}>
              <Card className="h-100">
                {movie.poster && (
                  <Card.Img 
                    variant="top" 
                    src={movie.poster} 
                    alt={movie.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    Rating: {movie.rated || 'Not rated'}
                  </Card.Text>
                  <Card.Text>
                    {movie.plot ? (
                      movie.plot.length > 150 
                        ? `${movie.plot.substring(0, 150)}...` 
                        : movie.plot
                    ) : 'No plot available'}
                  </Card.Text>
                  <Link 
                    to={`/movies/${movie._id}`} 
                    className="btn btn-primary"
                  >
                    View Reviews
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <div className="text-center mt-5">No movies found</div>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default MoviesList;