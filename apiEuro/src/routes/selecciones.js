const express = require('express');
const router = express.Router();
const db = require('../../src/db');

router.get('/', (req, res) => {
  const query = `
    SELECT 
      s.id, 
      s.NombreEquipo, 
      s.imagen AS imagenSeleccion,
      COUNT(j.ficha) AS numeroJugadores
    FROM selecciones s
    LEFT JOIN jugadores j ON s.id = j.idEquipo
    GROUP BY s.id, s.NombreEquipo, s.imagen;
  `;
  
  db.query(query, (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }

    // Convertir imágenes binarias a base64
    const selectionsWithBase64Images = results.map(selection => {
        if (selection.imagenSeleccion) {
            selection.imagenSeleccion = Buffer.from(selection.imagenSeleccion, 'binary').toString('base64');
        }
        return selection;
    });

    res.json(selectionsWithBase64Images);
});
});

module.exports = router;