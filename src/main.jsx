import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Checkout from './Checkout';
import './index.css'


ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);