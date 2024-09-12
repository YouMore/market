import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const CustomNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link as={Link} to="/advertisment" style={{margin:"0 10px", fontSize:"1.25rem"}}>Объявления</Nav.Link>
                    <Nav.Link as={Link} to="/orders" style={{margin:"0 20px", fontSize:"1.25rem"}}>Заказы</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar;
