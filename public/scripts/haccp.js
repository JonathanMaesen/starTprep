const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'assets' folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));
