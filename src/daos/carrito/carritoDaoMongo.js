import {carritoModel, prodCarritoModel} from '../../contenedores/contenedorMongoDB.js'

const carritos = {};

carritos.CarritoNuevo = async() =>{
    try {
        const newCarrito = new carritoModel({
            "user": "Leo"
        })
        await newCarrito.save()
        return{'messaje':'Carrito Creado'}

    } catch (err) {
        console.log(err);
    }
}

carritos.getCarritoById = async(id) => {
    try {
        const getCarrIdProd = await prodCarritoModel.find({idCarr:id})
        return getCarrIdProd
    } catch (err) {
        console.log(err);
    }
}

carritos.agregarProd= async(id,idProd, nombreProd, imagen, Precio,stock) => {
    try {
        const newProdCarrito = new prodCarritoModel({
            "idCarr": id,
            "idProd": idProd,
            "nombreProd": nombreProd,
            "imagen": imagen,
            "Precio": Precio,
            "stock": stock
        })
        console.log(newProdCarrito.idCarr);
        await newProdCarrito.save()
        return{'messaje':'Producto agregado'}
    } catch (err) {
        console.log(err);
    }
}

carritos.deleteById = async(id) => {
    try {
        const getDelCarr = await carritoModel.deleteOne({_id:id})
        return{'messaje':'Carrito borrado'} 
    } catch (err) {
        console.log(err);
    }
}

carritos.deleteByIdProd = async(id, idProd) => {
    try {
        const getDelProd = await prodCarritoModel.deleteMany({idCarr:id,idProd:idProd})
        return{'messaje':'producto borrado'} 
    } catch (err) {
        console.log(err);
    }
}
export default carritos;