// routes/playlistRoutes.js
const express = require('express');
const { getPlaylists, createPlaylist, addSongToPlaylist } = require('../controllers/playlistController');
const router = express.Router();

router.get('/', getPlaylists);
router.post('/createPlaylist', createPlaylist);
router.post('/add-song', addSongToPlaylist); // Para agregar canción a una playlist

module.exports = router;
