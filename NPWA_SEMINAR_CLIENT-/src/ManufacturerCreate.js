import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../src/css/ManufacturerCreate.css';


const ManufacturerCreate = () => {
    const [name, setName] = useState('');
    const [foundedYear, setFoundedYear] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = localStorage.getItem('token'); 
            if (!token) {
                console.log('No token found');
                return; 
            }
            const response = await fetch('http://localhost:5000/api/manufacturers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    foundedYear,
                    country,
                    description,
                    logoUrl,
                }),
            });

            if (response.ok) {
                navigate('/manufacturers');
            } else {
                setError('Failed to create manufacturer');
            }
        } catch (err) {
            setError('Error: ' + err.message);
        }
    };

    return (
        <div className="manufacturer-create-container">
            <h2 className="form-title">Create New Manufacturer</h2>
            <form className="manufacturer-create-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="number"
                    placeholder="Founded Year"
                    value={foundedYear}
                    onChange={(e) => setFoundedYear(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="form-input"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                />
                <input
                    type="text"
                    placeholder="Logo URL"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="form-input"
                />
                <button type="submit" className="form-button">Create Manufacturer</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <br />
            <Link to={`/`}>
                <button className="home-button">Home</button>
            </Link>
        </div>
    );
}

export default ManufacturerCreate;
