import knex from '../../contenedores/contenedorMySQL.js'

const carritos = {};

carritos.CarritoNuevo = async(req, res, next) =>{
    try {
        let fyh = new Date();

        let fyhActual = fyh.getDate() + '/' + ( fyh.getMonth() + 1 ) + '/' + fyh.getFullYear() + " - " + fyh.getHours() + ':' + fyh.getMinutes() + ':' + fyh.getSeconds()
        const objeto = {
            "timestamp" : fyhActual
        }
        await knex('carrito').insert(objeto)
        res.status(201).json({'messaje':'Carrito Creado'})

    } catch (err) {
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

carritos.getCarritoById = async(req, res, next) => {
    try {
        const prodCarrito = await knex('prodCarrito').where("id", req.params.id)
        res.status(201).json(prodCarrito)
    } catch (err) {
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

carritos.agregarProd = async(req, res, next) => {
    try {
        if (req.body.idProd != undefined && req.body.nombreProd != undefined && req.body.imagen != undefined && req.body.Precio != undefined && req.body.stock != undefined) {
            let objeto = {
                "id": req.params.id,
                "idProd": req.body.idProd,
                "nombreProd": req.body.nombreProd,
                "imagen": req.body.imagen,
                "Precio": req.body.Precio,
                "stock": req.body.stock
            }
            await knex('prodCarrito').insert(objeto)
            res.status(201).json({ 'messaje': 'Producto agregado' })
        } else {
            res.status(400).json({ error: "datos incorrectos" })
        }
    } catch (err) {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

carritos.deleteById = async(req, res, next) => {
    try {
        await knex('carrito').where("id", req.params.id).del()
        res.status(201).json({ 'messaje': 'Carrito Borrado' }) 
    } catch (err) {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}

carritos.deleteByIdProd = async(req, res, next) => {
    try {
        await knex('prodCarrito').where("id", req.params.id).andWhere("idProd", req.params.id_Prod).del()
        res.status(201).json({ 'messaje': 'Producto Borrado' })
    } catch (err) {
        res.status(500).json({ message: `Server Error ${err}` })
    }
}
export default carritos;