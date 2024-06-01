require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors({
    origin: 'https://localhost:8100', // Permite solicitudes de cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); 

app.use(bodyParser.json());

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos con ID:', connection.threadId);
});

// Importar y usar las rutas
const jugadoresRouter = require('./src/routes/jugadores');
const seleccionesRouter = require('./src/routes/selecciones');
app.use('/jugadores', jugadoresRouter);
app.use('/selecciones', seleccionesRouter);

// Ruta raíz para comprobar el estado del servidor
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

