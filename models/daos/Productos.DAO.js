import { logger } from "../../src/utils/logger.js";
import { ContenedorMongoDB } from "../container/ContenedorMongoDB.js"
import ProductsModelMongoDB from "../products.model.js"

export class ProductsDAOMongoDB extends ContenedorMongoDB {
    constructor() {
        super(ProductsModelMongoDB);
    }

    async updateById(id, obj){
        try {
            await this.conn.connect();
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                let doc = await this.coleccion.findById(id);
                if (doc != null) {
                    let toUpdate = await this.coleccion.updateOne({_id: id}, {$set:{
                        product: obj.product,
                        price: obj.price,
                        img: obj.img,
                        code: obj.code,
                        description: obj.description,
                        stock: obj.stock
                    }});
                    doc = await this.coleccion.findById(id);
                    //logger.info(`El documento ${id} fue actualizado: ${doc}`)
                    return {state: {update: true, newData: doc}}
                } else {
                    logger.error(`El id ingresado: ("${id}") -> No coincide con ningun dato existente, revise los parametros de entrada`)
                    return {state: {update: false, data: 'El ID coincide con la BD pero es erroneo o inexistente'}};  
                }
            } else {
                logger.error(`El id ingresado: ("${id}") -> No coincide con ningun dato existente, revise los parametros de entrada`)
                return {state: {update: false, data: 'El ID es erroneo'}}; 
            }
        } catch (error) {
            console.log(error)
            return {state: {update: false, data: error}}; 
        } finally {
            await this.conn.disconnect();
        }
    }
}