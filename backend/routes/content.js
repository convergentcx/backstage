const express = require('express');

const contentController = require('../controllers/content');

const router = express.Router();

// GET backstage content
router.get('/economies', economiesController.getEconomies);