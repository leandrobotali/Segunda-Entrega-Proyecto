import {Carrito, ProdCarrito} from '../../contenedores/contenedorArchivo.js'
import fs from 'fs';

const carritos = {};

carritos.CarritoNuevo = async(req, res, next) =>{
    try {
        const arrayCarritos = JSON.parse(await fs.promises.readFile('carrito.txt', 'utf-8'))

        let idMasAlto = 0;

        if (arrayCarritos.length > 0) {
            idMasAlto = arrayCarritos.reduce((acum, proximo) => acum > proximo.id ? acum : proximo.id, 0);//busca el id mas alto
        }

        let objId = parseInt(idMasAlto) + 1

        let obj = new Carrito(objId)

        arrayCarritos.push(obj);

        let objeto = JSON.stringify(arrayCarritos);

        fs.promises.writeFile('carrito.txt', objeto);

        res.status(201).json(arrayCarritos)

    } catch (err) {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

carritos.getCarritoById = async(req, res, next) => {
    try {
        const objError = { "error": "No existe el Carrito" }
        const arrayCarritos = JSON.parse(await fs.promises.readFile('carrito.txt', 'utf-8'))

        const find = arrayCarritos.find(carrito => carrito.id == req.params.id) || objError;

        if (find !== objError) {
            res.status(201).json(find.prodCarrito)
        } else {
            res.status(201).json(find)
        }

    } catch (err) {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

carritos.agregarProd = async (req, res, next) => {
    try {
        if (req.body.idProd != undefined && req.body.nombreProd != undefined && req.body.imagen != undefined && req.body.Precio != undefined && req.body.stock != undefined) {
            const objError = { "error": "No existe el Carrito" }

            const arrayCarritos = JSON.parse(await fs.promises.readFile('carrito.txt', 'utf-8'))

            const indice = arrayCarritos.findIndex(carrito => carrito.id == req.params.id); //si existe el carrito
            if (indice != -1) {
                const indiceProd = arrayCarritos[indice].prodCarrito.findIndex(producto => producto.idProd == req.body.idProd);//si existe el producto dentro del carrito
                if (indiceProd != -1) {
                    if (arrayCarritos[indice].prodCarrito[indiceProd].cantidad < req.body.stock) {//si esta el producto en el carrito me fijo que la cantidad total sea menor al stock(si es igual no puedo vender mas producto)
                        arrayCarritos[indice].prodCarrito[indiceProd].cantidad++

                        let objeto = JSON.stringify(arrayCarritos);

                        fs.promises.writeFile('carrito.txt', objeto);

                        res.status(201).json({ 'messaje': 'Producto agregado' });
                    } else {
                        res.status(400).json({ error: "No hay mas productos en stock" })
                    }
                } else {
                    if (req.body.stock >= 1) {//si no esta el producto en el carrito, me fijo que el stock sea por lo menos de 1 producto
                        let prodNuevo = new ProdCarrito(req.body.idProd, req.body.nombreProd, req.body.imagen, req.body.Precio, 1);
                        arrayCarritos[indice].prodCarrito.push(prodNuevo)

                        let objeto = JSON.stringify(arrayCarritos);

                        fs.promises.writeFile('carrito.txt', objeto);

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

carritos.deleteById = async(req, res, next) => {
    try {
        const objError = { "error": "No existe el Carrito" }
        const arrayCarritos = JSON.parse(await fs.promises.readFile('carrito.txt', 'utf-8'))

        const find = arrayCarritos.find(carrito => carrito.id == req.params.id) || objError;

        if (find !== objError) {
            let nuevoArrayCarritos = arrayCarritos.filter(carrito => carrito.id != req.params.id)

            let objeto = JSON.stringify(nuevoArrayCarritos);

            fs.promises.writeFile('carrito.txt', objeto);

            res.status(201).json({ 'messaje': 'Carrito Borrado' });
        } else {
            res.status(400).json(objError)
        }

    } catch (err) {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

carritos.deleteByIdProd = async (req, res, next) => {
    try {
        const objError = { "error": "No existe el Carrito" }

        const arrayCarritos = JSON.parse(await fs.promises.readFile('carrito.txt', 'utf-8'))

        const indice = arrayCarritos.findIndex(carrito => carrito.id == req.params.id); //si existe el carrito
        if (indice != -1) {
            const objErrorProd = { "error": "El producto no se encuentra en el Carrito" }
            const indiceProd = arrayCarritos[indice].prodCarrito.findIndex(producto => producto.idProd == req.params.id_Prod);//si existe el producto dentro del carrito
            if (indiceProd != -1) {
                if (arrayCarritos[indice].prodCarrito[indiceProd].cantidad > 1) {//si la cantidad en el carrito es mayor que 1 resta cantidad, si no elimina el producto del carrito
                    arrayCarritos[indice].prodCarrito[indiceProd].cantidad--
                } else {
                    arrayCarritos[indice].prodCarrito = arrayCarritos[indice].prodCarrito.filter(producto => producto.idProd != req.params.id_Prod)
                }

                let objeto = JSON.stringify(arrayCarritos);

                fs.promises.writeFile('carrito.txt', objeto);

                res.status(201).json({ 'messaje': 'Producto Borrado' });
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