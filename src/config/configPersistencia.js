import productoDaoMemoria from '../daos/productos/productoDaoMemoria.js'
import productoDaoArchivo from '../daos/productos/productoDaoArchivo.js'
import productoDaoMySQL from '../daos/productos/productoDaoMySQL.js'
import productoDaoMongoDB from '../daos/productos/productoDaoMongo.js'

import carritoDaoMemoria from '../daos/carrito/carritoDaoMemoria.js'
import carritoDaoArchivo from '../daos/carrito/carritoDaoArchivo.js'
import carritoDaoMySQL from '../daos/carrito/carritoDaoMySQL.js'
import carritoDaoMongoDB from '../daos/carrito/carritoDaoMongo.js'

//--------------------------------------------
//tipos de persistencias: memoria, archivo, mySQL, MongoDB
let tipoPersistencia = "MongoDB"

let Producto,Carrito;

switch(tipoPersistencia){
    case (tipoPersistencia = "memoria"):
        Producto = productoDaoMemoria;
        Carrito = carritoDaoMemoria;
        break;
    case (tipoPersistencia = "archivo"):
        Producto = productoDaoArchivo;
        Carrito = carritoDaoArchivo;
        break;
    case (tipoPersistencia = "dbSQL"):
        Producto = productoDaoMySQL;
        Carrito = carritoDaoMySQL;
        break;
    case (tipoPersistencia = "MongoDB"):
        Producto = productoDaoMongoDB;
        Carrito = carritoDaoMongoDB;
        break;
    default:
        console.log("error de tipo de persistencia");
}

export{Producto, Carrito}