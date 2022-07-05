import express from "express";
import personajeRouter from "./controllers/personajesController.js";
import peliculaRouter from "./controllers/peliculasController.js";
import usuariosController from "./controllers/usuariosController.js";


import cors from 'cors'
const app = express();

const port = 3000;

//middlewares
app.use(cors());
app.use(express.json());


//probamos el serverrrrrrrrrrrrrrrr
app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

//rutitas
app.use("/api/personajes", personajeRouter);
app.use("/api/peliculas", peliculaRouter);
app.use("/auth/login", usuariosController);



app.get('/prueba', function (req, res) {
    res.send('hola!!!!!!!!!');
});