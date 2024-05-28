const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const seleccionesRouter = require('./src/routes/selecciones');

const app = express();
const PORT = process.env.PORT || 3005;

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:8100', // El origen de tu aplicación Ionic
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Importar y usar las rutas
const jugadoresRouter = require('./src/routes/jugadores');
app.use('/jugadores', jugadoresRouter);
app.use('/selecciones', seleccionesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


