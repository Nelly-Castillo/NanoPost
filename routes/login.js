const express = require('express');

const router = express.Router();

const mysql = require('mysql');

const conn = require('../config/database');

// JSON web tokens
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    const db = mysql.createConnection(conn);
    const query = `SELECT * FROM usuario WHERE
                correo='${req.body.user}' AND
                pass='${req.body.pass}'`;
    db.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({ code: '0', message: 'Algo salió mal' });
        }
        if (result.length > 0) {
            let id = result[0];
            let name = result[1];
            const token = jwt.sign({
                userID: id.idusuario,
                user: id.nombreUsuario
            },
                process.env.JWT_KEY || "debugkey"
            );
            res.status(200);
            res.json({ code: 1, id: id, message: 'Bienvenido', token: token });
        } else {
            res.status(401);
            res.json({ code: '0', message: 'Usuario y o contraseña incorrectos' });
        }
        db.end((err) => { console.log('Closed') });

    })
});

module.exports = router;
