const express = require('express');

const router = express.Router();

const mysql = require('mysql');

const conn = require('../config/database');


router.get('/', (req, res, next) => {
    const db = mysql.createConnection(conn);
    const query = `SELECT * FROM mensaje_personal
                   where id_usuarioremitente = ${req.body.id_user} 
                   or id_usuariodestinatario = ${req.body.id_user} `;
    db.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({ code: '0', message: 'Algo salió mal' });
        }
        if (result.length > 0) {
            res.status(200);
            res.json({ code: 1, mensaje_personal: result, message: 'Bienvenido' });
        } else {
            res.status(200);
            res.json({ code: 2, message: 'No hay Datos en la BD' });
        }
        db.end((err) => { console.log('Closed') });
    })
});

router.post('/nuevo', (req, res, next) => {
    const db = mysql.createConnection(conn);
    const query = `INSERT INTO mensaje_personal(id_usuarioremitente,id_usuariodestinatario,contenido) VALUES
        ('${req.body.id_usuario}','${req.body.contenido}','${req.body.fechapublicacion}')`;
    db.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({ code: '0', message: 'Algo salió mal' });
        }
        res.status(201);
        res.json({ code: 1, message: 'usuario creado' });
        db.end((err) => { console.log('Closed') });
    })
});


module.exports = router;
