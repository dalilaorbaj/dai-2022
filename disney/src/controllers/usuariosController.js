import { Router } from "express";
import UsuarioService from '../services/usuariosServices.js';

const usuarioRouter = Router();

const usuarioService = new UsuarioService();

usuarioRouter.post('', async (req, res) => {
    try {
        const {userName, password} = req.body
        const usuario = await usuarioService.buscarUsuario(userName, password);
    
        if(usuario==null){
            return res.status(404).send('Datos incorrectossss');
        }
        else{
            const token = await usuarioService.generateToken(req.body);
            res.send(token)
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
});

export default usuarioRouter;