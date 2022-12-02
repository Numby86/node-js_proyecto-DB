const express = require('express');
const moviesRouter = require('./routes/movies.routes.js');
const cinemasRouter = require('./routes/cinemas.routes.js');
const connect = require('./utils/db/connect.js');
const cors = require('cors');
const passport = require('passport');
const createError = require('./utils/errors/create-errors.js');
const userRouter = require('./routes/user.routes.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const DB_URL = "mongodb+srv://root:7GBDSVHdMtJTfjZY@nodejs-proyectodb.ihshpoy.mongodb.net/?retryWrites=true&w=majority";

connect();

const PORT = 3000;
const server = express();

server.set("secretKey", "proyectoNodeApi");

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));
//passport aqui--------------------------

require('./utils/authentication/passport.js');

server.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 90000
    },
    store: MongoStore.create({
        mongoUrl: DB_URL,
    })
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