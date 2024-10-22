const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
  imageUrl: { type: String, required: true }, // URL de la imagen en Firebase
  audioUrl: { type: String, required: true }, // URL del archivo de audio en Firebase
  youtubeUrl: { type: String } // URL de la canción en YouTube (opcional)
});

// Exporta el modelo
module.exports = mongoose.model('Song', songSchema);
