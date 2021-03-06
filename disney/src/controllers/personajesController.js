import { Router } from "express";
import { IsValidToken } from "../helpers/securityHelper.js";
import Personaje from '../models/Personaje.js';
import PersonajesServices from '../services/PersonajesServices.js';
import * as SecurityHelper from '../helpers/securityHelper.js'


const personajeRouter = Router();

const personajeService = new PersonajesServices();

personajeRouter.get('', async (req, res) => {
    try {
            let personajes = await personajeService.getAll();
            return res.status(200).send(personajes);
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

personajeRouter.get('/:id', async (req, res) => {
    try {
        /*const { id } = req.params*/
        const personajes = await personajeService.getById(req.params.id);
        if (personajes == null) {
            return res.sendStatus(404);
        }
        else {
            return res.status(200).json(personajes);
        }
    }
    catch (error) {
        res.status(500).send({ error })
    }
});

personajeRouter.post('/create', async (req, res) => {
    try {
        let nuevoPersonaje = req.body;
        console.log(nuevoPersonaje)
        const personajeCreado = await personajeService.createPersonaje(nuevoPersonaje);
        console.log(personajeCreado)
        return res.status(200).json("Se pudo crear tu personaje");
    }
    catch (error) {
        res.status(500).send({ error })
        console.log(error)
    }
});

personajeRouter.put('/update/:id', async (req, res) => {
    try {
        const personaje = req.body
        /*const { id } = req.params*/
        const personajeActualizado = await personajeService.updatePersonaje(req.params.id, personaje);
        return res.status(200).json("Se pudo actualizar tu personaje");
    }
    catch (error) {
        res.status(500).send({ error })
    }
});

personajeRouter.delete('/delete/:id', async (req, res) => {
    try {
        /*const { id } = req.params*/
        const personajeBorrado = await personajeService.deleteById(req.params.id);
        return res.status(200).send(personajeBorrado);
    }
    catch (error) {
        res.status(500).send({ error })
    }
});

export default personajeRouter;