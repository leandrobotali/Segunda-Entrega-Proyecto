import knex from '../../contenedores/contenedorMySQL.js'

const carritos = {};

carritos.CarritoNuevo = async() =>{
    try {
        let fyh = new Date();

        let fyhActual = fyh.getDate() + '/' + ( fyh.getMonth() + 1 ) + '/' + fyh.getFullYear() + " - " + fyh.getHours() + ':' + fyh.getMinutes() + ':' + fyh.getSeconds()
        const objeto = {
            "timestamp" : fyhActual
        }
        await knex('carrito').insert(objeto)
        return{'messaje':'Carrito Creado'}

    } catch (err) {
        console.log(err);
    }
}

carritos.getCarritoById = async(id) => {
    try {
        return knex('prodCarrito').where("id", id)
    } catch (err) {
        console.log(err);
    }
}

carritos.agregarProd= async(id,idProd, nombreProd, imagen, Precio,stock) => {
    try {
        let objeto = {
            "id": id,
            "idProd": idProd,
            "nombreProd": nombreProd,
            "imagen": imagen,
            "Precio": Precio,
            "stock": stock
        }
        await knex('prodCarrito').insert(objeto)
        return {"messaje":"Producto agregado"}
    } catch (err) {
        console.log(err);
    }
}

carritos.deleteById = async(id) => {
    try {
        await knex('carrito').where("id", id).del()
        return{'messaje':'Carrito borrado'} 
    } catch (err) {
        console.log(err);
    }
}

carritos.deleteByIdProd = async(id, idProd) => {
    try {
        await knex('prodCarrito').where("id", id).andWhere("idProd", idProd).del()
        return{'messaje':'producto borrado'} 
    } catch (err) {
        console.log(err);
    }
}
export default carritos;