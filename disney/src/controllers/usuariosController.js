import Router from 'express';
import Login from '../models/Login.js';
import Usuario from '../models/Usuario.js';
import UsuarioService from '../services/usuariosServices.js';

const usuarioRouter = Router();

const usuarioService = new UsuarioService();

usuarioRouter.get('', async (req, res) => {
    try {
        
       const {userName, password} = req.params
        const login = new Login(userName, password);
        let usuario = new Usuario();
        usuario = usuarioService.Login(login.userName, login.password);
    
        if(usuario==null){
            return res.sendStatus(404);
        }
        else{
            return res.status(200).send(usuario);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
});

export default usuarioRouter;