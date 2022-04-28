import {Producto} from '../../contenedores/contenedorMemoria.js'

const producto = {};

//------------------------------------------
//pre-loading of data in memory

let Productos = [{
    "id": "1",
    "timestamp": "9/2/2022 - 1:21:41",
    "nombre": "Zapatilla",
    "descripcion": "zapatillas marca adidas color negras",
    "codigo": "2",
    "foto": "https://via.placeholder.com/150",
    "precio": "10000",
    "stock": "5"
}, {
    "id": "2",
    "timestamp": "9/2/2022 - 1:21:41",
    "nombre": "Zapato",
    "descripcion": "zapato hombre marca ringo",
    "codigo": "3",
    "foto": "https://via.placeholder.com/150",
    "precio": "8000",
    "stock": "6"
}, {
    "id": "3",
    "timestamp": "9/2/2022 - 1:21:41",
    "nombre": "alpargata",
    "descripcion": "alpargatas unisex color blancas",
    "codigo": "7",
    "foto": "https://via.placeholder.com/150",
    "precio": "2000",
    "stock": "4"
}];


//------------------------------------------
//functions

producto.getAll = (req, res, next) => {
    try{
        res.status(201).json(Productos)
    }catch{
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

producto.save = (req, res, next) => {
    try {
        if (req.body.nombre !== undefined && req.body.descripcion !== undefined && req.body.codigo !== undefined && req.body.foto !== undefined && req.body.precio !== undefined && req.body.stock !== undefined) {
            let fyh = new Date();

            let fyhActual = fyh.getDate() + '/' + ( fyh.getMonth() + 1 ) + '/' + fyh.getFullYear() + " - " + fyh.getHours() + ':' + fyh.getMinutes() + ':' + fyh.getSeconds()
            let obj = new Producto(fyhActual, req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock)

            let idMasAlto = 0;

            if (Productos.length > 0) {
                idMasAlto = Productos.reduce((acum, proximo) => acum > proximo.id ? acum : proximo.id, 0);
            }
            obj.id = parseInt(idMasAlto) + 1

            Productos.push(obj);

            res.status(201).json({'messaje':'Producto Agregado'})
        }else {
                res.status(500).json({ 'messaje': 'Error de datos' })
        }
    } catch {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

producto.getById = (req, res, next) => {
    try {
        const objError = { "error": "producto no encontrado" }
        const find = Productos.find(producto => producto.id == req.params.id) || objError;
        res.status(201).json(find)
    } catch {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

producto.updateById = (req, res, next) => {
    try {
        if (req.body.nombre !== undefined && req.body.descripcion !== undefined && req.body.codigo !== undefined && req.body.foto !== undefined && req.body.precio !== undefined && req.body.stock !== undefined) {
            let fyh = new Date();

            let fyhActual = fyh.getDate() + '/' + (fyh.getMonth() + 1) + '/' + fyh.getFullYear() + " - " + fyh.getHours() + ':' + fyh.getMinutes() + ':' + fyh.getSeconds()
            const objError = { "error": "producto no encontrado" }
            const find = Productos.find(producto => producto.id == req.params.id) || objError;
            if (find !== objError) {
                find.timestamp = fyhActual;
                find.nombre = req.body.nombre;
                find.descripcion = req.body.descripcion;
                find.codigo = req.body.codigo;
                find.foto = req.body.foto;
                find.precio = req.body.precio;
                find.stock = req.body.stock;;
            }

            res.status(201).json(find)
        } else {
            res.status(500).json({ 'messaje': 'Error de datos' })
        }
    } catch {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

producto.deleteById = (req, res, next) => {
    try {
        const objError = { "error": "producto no encontrado" }
        const find = Productos.find(producto => producto.id == req.params.id) || objError;
        if (find !== objError) {
            Productos = Productos.filter(producto => producto.id != req.params.id);

            res.status(201).json(Productos)
        } else {
            res.status(201).json(find)
        }

    } catch {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

export default producto;