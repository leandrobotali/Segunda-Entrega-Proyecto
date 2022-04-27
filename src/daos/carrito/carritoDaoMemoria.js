import {Carrito, ProdCarrito} from '../../contenedores/contenedorMemoria.js'

const carritos = {};
let carrito = [];


carritos.CarritoNuevo = () =>{
    let idMasAlto = 0;

    if (carrito.length > 0) {
        idMasAlto = carrito.reduce((acum, proximo) => acum > proximo.id ? acum : proximo.id, 0);//busca el id mas alto
    }

    let objId = parseInt(idMasAlto) + 1

    let obj = new Carrito(objId)

    carrito.push(obj);

    return {"id": objId};
}

carritos.getCarritoById = (id) => {
    const objError = { "error": "No existe el Carrito" }
    const find = carrito.find(carrito => carrito.id == id) || objError;//busca si existe el carrito
    if (find !== objError) {
        return find.prodCarrito
    } else {
        return find
    }
}

carritos.agregarProd= (id,idProd, nombreProd, imagen, Precio,stock) => {
    const objError = { "error": "No existe el Carrito" }
    const indice = carrito.findIndex(carrito => carrito.id == id); //si existe el carrito
    if (indice != -1){
        const indiceProd = carrito[indice].prodCarrito.findIndex(producto => producto.idProd == idProd);//si existe el producto dentro del carrito
        if (indiceProd != -1 ){
            if (carrito[indice].prodCarrito[indiceProd].cantidad < stock){//si esta el producto en el carrito me fijo que la cantidad total sea menor al stock(si es igual no puedo vender mas producto)
                carrito[indice].prodCarrito[indiceProd].cantidad ++
                return {"message":"Producto Agregado"}
            }else{
                return {"error": "No hay mas productos en stock"}
            }
        }else{
            if (stock >= 1){//si no esta el producto en el carrito, me fijo que el stock sea por lo menos de 1 producto
                let prodNuevo = new ProdCarrito(idProd, nombreProd, imagen, Precio, 1);
                carrito[indice].prodCarrito.push(prodNuevo)
                return {"message":"Producto Agregado"}
            }else{
                return {"error": "No hay mas productos en stock"}
            }
        }
    }else{
        return objError
    } 
}

carritos.deleteById =(id) => {
    const objError = { "error": "Carrito no encontrado" }
    const find = carrito.find(carrito => carrito.id == id) || objError;
    if (find !== objError) {
        carrito = carrito.filter(carrito => carrito.id != id);

        return carrito
    } else {
        return find
    }
}

carritos.deleteByIdProd = (id, idProd) => {
    const objError = { "error": "Carrito no encontrado" }
    const indice = carrito.findIndex(carrito => carrito.id == id);//busca si existe el carrito
    if (indice != -1) {
        const objErrorProd = { "error": "El producto no se encuentra en el Carrito" }
        const indiceProd = carrito[indice].prodCarrito.findIndex(producto => producto.idProd == idProd);//busca si el producto se encuentra en el carrito
        if (indiceProd != -1){
            if(carrito[indice].prodCarrito[indiceProd].cantidad > 1){//si la cantidad en el carrito es mayor que 1 resta cantidad, si no elimina el producto del carrito
                carrito[indice].prodCarrito[indiceProd].cantidad --
            }else{
                carrito[indice].prodCarrito = carrito[indice].prodCarrito.filter(producto => producto.idProd != idProd)
            }
        }else{
            return objErrorProd
        }
    } else {
        return objError
    }
}
export default carritos;