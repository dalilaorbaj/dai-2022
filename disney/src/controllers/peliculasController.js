import { Router } from "express";
import rutasProtegidas from "../middleware/tokenVerify.js";
import Pelicula from '../models/Pelicula.js';
import PeliculaService from '../services/peliculasServices.js';

const peliculaRouter = Router();


const peliculaService = new PeliculaService();

peliculaRouter.get('', async (req, res) => {
    try {
        const peliculas = await peliculaService.getAll();
        return res.status(200).json(peliculas);
    }
    catch (error) {
        res.status(500).send('error en el server')
    }
});

peliculaRouter.get('/:id', async (req, res) => {
    try {

        const pelicula = await peliculaService.getById(req.params.id);
        if(pelicula==null){
            return res.sendStatus(404);
        }
        else{
            return res.status(200).json(pelicula);
        }
    }
    catch (error) {
        res.status(500).send({ error })
    }
});


peliculaRouter.post('/create', rutasProtegidas, async (req, res) => {
    try {
        const pelicula = req.body;
        const peliculaCreada = await peliculaService.createPelicula(pelicula);
        return res.status(200).json(peliculaCreada);
    }
    catch (error) {
        res.status(500).send({ error })
    }
});

peliculaRouter.put('/update/:id', async (req, res) => {
    try {
        let pelicula = req.body;
        /*const { id } = req.params*/
        const peliculaActualizada = await peliculaService.updatePelicula(req.params.id, nuevaPelicula);
        return res.status(200).json(peliculaActualizada);
    }
    catch (error) {
        res.status(500).send({ error })
    }
});

peliculaRouter.delete('/delete/:id', async (req, res) => {
    try {
        /*const { id } = req.params*/
        const peliculaBorrada = await peliculaService.deleteById(req.params.id);
        return res.status(200).send(peliculaBorrada);
    }
    catch (error) {
        res.status(500).send({ error })
    }
});

export default peliculaRouter;