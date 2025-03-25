import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../src/css/ManufacturerList.css';  // Importiraj CSS datoteku za ManufacturerList


const UsersList = () => {
    const [users, setUsers] = useState([]);
    //const [role, setRole] = useState('');
    
    const fetchUsers = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return; 
        }
        /*
        try {
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.role);
        } catch (err) {
            console.log(err);
            return;
        }
        */
        fetch('http://localhost:5000/api/user-names', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    /*
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return; 
            }

            await fetch(`http://localhost:5000/api/manufacturers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            // Nakon brisanja osvježi listu
            fetchManufacturers();
        } catch (err) {
            console.error('Error deleting manufacturer:', err);
        }
    };
    */
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <div key={user._id}>
                        <p>{user.email}</p>
                        
                        <Link to={`/users/${user._id}`}>
                            <button>Details</button>
                        </Link>
                        <hr />
                    </div>
                ))}
            </ul>
            <Link to={`/`}>
                <button className="home-btn">Home</button>
            </Link>
        </div>
    );
};

export default UsersList;
