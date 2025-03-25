import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../src/css/ProductCreate.css';


const ProductCreate = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [alcoholPercentage, setAlcoholPercentage] = useState('');
    const [color, setColor] = useState('');
    const [type, setType] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();



    const [manufacturers, setManufacturers] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (!token) {
                console.log('No token found');
                return; 
        }
        fetch('http://localhost:5000/api/manufacturers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        .then(response => response.json())
        .then(data => setManufacturers(data))
        .catch(err => console.log(err));
    }, []);




    const handleSubmit = async (e) => {
        e.preventDefault();  // sprijeci refreshanje stranice
        
        try {
            const token = localStorage.getItem('token'); 
            if (!token) {
                console.log('No token found');
                return; 
            }
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    price,
                    alcoholPercentage,
                    color,
                    type,
                    manufacturer,
                }),
            });

            if (response.ok) {
                navigate('/');
            } else {
                setError('Failed to create product');
            }
        } catch (err) {
            setError('Error: ' + err.message);
        }
    };

    return (
        <div className="product-create-container">
            <h2>Create New Product</h2>
            <form className="product-create-form" onSubmit={handleSubmit}>
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
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="number"
                    placeholder="Alcohol Percentage"
                    value={alcoholPercentage}
                    onChange={(e) => setAlcoholPercentage(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="form-input"
                />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    className="form-select"
                >
                    <option value=''>-- SELECT TYPE --</option>
                    <option value="IPA">IPA</option>
                    <option value="Lager">Lager</option>
                    <option value="Stout">Stout</option>
                    <option value="Porter">Porter</option>
                    <option value="White Chocolate">White Chocolate</option>
                    <option value="Dark Chocolate">Dark Chocolate</option>
                </select>
                <select
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    required
                    className="form-select"
                >
                    <option value="" disabled>Select Manufacturer</option>
                    {manufacturers.map((m) => (
                        <option key={m._id} value={m._id}>
                            {m.name} ({m._id})
                        </option>
                    ))}
                </select>
                <button type="submit" className="form-button">Create Product</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <br />
            <Link to={`/`}>
                <button className="home-button">Home</button>
            </Link>
        </div>
    );
};

export default ProductCreate;
