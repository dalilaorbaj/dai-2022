import config from'./dbconfig.js';
import sql from'mssql';
import express from 'express';
import jwt from "jsonwebtoken"


app.set('port', port);


const takeToken =(req, res, next)=>{
    const bearerHeader = req.headers['token'];
    console.log("estoy aca")
    console.log(bearerHeader);
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else{
        res.sendStatus(403)
    }
}

const verifyToken =(req,res,next)=>{
    const bearerHeader = req.headers['token'];
    console.log("hola")
    console.log(bearerHeader)
    jwt.verify(bearerHeader, 'secretkey', (err, authData) =>{
        if(err) {
            res.sendStatus(403);
        } else{
            next();
        }
    })
    console.log("termine")
}

app.use(express.json());
app.use("/movies", takeToken, verifyToken, peliculasController);
app.use("/characters", takeToken,verifyToken,personajesController);
app.use("/auth/login", usuariosController);
app.use(express.urlencoded({ extended: false }));


//const express = require("express");
const app = express();
const port = 3000;

app.get('/prueba', function (req, res) {
    console.log("prueba")
    res.send('hola!!!!!!!!!');
});