import {carritoModel, prodCarritoModel} from '../../contenedores/contenedorMongoDB.js'

const carritos = {};

//---------------------------------------
//Functions

carritos.CarritoNuevo = async(req, res, next) =>{
    try {
        const newCarrito = new carritoModel({
            "user": "Leo"
        })
        await newCarrito.save()
        res.status(201).json({'messaje':'Carrito Creado'})

    } catch (err) {
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

carritos.getCarritoById = async(req, res, next) => {
    try {
        const getCarrIdProd = await prodCarritoModel.find({idCarr:req.params.id})
        res.status(201).json(getCarrIdProd)
    } catch (err) {
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

carritos.agregarProd= async(req, res, next) => {
    try {
        if (req.body.idProd != undefined && req.body.nombreProd != undefined && req.body.imagen != undefined && req.body.Precio != undefined && req.body.stock != undefined) {
            const newProdCarrito = new prodCarritoModel({
                "idCarr": req.params.id,
                "idProd": req.body.idProd,
                "nombreProd": req.body.nombreProd,
                "imagen": req.body.imagen,
                "Precio": req.body.Precio,
                "stock": req.body.stock
            })
            await newProdCarrito.save()
            res.status(201).json({ 'messaje': 'Producto agregado' });
        } else {
            res.status(400).json({ error: "datos incorrectos" })
        }
    } catch (err) {
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

carritos.deleteById = async(req, res, next) => {
    try {
        const getDelCarr = await carritoModel.deleteOne({_id:req.params.id})
        res.status(201).json({ 'messaje': 'Carrito Borrado' }) 
    } catch (err) {
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

carritos.deleteByIdProd = async(req, res, next) => {
    try {
        const getDelProd = await prodCarritoModel.deleteMany({idCarr:req.params.id,idProd:req.params.id_Prod})
        res.status(201).json({ 'messaje': 'Producto Borrado' }) 
    } catch (err) {
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}
export default carritos;