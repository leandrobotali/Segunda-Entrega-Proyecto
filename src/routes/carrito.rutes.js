import express from 'express';
const router = express.Router();

import {Carrito} from '../config/configPersistencia.js'


router.post('/', async function(req, res, next) {
    res.status(201).send(await Carrito.CarritoNuevo());
});

router.post('/:id/productos', async function(req, res, next) {
    if(req.body.idProd != undefined && req.body.nombreProd != undefined && req.body.imagen != undefined && req.body.Precio != undefined && req.body.stock != undefined){
        res.status(201).send(await Carrito.agregarProd(req.params.id, req.body.idProd, req.body.nombreProd, req.body.imagen, req.body.Precio, req.body.stock));
    }else{
        res.status(400).send({error: "datos incorrectos"})
    }
});

router.get('/:id/productos', async function(req, res, next) {    
    res.status(201).send(await Carrito.getCarritoById(req.params.id))
});

router.delete('/:id', async function(req, res, next) {
    res.send(await Carrito.deleteById(req.params.id))
});

router.delete('/:id/productos/:id_Prod', async function(req, res, next) {
    res.send(await Carrito.deleteByIdProd(req.params.id, req.params.id_Prod))
});

export default router;