const express = require('express');

const router = express.Router();

const mysql = require('mysql');

const conn = require('../config/database');


router.get('/', (req, res, next) => {
    const db = mysql.createConnection(conn);
    const query = `SELECT * FROM usuario`;
    db.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({ code: '0', message: 'Algo salió mal' });
        }
        if (result.length > 0) {
            res.status(200);
            res.json({ code: 1, usuarios: result, message: 'Bienvenido' });
        } else {
            res.status(200);
            res.json({ code: 2, message: 'No hay Datos en la BD' });

        }
        db.end((err) => { console.log('Closed') });
    })

});

router.post('/nuevo', (req, res, next) => {
    const db = mysql.createConnection(conn);
    const query = `INSERT INTO usuario(nombre,
        apellidos,genero,fechanacimiento,dirrecion,telefono,email,password,foto,visibility) VALUES
        ('${req.body.nombre}','${req.body.apellidos}','${req.body.genero}','${req.body.fechaNacimiento}'
        ,'${req.body.dirrecion}','${req.body.telefono}','${req.body.email}','${req.body.password}'
        ,'${req.body.foto}','${req.body.visibility}')`;
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

router.post('/modificar', (req, res, next) => {
    const db = mysql.createConnection(conn);
    const query = `UPDATE usuario SET
    nombre = '${req.body.nombre}',
    apellidos = '${req.body.apellidos}',
    genero = '${req.body.genero}',
    fechanacimiento = '${req.body.fechaNacimiento}',
    dirrecion = '${req.body.dirrecion}',
    telefono = '${req.body.telefono}',
    email = '${req.body.email}',
    password = '${req.body.password}',
    foto = '${req.body.foto}',
    visibility = '${req.body.visibility}'
    WHERE id = ${req.body.id}`;
    db.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({ code: '0', message: 'Algo salió mal' });
        }
        res.status(201);
        res.json({ code: 1, message: 'usuario modificado' });
        db.end((err) => { console.log('Closed') });
    })
});

router.post('/eliminar', (req, res) => {
    const db = mysql.createConnection(conn);
    const query = `DELETE FROM usuario WHERE idUSuario = ${req.body.id}`;
    db.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({ code: '0', message: 'Algo salió mal' });
        }
        res.status(200);
        res.json({ code: 1, message: 'usuario eliminado' });
        db.end((err) => { console.log('Closed') });
    })
});




module.exports = router;
