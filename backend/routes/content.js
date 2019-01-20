const express = require('express');

const contentController = require('../controllers/content');

const router = express.Router();

// GET all backstage content
router.get('/content/:economyAddress', contentController.getContent);

// POST new content
router.post('/content/:economyAddress', contentController.postContent);


module.exports = router;