import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.1xnky.mongodb.net/ecommerce?retryWrites=true&w=majority')
.then(db => console.log('database is connected'))
.catch(err => {
    console.error('connection error')
    process.exit(1)
});

const productoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    codigo:{
        type: Number,
        required: true
    },
    foto:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    }
},{
    timestamps:true
});


const carritoSchema = new mongoose.Schema({
    user:{type: String}
},{
    timestamps:true
})

const Mixed = mongoose.Schema.Types.Mixed

const prodCarritoSchema = new mongoose.Schema({

    idCarr: {
        type: Mixed,
        required: true
    },
    idProd: {
        type: Mixed,
        required: true
    },
    nombreProd: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    Precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})


const productosModel = mongoose.model('productos', productoSchema)
const carritoModel = mongoose.model('carritos', carritoSchema)
const prodCarritoModel = mongoose.model('prodCarrito', prodCarritoSchema)

export {productosModel,carritoModel,prodCarritoModel}

