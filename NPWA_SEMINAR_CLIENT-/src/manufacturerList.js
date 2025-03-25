import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../src/css/ManufacturerList.css';  // Importiraj CSS datoteku za ManufacturerList

const ManufacturerList = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [role, setRole] = useState('');
    
    const fetchManufacturers = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return; 
        }

        try {
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.role);
        } catch (err) {
            console.log(err);
            return;
        }

        fetch('http://localhost:5000/api/manufacturers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setManufacturers(data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchManufacturers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return; 
            }

            await fetch(`http://localhost:5000/api/manufacturers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            // Nakon brisanja osvježi listu
            fetchManufacturers();
        } catch (err) {
            console.error('Error deleting manufacturer:', err);
        }
    };

    return (
        <div className="manufacturer-container">
            <h1>Manufacturers</h1>
            <ul className="manufacturer-list">
                {manufacturers.map(manufacturer => (
                    <div key={manufacturer._id} className="manufacturer-item">
                        <p>{manufacturer.name}</p>
                        <Link to={`/manufacturer/${manufacturer._id}`}>
                            <button>Details</button>
                        </Link>
                        {role === 'admin' && (
                            <>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(manufacturer._id)}
                                >
                                    Delete
                                </button>
                                <Link to={`/edit-manufacturer/${manufacturer._id}`}>
                                    <button className="edit-btn">Edit</button>
                                </Link>
                            </>
                        )}
                        <hr />
                    </div>
                ))}
            </ul>
            <Link to={`/`}>
                <button className="home-btn">Home</button>
            </Link>
        </div>
    );
};

export default ManufacturerList;
