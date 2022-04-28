import knex from '../../contenedores/contenedorMySQL.js'

const producto = {};

//------------------------------------------
//functions

producto.getAll = async(req, res, next) => {
    try{
        const arrayProductos = await knex('productos')
        res.status(201).json(arrayProductos)
    }catch{
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

producto.save = async (req, res, next) => {
    try {
        if (req.body.nombre !== undefined && req.body.descripcion !== undefined && req.body.codigo !== undefined && req.body.foto !== undefined && req.body.precio !== undefined && req.body.stock !== undefined) {
            let fyh = new Date();

            let fyhActual = fyh.getDate() + '/' + (fyh.getMonth() + 1) + '/' + fyh.getFullYear() + " - " + fyh.getHours() + ':' + fyh.getMinutes() + ':' + fyh.getSeconds()
            let objeto = {
                "timestamp": fyhActual,
                "nombre": req.body.nombre,
                "descripcion": req.body.descripcion,
                "codigo": req.body.codigo,
                "foto": req.body.foto,
                "precio": req.body.precio,
                "stock": req.body.stock
            }
            await knex('productos').insert(objeto)

            res.status(201).json({'messaje':'Producto Agregado'})
        }
        else {
            res.status(500).json({ 'messaje': 'Error de datos' })
        }

    } catch (err) {
        res.status(500).json( { message: `Server Error ${err}`} )
    }


}

producto.getById = async(req, res, next) => {
    try{
        res.status(201).json(await knex('productos').where("id", req.params.id))
    }catch{
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

producto.updateById = async (req, res, next) => {
    try {
        if (req.body.nombre !== undefined && req.body.descripcion !== undefined && req.body.codigo !== undefined && req.body.foto !== undefined && req.body.precio !== undefined && req.body.stock !== undefined) {
            let fyh = new Date();

            let fyhActual = fyh.getDate() + '/' + (fyh.getMonth() + 1) + '/' + fyh.getFullYear() + " - " + fyh.getHours() + ':' + fyh.getMinutes() + ':' + fyh.getSeconds()
            let objeto = {
                "timestamp": fyhActual,
                "nombre": req.body.nombre,
                "descripcion": req.body.descripcion,
                "codigo": req.body.codigo,
                "foto": req.body.foto,
                "precio": req.body.precio,
                "stock": req.body.stock
            }
            await knex('productos').where("id", req.params.id).update(objeto)

            res.status(201).json({'messaje':'Producto Actualizado'})
        }
        else {
            res.status(500).json({ 'messaje': 'Error de datos' })
        }

    } catch (err) {
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

producto.deleteById = async(req, res, next) => {
    try{
        await knex('productos').where("id", req.params.id).del()
        res.status(201).json({'messaje':'Producto Borrado'}) 
    }catch{
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

export default producto;