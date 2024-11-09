const express = require('express');
const db = require('./config/db');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware para manejar JSON
app.use('/api', routes); // Rutas de la API

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
