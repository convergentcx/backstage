const express = require('express');
const isAuth = require('../middleware/is-auth');
const contentController = require('../controllers/content');

const router = express.Router();

// GET all backstage content
router.get('/content/:economyAddress', isAuth, contentController.getContent);

// POST new content
router.post('/content/:economyAddress', contentController.postContent);


module.exports = router;