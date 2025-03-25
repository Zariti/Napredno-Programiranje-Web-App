import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // izbrise token iz localStoraga
        navigate('/login'); // preusmjeri  na login stranicu poslije logouta
    };

    return (
        <button onClick={handleLogout} style={{ padding: '10px 20px', margin: '10px' }}>
            Logout
        </button>
    );
};

export default LogoutButton;
