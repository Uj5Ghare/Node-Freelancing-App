// Import the necessary modules
const express = require('express');
const path = require('path');

// Create an instance of express
const app = express();

// Set the public directory to serve static files
app.use(express.static(path.join(__dirname, 'spering-html')));

// Define a route to render the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'spering-html'));
});

// Start the server on port 3000
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

