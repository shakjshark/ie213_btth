import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar.js";
import MoviesList from "./components/MoviesList.js";
import Movie from "./components/Movie.js";
import AddReview from "./components/AddReview.js";
import Login from "./components/Login.js";
function App() {
  return (
    <Router>
      <NavigationBar /> 
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/movies/:id/review" element={<AddReview />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
