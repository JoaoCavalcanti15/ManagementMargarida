// Importing React library
import React from 'react';
// Importing ReactDOM library for rendering React components
import ReactDOM from 'react-dom';
// Importing global CSS styles
import './index.css';
// Importing the main App component
import App from './App';
// Importing BrowserRouter for routing
import { BrowserRouter } from 'react-router-dom';
// Importing CSS for react-toastify notifications
import 'react-toastify/dist/ReactToastify.css';

// Rendering the main App component inside the root element with routing support
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') // Targeting the root element in the HTML
);