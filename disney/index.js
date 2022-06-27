import config from'./dbconfig.js';
import sql from'mssql';
import express from 'express';

//const express = require("express");
const app = express();

app.get('/prueba', function (req, res) {
    console.log("prueba")
    res.send('hola!!!!!!!!!');
});