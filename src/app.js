import express from 'express'
import path from 'path'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//--------------------------------------------
// Load Routes
import productosRouter from'./routes/productos.routes.js';
import carritoRouter from './routes/carrito.rutes.js';

//--------------------------------------------
// Build Express App
const app = express()

//--------------------------------------------
// Middlewares Load
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//--------------------------------------------
// Apis
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);


//--------------------------------------------
//Error Load
app.use((req, res) => {
    res.json({
    error: {
        error: -2,
        descripcion: `Ruta ${req.originalUrl} y metodo ${req.method} no implementados`
}})});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Algo salio mal, volve a intentarlo');
});

//--------------------------------------------
//Exports
export default app