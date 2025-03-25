import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/css/Register.css';  // Importiraj CSS datoteku za login

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('user'); // defaultna ruta
    const navigate = useNavigate(); 

    const submitForm = (e) => {
        e.preventDefault(); 
        fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role }),
        })
            .then(response => response.json())
            .then(() => {
                navigate('/login'); 
            })
            .catch(err => console.log(err)); 
    };

    return (
        <form className="register-form" onSubmit={submitForm}>
            <h2>Register</h2>
            <input
                type="email"
                placeholder="Email here"
                value={email}
                onChange={(el) => setEmail(el.target.value)}
                required
            />
            
            <input
                type="password"
                placeholder="Password here"
                value={password}
                onChange={(el) => setPassword(el.target.value)}
                required
            />

            <select value={role} onChange={(el) => setRole(el.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
