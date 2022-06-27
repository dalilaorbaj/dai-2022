import Router from 'express';
import Personaje from '../models/Personaje.js';
import PersonajesServices from '../services/PersonajesServices.js';

const personajeRouter = Router();

const personajeService = new PersonajeService();

personajeRouter.get('', async (req, res) => {
    try {
        const personajes = await PersonajeService.getAll();
        return res.status(200).send(personajes);
    }
    catch (error) {
        res.status(500).send("Hubo un error")
    }
});

personajeRouter.get('/:id', async (req, res) => {
    try {

        const { id } = req.params
        const personajes = await PersonajeService.getById(id);
        if(personajes==null){
            return res.sendStatus(404);
        }
        else{
            return res.status(200).send(personajes);
        }
    }
    catch (error) {
        res.status(500).send({ error })
    }
});

personajeRouter.post('/create', async (req, res) => {
    try {
        const nuevoPersonaje = req.body;
        const personajeCreado = await PersonajeService.createPersonaje(nuevoPersonaje);
        return res.status(200).send(nuevoPersonaje);
    }
    catch (error) {
        res.status(500).send({ error })
    }
});

personajeRouter.put('/update/:id', async (req, res) => {
    try {
        const { nombre, libreGluten, importe, descripcion } = req.body
        const { id } = req.params
        const nuevoPersonaje = new Personaje(nombre, libreGluten, importe, descripcion)
        const personajeActualizado = await PersonajeService.updatePersonaje(id, nuevoPersonaje);
        return res.status(200).send(nuevoPersonaje);
    }


    catch (error) {
        res.status(500).send({ error })
    }
});


personajeRouter.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const personajeBorrado = await PersonajeService.deleteById(id);
        return res.status(200).send(personajeBorrado);
    }
    catch (error) {
        res.status(500).send({ error })
    }
});

export default personajeRouter;