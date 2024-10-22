const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para CORS
app.use(cors());

// Configuración y uso de rutas
const appRoutes = require('./app'); // Si estás usando app.js para configurar
app.use('/api', appRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
