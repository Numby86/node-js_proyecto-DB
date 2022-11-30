const express = require('express');
const moviesRouter = require('./routes/movies.routes.js');
const cinemasRouter = require('./routes/cinemas.routes.js');
const connect = require('./utils/db/connect.js');
const cors = require('cors');
const passport = require('passport');
const createError = require('./utils/errors/create-errors.js');
const userRouter = require('./routes/user.routes.js');
const session = require('express-session');

connect();

const PORT = 3000;
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
//passport aqui--------------------------

require('./utils/authentication/passport.js');

server.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 90000
    }
}));

server.use(passport.initialize());
server.use(passport.session());

//rutas aqui-------------------------------------------------
server.use('/user', userRouter);
server.use('/movies', moviesRouter);
server.use('/cinemas', cinemasRouter);

server.use('*', (req, res, next) => {
    next(createError('Esta ruta no existe', 404));
});

server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

server.listen(PORT, () => {
    console.log(`El servidor está escuchando en http://localhost:${PORT}`);
});