import {productosModel} from '../../contenedores/contenedorMongoDB.js'

const producto = {};

//------------------------------------------
//functions

producto.getAll = async() => {
    try{
        const getAllProd = await productosModel.find({})
        return getAllProd
    }catch{
        return{'messaje':'error intentelo de nuevo'}
    }
}

producto.save = async(timestamp, nombre, descripcion, codigo, foto, precio, stock) => {
    try{
        const newProducto = new productosModel({
            "nombre": nombre,
            "descripcion": descripcion,
            "codigo": codigo,
            "foto": foto,
            "precio": precio,
            "stock": stock
        })
        await newProducto.save()
        .then(()=>{console.log('producto agregado');})
        
        return{'messaje':'producto agregado'}
    }catch (err){
        console.log(err);
    }
    
}

producto.getById = async(id) => {
    try{
        const getByIdProd = await productosModel.find({_id:id})
        return getByIdProd
    }catch{
        return{'messaje':'producto no encontrado'}
    }
}

producto.updateById = async(id, timestamp, nombre, descripcion, codigo, foto, precio, stock) => {
    try{
        const getUpdProd = await productosModel.updateOne({_id:id},{
            $set:{
                "nombre": nombre,
                "descripcion": descripcion,
                "codigo": codigo,
                "foto": foto,
                "precio": precio,
                "stock": stock
            }
        })
        return{'messaje':'producto actualizado'} 
    }catch{
        return{'messaje':'error de datos'}
    }
}

producto.deleteById = async(id) => {
    try{
        const getDelProd = await productosModel.deleteOne({_id:id})
        return{'messaje':'producto borrado'} 
    }catch{
        return{'messaje':'producto no encontrado'}
    }
}

export default producto;