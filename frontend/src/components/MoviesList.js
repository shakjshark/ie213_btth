import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then(response => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch(e => {
        console.error(e);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then(response => {
        console.log(response.data);
        // Update to match the API response structure
        setRatings(["All Ratings"].concat(response.data.rating));
      })
      .catch(e => {
        console.error(e);
      });
  };

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeSearchRating = e => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };

  const findByTitle = () => {
    MovieDataService.findByTitle(searchTitle)
      .then(response => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch(e => {
        console.error(e);
      });
  };

  const findByRating = () => {
    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      MovieDataService.findByRating(searchRating)
        .then(response => {
          console.log(response.data);
          setMovies(response.data.movies);
        })
        .catch(e => {
          console.error(e);
        });
    }
  };

  return (
    <div className="container mt-3">
      <Row>
        <Col>
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
        <Col>
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
      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        {movies && movies.map((movie) => (
          <Col key={movie._id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  Rating: {movie.rated}
                </Card.Text>
                <Card.Text>{movie.plot}</Card.Text>
                <Link to={"/movies/" + movie._id} className="btn btn-primary">
                  View Reviews
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MoviesList;