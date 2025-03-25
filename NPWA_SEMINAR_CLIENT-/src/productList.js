import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// OVA KOMPONENTA SE NE KORISTI SVE JE U Home.js
const ProductList = () => {
    const [products, setProducts] = useState([]);

   
    const fetchProducts = () => {
        fetch('http://localhost:5000/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((err) => console.log(err));
    };

    
    useEffect(() => {
        fetchProducts();
    }, []);

    
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
            });

            
            fetchProducts();
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    const handleEdit = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'PUT',
            });

           
            fetchProducts();
        } catch (err) {
            console.error('Error editing product:', err);
        }
    };

    return (
        <div>
            <h1>Products List</h1>
            <ul>
                {products.map((product) => (
                    <div key={product._id}>
                        <p>{product.name}</p>
                        <Link to={`/product/${product._id}`}>
                            <button>Details</button>
                        </Link>
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                        <Link to={`/edit-product/${product._id}`}>
                            <button>Edit</button>
                        </Link>

                        <hr />
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
