import MySqlOption from '../config/knex.js'
import knex from 'knex'
const dbKnex = knex(MySqlOption)

dbKnex.schema.hasTable('productos')
.then((isExist) => (!isExist ? dbKnex.schema.createTable('productos', table =>{
    table.increments('id').primary().notNullable()
    table.string('timestamp')
    table.string('nombre')
    table.string('descripcion')
    table.integer('codigo')
    table.string('foto')
    table.float('precio')
    table.integer('stock')
}): false))
.catch((err)=>{console.log(err);})


dbKnex.schema.hasTable('ProdCarrito')
.then((isExist) => (!isExist ? dbKnex.schema.createTable('ProdCarrito', table =>{
    table.integer('id')
    table.integer('idProd')
    table.string('nombreProd')
    table.string('imagen')
    table.float('Precio')
    table.integer('stock')
}): false))
.catch((err)=>{console.log(err);})


dbKnex.schema.hasTable('carrito')
.then((isExist) => (!isExist ? dbKnex.schema.createTable('carrito', table =>{
    table.increments('id').primary().notNullable()
    table.string('timestamp')
}): false))
.catch((err)=>{console.log(err);})

export default dbKnex