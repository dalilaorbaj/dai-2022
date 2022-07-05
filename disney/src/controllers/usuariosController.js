import { Router } from "express";
import UsuarioService from '../services/usuariosServices.js';
import jwt from "jsonwebtoken"

const usuarioRouter = Router();

const usuarioService = new UsuarioService();

usuarioRouter.post('', async (req, res) => {
    try {
        const {userName, password} = req.body
        const userToken = await usuarioService.buscarUsuario(userName, password);
    
        if(userToken==null){
            return res.status(404).send('Datos incorrectossss');
        }
        jwt.sign({user: userToken},'secretkey',  {expiresIn: '300s'},(err, token)=>{
            res.json({
                token: token
            })
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
});

export default usuarioRouter;