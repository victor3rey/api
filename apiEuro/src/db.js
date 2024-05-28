const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'sql.freedb.tech',
    user: 'freedb_remoto',
    password: 'qfgPQq4y8a#jY2@', //  contraseña correcta
    database: 'freedb_euroki',
    port:'3306'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

module.exports = connection;
