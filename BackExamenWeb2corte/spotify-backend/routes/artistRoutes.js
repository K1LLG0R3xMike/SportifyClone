const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

router.get('/', artistController.getArtists);

router.get('/:genreId', artistController.getArtistsByGenre);

module.exports = router;