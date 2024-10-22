// controllers/playlistController.js
const Playlist = require('../models/playlists');
const Song = require('../models/song');

// controllers/playlistController.js
exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('songs'); // Asegúrate de que 'songs' esté poblado
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPlaylist = async (req, res) => {
  const { name, songs } = req.body;

  try {
    const newPlaylist = await Playlist.create({ name, songs });
    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.addSongToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;

  if (!playlistId || !songId) {
      return res.status(400).send({ error: 'Los IDs de playlist y canción son obligatorios.' });
  }

  try {
      // Lógica para añadir la canción a la playlist
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
          return res.status(404).send({ error: 'Playlist no encontrada.' });
      }

      // Añadir la canción a la playlist, suponiendo que tienes un campo `songs`
      playlist.songs.push(songId);
      await playlist.save();

      return res.status(200).send({ message: 'Canción añadida a la playlist.' });
  } catch (error) {
      console.error('Error en el controlador:', error);
      return res.status(500).send({ error: 'Error al añadir la canción a la playlist.' });
  }
};
