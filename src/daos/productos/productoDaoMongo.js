import {productosModel} from '../../contenedores/contenedorMongoDB.js'

const producto = {};

//------------------------------------------
//functions

producto.getAll = async(req, res, next) => {
    try{
        const getAllProd = await productosModel.find({})
        res.status(201).json(getAllProd)
    }catch{
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

producto.save = async(req, res, next) => {
    try{
        if (req.body.nombre !== undefined && req.body.descripcion !== undefined && req.body.codigo !== undefined && req.body.foto !== undefined && req.body.precio !== undefined &&  req.body.stock !== undefined) {

            const newProducto = new productosModel({
                "nombre": req.body.nombre,
                "descripcion": req.body.descripcion,
                "codigo": req.body.codigo,
                "foto": req.body.foto,
                "precio": req.body.precio,
                "stock": req.body.stock
            })
            await newProducto.save()
        
            res.status(201).json({'messaje':'Producto Agregado'})
        }
        else{
            res.status(500).json( {'messaje':'Error de datos'} )
        }

    }catch (err){
        res.status(500).json( { message: `Server Error ${err}`} )
    }
    
}

producto.getById = async(req, res, next) => {
    try{
        const getByIdProd = await productosModel.find({_id:req.params.id})
        res.status(201).json(getByIdProd)
    }catch{
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

producto.updateById = async(req, res, next) => {
    try{
        //res.status(201).send(await Producto.updateById(req.params.id, req.body.timestamp, req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock))
        const getUpdProd = await productosModel.updateOne({_id:req.params.id},{
            $set:{
                "nombre": req.body.nombre,
                "descripcion":  req.body.descripcion,
                "codigo": req.body.codigo,
                "foto": req.body.foto,
                "precio": req.body.precio,
                "stock": req.body.stock
            }
        })
        res.status(201).json({'messaje':'Producto Actualizado'})
    }catch{
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

producto.deleteById = async(req, res, next) => {
    try{
        const getDelProd = await productosModel.deleteOne({_id:req.params.id})
        res.status(201).json({'messaje':'Producto Borrado'})
    }catch{
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

export default producto;