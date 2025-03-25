import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './productList'; // sve komponente velikim pocetnim slovom
import ProductDetails from './productDetails';
import ManufacturerList from './manufacturerList';
import ManufacturerDetails from './manufacturerDetails';
import Login from './login';
import Register from './register';
import Home from './Home'; // Import Home komponente

import ManufacturerCreate from './ManufacturerCreate';
import ManufacturerEdit from './ManufacturerEdit';
import ProductCreate from './ProductCreate';
import ProductEdit from './ProductEdit';

import UsersList from './UsersList';
import UserDetails from './UserDetails';


import { Navigate } from 'react-router-dom';




const ProtectedRoute = ({ element }) => {
    // uzmemo token iz localStorage
    const token = localStorage.getItem('token');

    // ako token postoji, vracamo prosljedeni element (zasticenu stranicu)
    if (token) {
        return element;
    }

    // ako token ne postoji, preusmeravamo korisnika na login stranicu
    return <Navigate to="/login" />;
};

const App = () => {
    return (
       
        <Router>
            <Routes>
    
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
    
    
                <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/products" element={<ProtectedRoute element={<ProductList />} />} />
                <Route path="/product/:id" element={<ProtectedRoute element={<ProductDetails />} />} />
                <Route path="/manufacturers" element={<ProtectedRoute element={<ManufacturerList />} />} />
                <Route path="/manufacturer/:id" element={<ProtectedRoute element={<ManufacturerDetails />} />} />
    
    
                <Route path="/create-product" element={<ProtectedRoute element={<ProductCreate />}  />} />
                <Route path="/edit-product/:id" element={<ProtectedRoute element={<ProductEdit />}  />} />
                <Route path="/create-manufacturer" element={<ProtectedRoute element={<ManufacturerCreate />}  />} />
                <Route path="/edit-manufacturer/:id" element={<ProtectedRoute element={<ManufacturerEdit />}  />} />

                
                <Route path="/users-list" element={<ProtectedRoute element={<UsersList />} />} />
                <Route path="/users/:id" element={<ProtectedRoute element={<UserDetails />} />} />

            </Routes>
        </Router>
       
       
    );
}

export default App;