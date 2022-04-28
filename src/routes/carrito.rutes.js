import express from 'express';
const router = express.Router();

import {Carrito} from '../config/configPersistencia.js'


router.post('/', Carrito.CarritoNuevo);

router.post('/:id/productos', Carrito.agregarProd);

router.get('/:id/productos', Carrito.getCarritoById);

router.delete('/:id', Carrito.deleteById);

router.delete('/:id/productos/:id_Prod', Carrito.deleteByIdProd);

export default router;