const express = require('express');
const router = express.Router();
const db = require('../../src/db');

router.get('/', (req, res) => {
    const query = `
    SELECT j.ficha, j.Nombre, j.posicion, j.dorsal, s.NombreEquipo, j.imagen AS imagenJugador, s.imagen AS imagenSeleccion
    FROM jugadores j
    INNER JOIN selecciones s ON j.idEquipo = s.id
`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Convertir imagen binaria a base64
        const playersWithBase64Images = results.map(player => {
            if (player.imagenJugador) {
                player.imagenJugador = Buffer.from(player.imagenJugador).toString('base64');
            }
            if (player.imagenSeleccion) {
                player.imagenSeleccion = Buffer.from(player.imagenSeleccion).toString('base64');
            }
            return player;
        });

        res.json(playersWithBase64Images);
    });
});

module.exports = router;

