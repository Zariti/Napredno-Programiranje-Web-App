import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../src/css/ProductEdit.css'; // Uvezivanje CSS datoteke

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [alcoholPercentage, setAlcoholPercentage] = useState('');
    const [color, setColor] = useState('');
    const [type, setType] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [error, setError] = useState('');


    const [manufacturers, setManufacturers] = useState([]);
     
    useEffect(() => {
        const token = localStorage.getItem('token'); // uzimamo token iz localStorage
        if (!token) {
            console.log('No token found');
            return; // ako nema tokena, ne saljemo zahtjev
        }
        fetch('http://localhost:5000/api/manufacturers', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => setManufacturers(data))
        .catch(err => console.log(err));
    }, []);
    

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            console.log('No token found');
            return; 
        }
        fetch(`http://localhost:5000/api/products/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                setName(data.name);
                setPrice(data.price);
                setAlcoholPercentage(data.alcoholPercentage);
                setColor(data.color);
                setType(data.type);
                setManufacturer(data.manufacturer._id); 
            })
            .catch(() => setError('Error fetching product'));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token'); 
            if (!token) {
                console.log('No token found');
                return; 
            }
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'PUT',
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
                setError('Failed to update product');
            }
        } catch (err) {
            setError('Error: ' + err.message);
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-edit-container">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit} className="product-edit-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="number"
                    value={alcoholPercentage}
                    onChange={(e) => setAlcoholPercentage(e.target.value)}
                    required
                />
                <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                >
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
                >
                    <option value="" disabled>Select Manufacturer</option>
                    {manufacturers.map((m) => (
                        <option key={m._id} value={m._id}>
                            {m.name} ({m._id})
                        </option>
                    ))}
                </select>
                <button type="submit">Update Product</button>
            </form>
            <Link to={`/`}>
                    <button className="home-btn">Home</button>
            </Link>
            {error && <p>{error}</p>}
        </div>
    );
};

export default ProductEdit;
