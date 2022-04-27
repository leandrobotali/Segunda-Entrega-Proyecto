//------------------------------------
//class producto
export class Producto{
    constructor(timestamp, nombre, descripcion, codigo, foto, precio, stock){
        this.timestamp = timestamp;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = parseInt(stock);
    }
}

//------------------------------------
//class carrito
export class ProdCarrito{
    constructor(idProd, nombreProd, imagen, Precio,cantidad){
        this.idProd = idProd;
        this.nombreProd = nombreProd;
        this.imagen = imagen;
        this.Precio = Precio;
        this.cantidad = cantidad;
    }
}

export class Carrito{
    constructor(id){
        this.id = id;
        this.prodCarrito = [];
    }
}