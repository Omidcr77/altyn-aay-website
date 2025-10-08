/* eslint-disable import/first -- we intentionally run theme init before importing CSS to avoid
  a flash of incorrect colors. For a permanent fix, consider adding a small inline
  script in public/index.html that applies the saved theme before the bundle loads. */
import React from 'react';
import ReactDOM from 'react-dom/client';
// apply saved theme early to avoid flash of incorrect colors
const savedTheme = typeof window !== 'undefined' ? window.localStorage?.getItem('theme') : null;
if (savedTheme === 'light') document.documentElement.classList.add('light');
import './index.css';
import App from './App';
import './i18n'; // Import the i18n configuration

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);