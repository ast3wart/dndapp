import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import './styles/App.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const adminAccount = {
  username: "admin",
  password: "adam123",
};

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([adminAccount]));
}