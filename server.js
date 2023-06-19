const mongoose = require('mongoose');
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// current working directory
const cwd = process.cwd(); 

const PORT = process.env.PORT || 3001;
const app = express();

const activity = cwd.includes('heroku') ? 'production' : 'development';

// parse incoming req.body data
app.use(express.urlencoded({ extended: true })); 
// parse incoming JSON data
app.use(express.json()); 
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} in ${activity} mode!`);
    });
});
