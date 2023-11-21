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

let server = app.listen(3000, function () {
  console.log('App listening on port 3000');
});

module.exports = server;
