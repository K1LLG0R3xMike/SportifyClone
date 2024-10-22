const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');



router.get('/', songController.getSongs);
router.get('/artist/:artistId', songController.getSongsByArtist);
router.get('/:songId', songController.getSongDetails);

module.exports = router;
