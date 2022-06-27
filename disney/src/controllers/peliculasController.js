import Router from 'express';
import Pelicula from '../models/Pelicula.js';
import PeliculaService from '../services/peliculasServices.js';

const peliculaRouter = Router();

const peliculaService = new PeliculaService();

peliculaRouter.get('', async (req, res) => {
    try {
        const peliculas = await PeliculaService.getAll();
        return res.status(200).send(peliculas);
    }
    catch (error) {
        res.status(500).send("Hubo un error")
    }
});

peliculaRouter.get('/:id', async (req, res) => {
    try {

        const { id } = req.params
        const peliculas = await PeliculasService.getById(id);
        if(peliculas==null){
            return res.sendStatus(404);
        }
        else{
            return res.status(200).send(peliculas);
        }
    }
    catch (error) {
        res.status(500).send({ error })
    }
});

peliculaRouter.post('/create', async (req, res) => {
    try {
        const peliculas = req.body;
        const peliculaCreada = await PeliculasService.createPelicula(peliculas);
        return res.status(200).send(peliculas);
    }
    catch (error) {
        res.status(500).send({ error })
    }
});

peliculaRouter.put('/update/:id', async (req, res) => {
    try {
        const { nombre, libreGluten, importe, descripcion } = req.body
        const { id } = req.params
        const nuevaPelicula = new Pelicula(nombre, libreGluten, importe, descripcion)
        const peliculaActualizado = await PeliculaService.updatePelicula(id, nuevaPelicula);
        return res.status(200).send(nuevaPelicula);
    }


    catch (error) {
        res.status(500).send({ error })
    }
});


peliculaRouter.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const peliculaBorrada = await PeliculaService.deleteById(id);
        return res.status(200).send(peliculaBorrado);
    }
    catch (error) {
        res.status(500).send({ error })
    }
});

export default peliculaRouter;