/*
import React, {useState, useEffect, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';



const ProductDetails = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);

    

    const token = localStorage.getItem('token'); 
    if (!token) {
        console.log('No token found');
    return; 
    }
    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(err => console.log(err));
    }, [id])

    if (!product) {
        return <div>no product</div>
    }

   

    return ( 
        <div>
            <h2>
                {product.name}
            </h2>
            <p>Price: {product.price}</p>
            <p>Alcohol: {product.alcoholPercentage}</p>
            <p>Type: {product.type}</p>
            <p>Manufacturer: {product.manufacturer.name}</p>
            <br/>                                 
            <br/>
            <Link to={`/`}>
                <button>Home</button>
            </Link>
        </div>
    )
}

export default ProductDetails;
*/

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../src/css/ProductDetails.css'; // Uvezivanje CSS datoteke

const ProductDetails = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);

    const token = localStorage.getItem('token'); 
    if (!token) {
        console.log('No token found');
        return; 
    }

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(err => console.log(err));
    }, [id]);

    if (!product) {
        return <div className="no-product">No product found</div>;
    }

    return ( 
        <div className="product-details-container">
            <div className="product-card">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-info"><strong>Price:</strong> ${product.price}</p>
                <p className="product-info"><strong>Alcohol Content:</strong> {product.alcoholPercentage}%</p>
                <p className="product-info"><strong>Type:</strong> {product.type}</p>
                <p className="product-info"><strong>Manufacturer:</strong> {product.manufacturer.name}</p>
                <Link to={`/`}>
                    <button className="home-btn">Home</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductDetails;
