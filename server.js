const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

/**
 * INICIALIZAR FIREBASE-ADMIN
 */
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage: multer.memoryStorage()
})

/**
 * Rutas
 */
const users = require('./routes/usersRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

app.disable('x-powered-by');

app.set('port', port);

/**
 * Llamando a las rutas
 */
users(app, upload);

server.listen(3000, '192.168.20.21' || 'localhost', function () {
    console.log('Aplicación de NodeJS ' + port + ' Iniciada...');
});

//ERROR HANDDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server,
}

// 200 - RESPUESTA EXITOSA
// 404 - URL NO EXISTE
// 500 - ERROR INTERNO DEL SERVIDOR