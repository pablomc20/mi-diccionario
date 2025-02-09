import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ThemeToggle from '../features/theme/ThemeToggle';

function Menu() {
    return (
        <Container className="vh-100 d-flex flex-column justify-content-center text-center p-0">
            <h1>Vocabulario de Inglés</h1>

            <ThemeToggle />

            <Link to="/vocabulary" className="btn btn-outline-primary mt-4">
                Ver vocabulario
            </Link>
        </Container>
    );
}

export default Menu;