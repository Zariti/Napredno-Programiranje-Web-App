/*
import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

const ManufacturerDetails = () => {
    const { id } = useParams(); // uzima id
    const [manufacturer, setManufacturer] = useState(null);
    const token = localStorage.getItem('token'); 
    if (!token) {
        console.log('No token found');
        return; 
    }
    useEffect(() => {
        fetch(`http://localhost:5000/api/manufacturers/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        .then(response => response.json())
        .then(data => setManufacturer(data))
        .catch(err => console.log(err));
    }, [id])

    if (!manufacturer) {
        return <div>no manufacturer</div>
    }

    return ( 
        <div>
            <h2>
                {manufacturer.name}
            </h2>
            <p>Founded: {manufacturer.founded}</p>
            <p>Country: {manufacturer.country}</p>
            <p>Description: {manufacturer.description}</p>
            <p>Logo: {manufacturer.logoUrl}</p>
            <Link to={`/`}>
                <button>Home</button>
            </Link>
        </div>
    )
}

export default ManufacturerDetails;
*/


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../src/css/ManufacturerDetails.css'; // Uvezivanje CSS datoteke

const ManufacturerDetails = () => {
    const { id } = useParams();
    const [manufacturer, setManufacturer] = useState(null);

    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found');
        return;
    }

    useEffect(() => {
        fetch(`http://localhost:5000/api/manufacturers/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => setManufacturer(data))
            .catch(err => console.log(err));
    }, [id]);

    if (!manufacturer) {
        return <div className="no-manufacturer">No manufacturer found</div>;
    }

    return (
        <div className="manufacturer-details-container">
            <div className="manufacturer-card">
                <h2 className="manufacturer-name">{manufacturer.name}</h2>
                <p className="manufacturer-info"><strong>Founded:</strong> {manufacturer.founded}</p>
                <p className="manufacturer-info"><strong>Country:</strong> {manufacturer.country}</p>
                <p className="manufacturer-info"><strong>Description:</strong> {manufacturer.description}</p>
            
                <Link to={`/`}>
                    <button className="home-btn">Home</button>
                </Link>
            </div>
        </div>
    );
};

export default ManufacturerDetails;
