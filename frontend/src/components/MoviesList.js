import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const retrieveMovies = () => {
    MovieDataService.getAll()
      .then(response => {
        setMovies(response.data.movies);
      })
      .catch(e => console.error(e));
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then(response => {
        setRatings(response.data);
      })
      .catch(e => console.error(e));
  };

  const onChangeSearchTitle = (e) => setSearchTitle(e.target.value);
  const onChangeSearchRating = (e) => setSearchRating(e.target.value);

    const findByTitle = () => {
    MovieDataService.findByTitle(searchTitle)
      .then(response => setMovies(response.data.movies))
      .catch(e => console.error(e));
  };

  const findByRating = () => {
    if (searchRating === "") {
      retrieveMovies();
    } else {
      MovieDataService.findByRating(searchRating)
        .then(response => setMovies(response.data.movies))
        .catch(e => console.error(e));
    }
  };

  return (
    <div className="container mt-3">
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <Button onClick={findByTitle} className="mt-2">Search</Button>
        </Col>

        <Col>
          <Form.Select value={searchRating} onChange={onChangeSearchRating}>
            <option value="">All Ratings</option>
            {ratings.map((rating, i) => (
              <option value={rating} key={i}>{rating}</option>
            ))}
          </Form.Select>
          <Button onClick={findByRating} className="mt-2">Search</Button>
        </Col>
      </Row>
      <Row xs={1} md={2} className="g-4 mt-4">
        {movies.map((movie, i) => (
          <Col key={i}>
            <Card>
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.plot}</Card.Text>
                <Card.Text><strong>Rating:</strong> {movie.rated}</Card.Text>
                <Button href={`/movies/${movie._id}`}>View Reviews</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MoviesList;
