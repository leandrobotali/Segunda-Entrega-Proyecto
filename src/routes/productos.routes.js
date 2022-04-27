import express from 'express';
const router = express.Router();

import {Producto} from '../config/configPersistencia.js'

//------------------------------------------
//Apis
router.get('/:id?', async function(req, res, next) {
    if(req.params.id){
        res.status(201).send(await Producto.getById(req.params.id))
    }else{
        res.status(201).send(await Producto.getAll())
    }
});

router.post('/', async function(req, res, next) {
    if (req.body.nombre !== undefined && req.body.descripcion !== undefined && req.body.codigo !== undefined && req.body.foto !== undefined && req.body.precio !== undefined &&  req.body.stock !== undefined) {
        let fyh = new Date();

        let fyhActual = fyh.getDate() + '/' + ( fyh.getMonth() + 1 ) + '/' + fyh.getFullYear() + " - " + fyh.getHours() + ':' + fyh.getMinutes() + ':' + fyh.getSeconds()

        res.status(201).send(await Producto.save(fyhActual,req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock));
    }
    else{
        res.status(400).send({error: "datos incorrectos"})
    }
});

router.put('/:id', async function(req, res, next) {    
    res.status(201).send(await Producto.updateById(req.params.id, req.body.timestamp, req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock))
});

router.delete('/:id', async function(req, res, next) {
    res.send(await Producto.deleteById(req.params.id))
});

export default router;