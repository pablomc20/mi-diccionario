import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../features/theme/ThemeToggle';

function Menu() {
    return (
        <div className="container vh-100 d-flex flex-column justify-content-center text-center">
            <h1>Vocabulario de Inglés</h1>

            <ThemeToggle />

            <Link to="/vocabulary" className="btn btn-outline-primary mt-4">
                Ver vocabulario
            </Link>
        </div>
    );
}

export default Menu;