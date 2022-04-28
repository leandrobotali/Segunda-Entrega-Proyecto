import express from 'express';
const router = express.Router();

import {Producto} from '../config/configPersistencia.js'

//------------------------------------------
//Apis
router.get('/', Producto.getAll);

router.get('/:id?', Producto.getById);

router.post('/', Producto.save);

router.put('/:id', Producto.updateById);

router.delete('/:id', Producto.deleteById);

export default router;