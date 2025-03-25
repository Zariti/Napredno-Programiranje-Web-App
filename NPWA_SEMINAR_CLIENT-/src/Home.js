/*
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

import { jwtDecode } from 'jwt-decode'; 
// ovo je zapravo ujedno i productList.js
const Home = () => {
    const [products, setProducts] = useState([]);
    const [role, setRole] = useState(''); 
        


        // dohvaca proizvode sa servera
        const fetchProducts = () => {
            const token = localStorage.getItem('token'); 
            if (!token) {
                console.log('No token found');
                return; 
            }

            try {
                const decodedToken = jwtDecode(token);
                setRole(decodedToken.role); 
            } catch (err) {
                console.error('Invalid token:', err);
                setRole(''); 
                return;
            }

            fetch('http://localhost:5000/api/products', {   
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // dodajemo token u Authorization zaglavlje
                },
            })
                .then((response) => response.json())
                .then((data) => setProducts(data))
                .catch((err) => console.log(err));
        };
    
        // dohvati proizvode kada se komponenta ucita prvi put
        useEffect(() => {
            fetchProducts();
        }, []);
    
        
        const handleDelete = async (id) => {
            const token = localStorage.getItem('token'); 
            if (!token) {
                console.log('No token found');
                return; 
            }
            try {
                await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // dodaje token u auth zaglavlje
                    },
                });
    
                // posli brisanja osvjezi listu
                fetchProducts();
            } catch (err) {
                console.error('Error deleting product:', err);
            }
        };
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Our Store</h1>
            <p>Choose what you want to explore:</p>
            <div>
                <Link to="/manufacturers">
                    <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>View Manufacturers</button>
                </Link>
                {role === 'admin' && (<>
                    <Link to="/create-product">
                        <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Create Product</button>
                    </Link>
                    <Link to="/create-manufacturer">
                        <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Create Manufacturer</button>
                    </Link> </>)
                }
            </div>
                    <div style={{textAlign: 'left'}}>
                        <h1>Products List</h1>
                        <ul>
                            {products.map((product) => (
                                <div key={product._id}>
                                    <p>{product.name}</p>
                                    <Link to={`/product/${product._id}`}>
                                        <button>Details</button>
                                    </Link>
                                    { role === 'admin' && (<> 
                                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                                    <Link to={`/edit-product/${product._id}`}>
                                        <button>Edit</button>
                                    </Link> </>)
                                    }
                                    <hr />
                                </div>
                            ))}
                        </ul>
                    </div>
                    <br/>
                    <LogoutButton />
        </div>

    );
};

export default Home;
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { jwtDecode } from 'jwt-decode'; 
import '../src/css/Home.css'; // Importuj CSS za Home komponentu

const Home = () => {
    const [products, setProducts] = useState([]);
    const [role, setRole] = useState(''); 

    // dohvaca proizvode sa servera
    const fetchProducts = () => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            console.log('No token found');
            return; 
        }

        try {
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.role); 
        } catch (err) {
            console.error('Invalid token:', err);
            setRole(''); 
            return;
        }

        fetch('http://localhost:5000/api/products', {   
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // dodajemo token u Authorization zaglavlje
            },
        })
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((err) => console.log(err));
    };

    // dohvati proizvode kada se komponenta ucita prvi put
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            console.log('No token found');
            return; 
        }
        try {
            await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // dodaje token u auth zaglavlje
                },
            });

            // posli brisanja osvjezi listu
            fetchProducts();
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    
    
    return (
        <div className="home-container">
            <h1>Welcome to Our Store</h1>
            <p>Choose what you want to explore:</p>
            <div>
                <Link to="/manufacturers">
                    <button>View Manufacturers</button>
                </Link>
                {role === 'admin' && (
                    <>
                        <Link to="/create-product">
                            <button>Create Product</button>
                        </Link>
                        <Link to="/create-manufacturer">
                            <button>Create Manufacturer</button>
                        </Link>

                        
                        <Link to="/users-list">
                            <button>View Users</button>
                        </Link>
                    </>
                )}
            </div>

            <div className="products-list">
                <h1>Products List</h1>
                <ul>
                    {products.map((product) => (
                        <div key={product._id} className="product-item">
                            <p>{product.name}</p>
                            <Link to={`/product/${product._id}`}>
                                <button>Details</button>
                            </Link>
                            {role === 'admin' && (
                                <>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/edit-product/${product._id}`}>
                                        <button>Edit</button>
                                    </Link>
                                </>
                            )}
                            <hr/>
                            
                        </div>
                    ))}
                </ul>
            </div>
            <br />
            <LogoutButton />
        </div>
    );
};

export default Home;
