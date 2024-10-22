// controllers/songController.js
const Song = require('../models/song'); // Asegúrate de que el modelo sea el correcto

// Obtener todas las canciones con imágenes y URLs de YouTube
exports.getItems = async (req, res) => {
  try {
    const items = await Song.find(); // Obtener los items de la base de datos
    const itemsWithImage = items.map(item => ({
      ...item.toObject(), // Copiamos el objeto original
      image: item.imageUrl, // Usamos la URL directamente
    }));
    
    res.json(itemsWithImage); // Enviamos los datos con la imagen
  } catch (error) {
    res.status(500).json({ error: 'Error fetching items' });
  }
};

// Crear una nueva canción
exports.createSong = async (req, res) => {
  const { title, artist, genre, imageUrl, audioUrl, youtubeUrl } = req.body;

  const newSong = new Song({
    title,
    artist,
    genre,
    imageUrl,
    audioUrl,
    youtubeUrl // Añadimos el nuevo campo
  });

  try {
    await newSong.save(); // Guardamos la canción en la base de datos
    res.status(201).json(newSong); // Enviamos la canción creada
  } catch (error) {
    res.status(400).json({ error: 'Error creating song' });
  }
};

// Obtener canciones por artista
exports.getSongsByArtist = async (req, res) => {
  const { artistId } = req.params;
  const songs = await Song.find({ artist: artistId });
  res.json(songs);
};

// Obtener detalles de una canción
exports.getSongDetails = async (req, res) => {
  const { songId } = req.params;
  const song = await Song.findById(songId);
  res.json(song);
};

// Obtener todas las canciones
exports.getSongs = async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
};
