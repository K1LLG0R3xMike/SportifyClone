const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Asegúrate de que la ruta sea correcta

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware para CORS
app.use(cors());

// Middleware para el análisis de JSON
app.use(express.json());

// Importar las rutas
const artistRoutes = require('./routes/artistRoutes');
const genreRoutes = require('./routes/genreRoutes');
const songRoutes = require('./routes/songRoutes');
const playlistRoutes = require('./routes/playlistRoutes');


// Usar las rutas
app.use('/api/artists', artistRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);


// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
