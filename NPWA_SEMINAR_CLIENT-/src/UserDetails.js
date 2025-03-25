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


const UserDetails = () => {
    const { id } = useParams(); 
    const [user, setUser] = useState(null);

    const token = localStorage.getItem('token'); 
    if (!token) {
        console.log('No token found');
        return; 
    }

    useEffect(() => {
        fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(err => console.log(err));
    }, [id]);
    /*
    if (!product) {
        return <div className="no-product">No product found</div>;
    }
    */
    return ( 
        <div>
            <div>
                <h2>{user.email}</h2>
                <p>Role: {user.role}</p>
                
                <Link to={`/`}>
                    <button className="home-btn">Home</button>
                </Link>
            </div>
        </div>
    );
};

export default UserDetails;
