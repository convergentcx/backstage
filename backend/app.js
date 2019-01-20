const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');

app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(userRoutes);


mongoose.connect('mongodb+srv://achill:w8BG6xR351pqX6DC@cluster0-xfiey.mongodb.net/tokens')
    .then(res => {
        app.listen(3001);
    })
    .catch(err => {
        console.log(err);
    })



