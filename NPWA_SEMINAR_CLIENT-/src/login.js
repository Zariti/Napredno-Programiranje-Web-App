

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/css/Login.css';  // Importiraj CSS datoteku za login

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    

    const submitForm = (e) => {
        e.preventDefault(); 
    
        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Invalid email or password'); 
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('token', data.token); // Sprema token u localStorage
            navigate('/'); // Preusmerava na početnu stranicu
        })
        .catch((err) => {
            alert(err.message); // Prikazuje alert sa porukom o grešci
            navigate('/login'); // Vraća korisnika na login stranicu
        });
    };
    
    return (
        <form onSubmit={submitForm} className='login-form'>
            <h2>Login</h2>
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
            <button type="submit">Login</button>
            <div>
                <p>If you don't have an account, you can register here:</p>
                <button type="button" onClick={() => navigate('/register')}>
                    Register
                </button>
            </div>
        </form>
    );
};

export default Login;
