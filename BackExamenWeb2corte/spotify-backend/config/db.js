//V7vh4qBgqQ6Avr8D
// config/db.js
// Este archivo contiene la configuración para conectar a la base de datos de MongoDB.
// Reemplaza esto con tu URI de MongoDB
const mongoURI = 'mongodb+srv://miguelrc055:V7vh4qBgqQ6Avr8D@cluster0.jouofuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Define tu URI de MongoDB directamente aquí
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Aumentar timeout a 30 segundos
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión: ${error.message}`);
    process.exit(1); // Terminar con error
  }
};

module.exports = connectDB;