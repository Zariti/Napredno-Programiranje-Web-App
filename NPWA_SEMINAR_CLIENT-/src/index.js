import React from 'react';
import ReactDOM from 'react-dom/client';    // i dodat /client za react 18+
import App from './App';

//ReactDOM.render(<App />, document.getElementById('root')); ovo za starije verzije react 
const root = ReactDOM.createRoot(document.getElementById('root'));  // ovo za react 18+

root.render(<App />);
