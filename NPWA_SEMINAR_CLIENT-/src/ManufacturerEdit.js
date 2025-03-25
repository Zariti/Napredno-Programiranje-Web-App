import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import '../src/css/ManufacturerEdit.css'; // Uvezivanje CSS datoteke

const ManufacturerEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [manufacturer, setManufacturer] = useState(null);
    const [name, setName] = useState('');
    const [founded, setFoundedYear] = useState(''); // godina otvaranja
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {  
        
        const token = localStorage.getItem('token'); 
        if (!token) {
            console.log('No token found');
            return; 
        }
        
        fetch(`http://localhost:5000/api/manufacturers/${id}`, {
            method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setManufacturer(data);
                setName(data.name);
                setFoundedYear(data.founded);
                setCountry(data.country);
                setDescription(data.description);
                setLogoUrl(data.logoUrl);
            })
            .catch((err) => setError('Error fetching manufacturer'));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token'); 
            if (!token) {
                console.log('No token found');
                return; 
            }
            const response = await fetch(`http://localhost:5000/api/manufacturers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    founded,
                    country,
                    description,
                    logoUrl,
                }),
            });

            if (response.ok) {
                navigate('/manufacturers');
            } else {
                setError('Failed to update manufacturer');
            }
        } catch (err) {
            setError('Error: ' + err.message);
        }
    };

    if (!manufacturer) return <p>Loading...</p>;

   

    return (
        <div className="product-edit-container">
            <h2>Edit Manufacturer</h2>
            <form onSubmit={handleSubmit} className='product-edit-form'>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    value={founded}
                    onChange={(e) => setFoundedYear(e.target.value)}
                    required
                />
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                />
                <button type="submit">Update Manufacturer</button>
            </form>
            <Link to='/'>
                <button className="home-btn">Home</button>
            </Link>
            {error && <p>{error}</p>}
            
        </div>
    );
};

export default ManufacturerEdit;
