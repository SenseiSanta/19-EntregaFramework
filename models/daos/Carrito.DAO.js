import { ContenedorMongoDB } from '../container/ContenedorMongoDB.js'
import CartsModelMongoDB from '../carts.model.js'
import { logger } from '../../src/utils/logger.js';

export class CarritosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super(CartsModelMongoDB)
    }

    async save(owner) {
        try {
            await this.conn.connect();
            let doc = await this.coleccion.create({owner: owner, products: []});
            logger.info(`Carrito creado: ${doc}`)
            return doc
        } catch (error) {
            console.log(error)
            return false
        } finally {
            await this.conn.disconnect();
        }
    }

    async updateCart(obj, id) {
        try {
            await this.coleccion.updateOne({"_id": id}, {$set: {id: id, ...obj}})
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async deleteProductById (carrito, producto) {
        try{
            const toDelete = await this.coleccion.findById({"_id": carrito.id})
            if (toDelete.id !== undefined) {
                for (let i = 0; i <= carrito.productos.length; i++) {
                    if (carrito.productos[i].producto == producto.producto) {
                        carrito.productos.splice(i, 1)
                        await this.updateCart(carrito, carrito.id)
                        return true
                    }
                }
            } else {
                throw new Error (`No se ha encontrado ningun producto en el carrito designado con ese id`)
            }         
        } catch(error) {
            console.log(error)
            return false
        }
    }
}