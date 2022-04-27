import {Producto} from '../../contenedores/contenedorArchivo.js'
import fs from 'fs';

const producto = {};

//------------------------------------------
//functions

producto.getAll = async() => {
    try{
       const arrayProductos = JSON.parse(await fs.promises.readFile('productos.txt', 'utf-8'))
       return arrayProductos;
    }catch{
        console.log('error de lectura');
    }
    
}

producto.save = async(timestamp, nombre, descripcion, codigo, foto, precio, stock) => {
    let obj = new Producto(timestamp, nombre, descripcion, codigo, foto, precio, stock)

    try{
        const arrayProductos = JSON.parse(await fs.promises.readFile('productos.txt', 'utf-8'))
        
        let idMasAlto = 0;
        if(arrayProductos.length>0){
           idMasAlto =  arrayProductos.reduce((acum,proximo)=> acum>proximo.id? acum:proximo.id,0);
        }
        obj.id = parseInt(idMasAlto) + 1

        arrayProductos.push(obj);
        let objeto = JSON.stringify(arrayProductos);

        fs.promises.writeFile('productos.txt', objeto)

        return obj;
     }catch (err){
         console.log(err);
     }

}

producto.getById = async(id) => {
    const objError = { "error": "producto no encontrado" }
    try{
        const arrayProductos = JSON.parse(await fs.promises.readFile('productos.txt', 'utf-8'))
        const find = arrayProductos.find(producto => producto.id == id) || objError;
        return find;
     }catch{
         console.log('error de lectura');
     }
}

producto.updateById = async(id, timestamp, nombre, descripcion, codigo, foto, precio, stock) => {
    const objError = { "error": "producto no encontrado" }
    try{
        const arrayProductos = JSON.parse(await fs.promises.readFile('productos.txt', 'utf-8'))
        const find = arrayProductos.find(producto => producto.id == id) || objError;
        if (find !== objError) {
            find.timestamp = timestamp;
            find.nombre = nombre;
            find.descripcion = descripcion;
            find.codigo = codigo;
            find.foto = foto;
            find.precio = precio;
            find.stock = stock;

            let indice = arrayProductos.findIndex(producto => producto.id == id);
            arrayProductos[indice] = find;

            let objeto = JSON.stringify(arrayProductos);

            fs.promises.writeFile('productos.txt', objeto)
        }

        return find;
     }catch{
         console.log('error de lectura');
     }
}

producto.deleteById = async(id) => {
    try{
        const arrayProductos = JSON.parse(await fs.promises.readFile('productos.txt', 'utf-8'))
        let nuevoArray = arrayProductos.filter(producto => producto.id != id)

        let objeto = JSON.stringify(nuevoArray);
                
        fs.promises.writeFile('productos.txt', objeto)

        return nuevoArray;

     }catch{
         console.log('error de lectura');
     }
}

export default producto;