import {Carrito, ProdCarrito} from '../../contenedores/contenedorMemoria.js'

const carritos = {};
let carrito = [];


carritos.CarritoNuevo = (req, res, next) => {
    try {
        let idMasAlto = 0;

        if (carrito.length > 0) {
            idMasAlto = carrito.reduce((acum, proximo) => acum > proximo.id ? acum : proximo.id, 0);//busca el id mas alto
        }

        let objId = parseInt(idMasAlto) + 1

        let obj = new Carrito(objId)

        carrito.push(obj);

        res.status(201).json({ "id": objId })
        
    } catch (err) {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

carritos.getCarritoById = (req, res, next) => {
    try {
        const objError = { "error": "No existe el Carrito" }
        const find = carrito.find(carrito => carrito.id == req.params.id) || objError;//busca si existe el carrito
        if (find !== objError) {
            res.status(201).json(find.prodCarrito)
        } else {
            res.status(201).json(objError)
        }
    } catch (err) {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

carritos.agregarProd = (req, res, next) => {
    try {
        if (req.body.idProd != undefined && req.body.nombreProd != undefined && req.body.imagen != undefined && req.body.Precio != undefined && req.body.stock != undefined) {
            const objError = { "error": "No existe el Carrito" }
            const indice = carrito.findIndex(carrito => carrito.id == req.params.id); //si existe el carrito
            if (indice != -1) {
                const indiceProd = carrito[indice].prodCarrito.findIndex(producto => producto.idProd == req.body.idProd);//si existe el producto dentro del carrito
                if (indiceProd != -1) {
                    if (carrito[indice].prodCarrito[indiceProd].cantidad < req.body.stock) {//si esta el producto en el carrito me fijo que la cantidad total sea menor al stock(si es igual no puedo vender mas producto)
                        carrito[indice].prodCarrito[indiceProd].cantidad++
                        res.status(201).json({ 'messaje': 'Producto agregado' });
                    } else {
                        res.status(400).json({ error: "No hay mas productos en stock" })
                    }
                } else {
                    if (req.body.stock >= 1) {//si no esta el producto en el carrito, me fijo que el stock sea por lo menos de 1 producto
                        let prodNuevo = new ProdCarrito(req.body.idProd, req.body.nombreProd, req.body.imagen, req.body.Precio, 1);
                        carrito[indice].prodCarrito.push(prodNuevo)
                        res.status(201).json({ 'messaje': 'Producto agregado' });
                    } else {
                        res.status(400).json({ error: "No hay mas productos en stock" })
                    }
                }
            } else {
                res.status(400).json(objError)
            }
        } else {
            res.status(400).json({ error: "datos incorrectos" })
        }
    } catch (err) {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

carritos.deleteById =(req, res, next) => {
    try {
        const objError = { "error": "Carrito no encontrado" }
        const find = carrito.find(carrito => carrito.id == req.params.id) || objError;
        if (find !== objError) {
            carrito = carrito.filter(carrito => carrito.id != req.params.id);

            res.status(201).json(carrito);
        } else {
            res.status(201).json(objError)
        }
    } catch (err) {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

carritos.deleteByIdProd = (req, res, next) => {
    try {
        const objError = { "error": "Carrito no encontrado" }
        const indice = carrito.findIndex(carrito => carrito.id == req.params.id);//busca si existe el carrito
        if (indice != -1) {
            const objErrorProd = { "error": "El producto no se encuentra en el Carrito" }
            const indiceProd = carrito[indice].prodCarrito.findIndex(producto => producto.idProd == req.params.id_Prod);//busca si el producto se encuentra en el carrito
            if (indiceProd != -1) {
                if (carrito[indice].prodCarrito[indiceProd].cantidad > 1) {//si la cantidad en el carrito es mayor que 1 resta cantidad, si no elimina el producto del carrito
                    carrito[indice].prodCarrito[indiceProd].cantidad--
                    res.status(201).json({ 'messaje': 'Producto borrado' })
                } else {
                    carrito[indice].prodCarrito = carrito[indice].prodCarrito.filter(producto => producto.idProd != req.params.id_Prod)
                    res.status(201).json({ 'messaje': 'Producto borrado' })
                }
            } else {
                res.status(400).json(objErrorProd)
            }
        } else {
            res.status(400).json(objError)
        }
    } catch (err) {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}
export default carritos;