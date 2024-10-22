// routes/itemRoutes.js
const express = require('express');
const { getItems } = require('../controllers/imageController');

const router = express.Router();

// Ruta para obtener los items
router.get('/', getItems);

module.exports = router;
