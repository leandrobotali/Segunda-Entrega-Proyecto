import knex from '../../contenedores/contenedorMySQL.js'

const producto = {};

//------------------------------------------
//functions

producto.getAll = async() => {
    try{
        const arrayProductos = await knex('productos')
        return arrayProductos
    }catch{
        return{'messaje':'error intentelo de nuevo'}
    }
}

producto.save = async(timestamp, nombre, descripcion, codigo, foto, precio, stock) => {
    try{
        let objeto = {
            "timestamp": timestamp,
            "nombre": nombre,
            "descripcion": descripcion,
            "codigo": codigo,
            "foto": foto,
            "precio": precio,
            "stock": stock
        }
        await knex('productos').insert(objeto)
        
        return objeto
    }catch{
        return{'messaje':'error de datos'}
    }
    
}

producto.getById = async(id) => {
    try{
        return await knex('productos').where("id", id)
    }catch{
        return{'messaje':'producto no encontrado'}
    }
}

producto.updateById = async(id, timestamp, nombre, descripcion, codigo, foto, precio, stock) => {
    try{
        let objeto = {
            "timestamp": timestamp,
            "nombre": nombre,
            "descripcion": descripcion,
            "codigo": codigo,
            "foto": foto,
            "precio": precio,
            "stock": stock
        }
        await knex('productos').where("id", id).update(objeto)
        
        return objeto
    }catch{
        return{'messaje':'error de datos'}
    }
}

producto.deleteById = async(id) => {
    try{
        await knex('productos').where("id", id).del()
        return{'messaje':'producto borrado'} 
    }catch{
        return{'messaje':'producto no encontrado'}
    }
}

export default producto;