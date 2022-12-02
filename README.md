- Creo el servidor y le instalo todas las dependencias necesarias (express, mongoose, nodemon, etc).

- Lo conecto a MongoDB.

- Creo las semillas de movies, y le añado muchas mas peliculas, les pongo duracion, si pertenecen a una saga, le hago enum de generos, si estan premiadas, etc. Le añado varios campos a mi schema para luego hacer diferentes gets.

- Hago los 5 gets q pide la practica y termino la parte I del proyecto.

- Creo todas las rutas de movies.

- Añado los 5 GET de la parte I, a mi postman.

- A traves de Postman creo un metodo POST e introduzco "Malditos bastardos" y "Titanic" para probar, y funciona correctamente.

- A traves de Postman creo un metodo DELETE e introduzco "50 primeras citas" por su ID para probar, y funciona correctamente.

- A traves de Postman creo un metodo PUT e introduzco el dato de la duration y los generos a "Titanic" para probar, y funciona correctamente.

- Creo el modelo Cinema con las propiedades requeridas.

- Creo metodo GET que me traera todos mis cines.

- Creo metodo POST para añadir cines, y pruebo añadiendo y funciona.

- Creo metodo PUT que añade peliculas al cine que quiera a traves de la ID del cine y le añado la pelicula que quiera por su ID a esa cartelera, funciona bien.

- Creo metodo DELETE que me borre un cine, borro el primero que cree y funciona bien, despues lo añado con el POST y el PUT anterior le vuelvo a crear y meter una pelicula.

- Creo Autenticacion con passport (instalando todas las dependencias necesarias), con un register, un login y logout, y funcionan correctamente.

- Creo Autenticacion con jsonWebToken (instalo todo lo necesario) y funciona.

- Pruebo middlewares, de authentication con JWT en get-all cinemas, y de passport en get-all movies y funcionan ambas.

- Creo middleware para poder subir archivos, y pruebo subiendo una foto de un cine desde postman.