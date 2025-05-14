import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function NavigationBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (user) {
      setUser(null);
      navigate("/");
    } else {
      setUser({ name: "22521171" });
      navigate("/");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
            <Nav.Link as={Link} to="/add-review">Add Review</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-2">Hello, {user.name}</Navbar.Text>
                <Button variant="outline-light" onClick={handleLoginLogout}>Logout</Button>
              </>
            ) : (
              <Button variant="outline-light" onClick={handleLoginLogout}>Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
