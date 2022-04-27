import {Carrito, ProdCarrito} from '../../contenedores/contenedorArchivo.js'
import fs from 'fs';

const carritos = {};

carritos.CarritoNuevo = async() =>{
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

        return arrayCarritos;

    } catch (err) {
        console.log(err);
    }
}

carritos.getCarritoById = async(id) => {
    try {
        const objError = { "error": "No existe el Carrito" }
        const arrayCarritos = JSON.parse(await fs.promises.readFile('carrito.txt', 'utf-8'))

        const find = arrayCarritos.find(carrito => carrito.id == id) || objError;

        if (find !== objError) {
            return find.prodCarrito
        } else {
            return find
        }

    } catch (err) {
        console.log(err);
    }
}

carritos.agregarProd= async(id,idProd, nombreProd, imagen, Precio,stock) => {
    const objError = { "error": "No existe el Carrito" }

    const arrayCarritos = JSON.parse(await fs.promises.readFile('carrito.txt', 'utf-8'))

    const indice = arrayCarritos.findIndex(carrito => carrito.id == id); //si existe el carrito
    if (indice != -1){
        const indiceProd = arrayCarritos[indice].prodCarrito.findIndex(producto => producto.idProd == idProd);//si existe el producto dentro del carrito
        if (indiceProd != -1 ){
            if (arrayCarritos[indice].prodCarrito[indiceProd].cantidad < stock){//si esta el producto en el carrito me fijo que la cantidad total sea menor al stock(si es igual no puedo vender mas producto)
                arrayCarritos[indice].prodCarrito[indiceProd].cantidad ++

                let objeto = JSON.stringify(arrayCarritos);

                fs.promises.writeFile('carrito.txt', objeto);

                return {"message":"Producto Agregado"}
            }else{
                return {"error": "No hay mas productos en stock"}
            }
        }else{
            if (stock >= 1){//si no esta el producto en el carrito, me fijo que el stock sea por lo menos de 1 producto
                let prodNuevo = new ProdCarrito(idProd, nombreProd, imagen, Precio, 1);
                arrayCarritos[indice].prodCarrito.push(prodNuevo)

                let objeto = JSON.stringify(arrayCarritos);

                fs.promises.writeFile('carrito.txt', objeto);

                return {"message":"Producto Agregado"}
            }else{
                return {"error": "No hay mas productos en stock"}
            }
        }
    }else{
        return objError
    } 
}

carritos.deleteById = async(id) => {
    try {
        const objError = { "error": "No existe el Carrito" }
        const arrayCarritos = JSON.parse(await fs.promises.readFile('carrito.txt', 'utf-8'))

        const find = arrayCarritos.find(carrito => carrito.id == id) || objError;

        if (find !== objError) {
            let nuevoArrayCarritos = arrayCarritos.filter(carrito => carrito.id != id)

            let objeto = JSON.stringify(nuevoArrayCarritos);

            fs.promises.writeFile('carrito.txt', objeto);

            return {"messaje": "Carrito Borrado"}
        } else {
            return find
        }

    } catch (err) {
        console.log(err);
    }
}

carritos.deleteByIdProd = async(id, idProd) => {
    const objError = { "error": "No existe el Carrito" }

    const arrayCarritos = JSON.parse(await fs.promises.readFile('carrito.txt', 'utf-8'))

    const indice = arrayCarritos.findIndex(carrito => carrito.id == id); //si existe el carrito
    if (indice != -1){
        const objErrorProd = { "error": "El producto no se encuentra en el Carrito" }
        const indiceProd = arrayCarritos[indice].prodCarrito.findIndex(producto => producto.idProd == idProd);//si existe el producto dentro del carrito
        if (indiceProd != -1){
            if(arrayCarritos[indice].prodCarrito[indiceProd].cantidad > 1){//si la cantidad en el carrito es mayor que 1 resta cantidad, si no elimina el producto del carrito
                arrayCarritos[indice].prodCarrito[indiceProd].cantidad --
            }else{
                arrayCarritos[indice].prodCarrito = arrayCarritos[indice].prodCarrito.filter(producto => producto.idProd != idProd)
            }

            let objeto = JSON.stringify(arrayCarritos);

            fs.promises.writeFile('carrito.txt', objeto);

            return {"message":"Producto borrado"}
        }else{
            return objErrorProd
        }
    }else{
        return objError
    }
}
export default carritos;