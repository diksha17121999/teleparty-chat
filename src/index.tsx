import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import './index.css';

// Get the root element from your HTML file
const container = document.getElementById('root');

// Create a root for the app
const root = createRoot(container!); // Use the non-null assertion operator (!) to tell TypeScript that container is not null

// Render the app inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);