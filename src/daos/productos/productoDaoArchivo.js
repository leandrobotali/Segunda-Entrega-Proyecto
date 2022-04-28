import {Producto} from '../../contenedores/contenedorArchivo.js'
import fs from 'fs';

const producto = {};

//------------------------------------------
//functions

producto.getAll = async(req, res, next) => {
    try{
       const arrayProductos = JSON.parse(await fs.promises.readFile('productos.txt', 'utf-8'))
       res.status(201).json(arrayProductos);
    }catch{
        res.status(500).json( { message: `Server Error ${err}`} )
    }
    
}

producto.save = async (req, res, next) => {
    try {
        if (req.body.nombre !== undefined && req.body.descripcion !== undefined && req.body.codigo !== undefined && req.body.foto !== undefined && req.body.precio !== undefined && req.body.stock !== undefined) {
            let fyh = new Date();

            let fyhActual = fyh.getDate() + '/' + (fyh.getMonth() + 1) + '/' + fyh.getFullYear() + " - " + fyh.getHours() + ':' + fyh.getMinutes() + ':' + fyh.getSeconds()
            let obj = new Producto(fyhActual, req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock)

            const arrayProductos = JSON.parse(await fs.promises.readFile('productos.txt', 'utf-8'))

            let idMasAlto = 0;
            if (arrayProductos.length > 0) {
                idMasAlto = arrayProductos.reduce((acum, proximo) => acum > proximo.id ? acum : proximo.id, 0);
            }
            obj.id = parseInt(idMasAlto) + 1

            arrayProductos.push(obj);
            let objeto = JSON.stringify(arrayProductos);

            fs.promises.writeFile('productos.txt', objeto)

            res.status(201).json({'messaje':'Producto Agregado'})
        } else {
            res.status(500).json({ 'messaje': 'Error de datos' })
        }
    } catch {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

producto.getById = async (req, res, next) => {
    try {
        const objError = { "error": "producto no encontrado" }
        const arrayProductos = JSON.parse(await fs.promises.readFile('productos.txt', 'utf-8'))
        const find = arrayProductos.find(producto => producto.id == req.params.id) || objError;
        res.status(201).json(find)
    } catch {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

producto.updateById = async(req, res, next) => {
    try {
        if (req.body.nombre !== undefined && req.body.descripcion !== undefined && req.body.codigo !== undefined && req.body.foto !== undefined && req.body.precio !== undefined && req.body.stock !== undefined) {
            let fyh = new Date();

            let fyhActual = fyh.getDate() + '/' + (fyh.getMonth() + 1) + '/' + fyh.getFullYear() + " - " + fyh.getHours() + ':' + fyh.getMinutes() + ':' + fyh.getSeconds()

            const objError = { "error": "producto no encontrado" }
            const arrayProductos = JSON.parse(await fs.promises.readFile('productos.txt', 'utf-8'))
            const find = arrayProductos.find(producto => producto.id == req.params.id) || objError;
            if (find !== objError) {
                find.timestamp = fyhActual;
                find.nombre = req.body.nombre;
                find.descripcion = req.body.descripcion;
                find.codigo = req.body.codigo;
                find.foto = req.body.foto;
                find.precio = req.body.precio;
                find.stock = req.body.stock;

                let indice = arrayProductos.findIndex(producto => producto.id == req.params.id);
                arrayProductos[indice] = find;

                let objeto = JSON.stringify(arrayProductos);

                fs.promises.writeFile('productos.txt', objeto)
            }

            res.status(201).json(find)
        } else {
            res.status(500).json({ 'messaje': 'Error de datos' })
        }
    } catch (err) {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

producto.deleteById = async(req, res, next) => {
    try {
        const arrayProductos = JSON.parse(await fs.promises.readFile('productos.txt', 'utf-8'))
        let nuevoArray = arrayProductos.filter(producto => producto.id != req.params.id)

        let objeto = JSON.stringify(nuevoArray);
                
        fs.promises.writeFile('productos.txt', objeto)

        res.status(201).json(nuevoArray);

     }catch{
        res.status(500).json({ message: `Server Error ${err}` })
     }
}

export default producto;