const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');
const contentRoutes = require('./routes/content');

app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  return next();
});

app.use(userRoutes);
app.use(contentRoutes);

mongoose.connect('mongodb+srv://achill:w8BG6xR351pqX6DC@cluster0-xfiey.mongodb.net/tokens')
.then(_ => {
  app.listen(3002);
})
.catch(console.error);
