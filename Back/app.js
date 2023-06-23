const morgan = require('morgan');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const cors = require('./middleware/cors.js')

// JSON web token
const auth=require('./config/auth.js');



//Rutas
const usuarios=require('./routes/usuarios')
const mensajes=require('./routes/mensajes')
const seguidos=require('./routes/seguidos')
const noticia=require('./routes/noticia')
const login=require('./routes/login');


// Consola DEBUG
app.use(morgan('dev'));

// Uso de variables del body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Permisos CORS
app.use(cors);


app.use('/login',login);

//Auth
app.use(auth);

app.use('/usuarios',usuarios);
app.use('/mensajes',mensajes);
app.use('/seguidos',seguidos);
app.use('/noticia',noticia);



/**
 * Funciones GET
 */
// http://localhost:8000/
// app.get('/', (req, res, next) => {
//     res.send('Bienvenidos al API de routes de camion');
// });



module.exports = app;