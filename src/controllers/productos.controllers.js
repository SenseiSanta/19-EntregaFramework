/* ============== Imports Grales. ============== */
import {logger} from '../utils/logger.js';
import { getAllProductsData, getProdDataID, updateProductByID, addNewProduct, deleteProdByID } from '../services/productos.service.js'
import CustomError from '../classes/CustomError.class.js';

/* ============= Mensaje de error ============= */
const internalError = 'Error en el servidor, intente nuevamente';

/* =============== CONTROLADORES =============== */
export async function getAllProducts (ctx) {
    try {
        let productList = await getAllProductsData()
        ctx.body = {
            status: 200,
            data: productList
        }
    } catch (error) {
        logger.error(error)
        ctx.response.status = 500
        ctx.body = {
            status: 500,
            data: internalError
        }
    }
}

export async function getProductByID (ctx) {
    try {
        const id = ctx.params.id;
        let data = await getProdDataID(id)
        if (data == undefined) {
            ctx.response.status = 404
            ctx.body = {
                status: 404,
                data: 'No se ha encontrado nada, por favor revise los parametros ingresados'
            }
        } else {
            ctx.body = {
                status: 200,
                data: data
            }
        }
    } catch (error) {
        logger.error(error)
        ctx.response.status = 500
        ctx.body = {
            status: 500,
            data: internalError
        }
    }
}

export async function updateProduct (ctx) {
    try {
        const newObject = {};
        const id = ctx.params.id;
        let { product, price, img, code, description, stock } = ctx.request.body;
        if (product) { newObject["product"] = product };
        if (price) { newObject["price"] = price };
        if (img) { newObject["img"] = img };
        if (code) { newObject["code"] = code };
        if (description) { newObject["description"] = description };
        if (stock) { newObject["stock"] = stock };
        const actualizado = await updateProductByID(id, newObject)
        if (actualizado.state.update == true) {
            ctx.response.status = 201
            ctx.body = {
                status: 201,
                data: actualizado
            }
        } else {
            ctx.response.status = 400
            ctx.body = {
                status: 400,
                data: {error: 'No se actualizo nada: Producto no encontrado',
                        ...actualizado}
            }
        }
    } catch (error) {
        logger.error(error)
        ctx.response.status = 500
        ctx.body = {
            status: 500,
            data: internalError
        }
    }
}

export async function addProduct (ctx) {
    let errorCode;
    try {
        let { product, price, img, code, description, stock } = ctx.request.body;
        // Validacion de datos
        if (!product || !price || !img || !code || !description || !stock) {
            logger.error(`El objeto ${product} no se ha guardado porque faltan datos del mismo`)
            ctx.response.status = 403
            ctx.body = {
                status: 403,
                data: 'Faltan datos para guardar el item'
            }
        } else {
            let prevData = await getAllProductsData()
            // Validacion de item (no repetido)
            for (let i = 0; i < prevData.length; i++) {
                if (prevData[i].product == product) {
                    errorCode = 1;
                    throw new CustomError(400, 'No se ha guardado nada', 'El producto existe en la Base de datos, intente con otro nombre')
                }
            }
            const newObject = {
                product,
                price,
                img,
                code,
                description,
                stock
            }
            let data = await addNewProduct(newObject);
            ctx.response.status = 201
            ctx.body = {
                status: 201,
                data: data
            }
        }
    } catch (error) {
        switch (errorCode) {
            case 1:
                logger.error(`${error.description}. ${error.message}`);
                ctx.response.status = error.status
                ctx.body = {
                    status: error.status,
                    description: error.description,
                    message: error.message
                }
                break;
            default:
                logger.error(error);
                ctx.response.status = 500
                ctx.body = {
                    status: 500,
                    data: internalError
                }
                break;
        }

    }
}

export async function deleteProduct (ctx) {
    try {
        const id = ctx.params.id;
        const eliminado = await deleteProdByID(id)
        if (eliminado.state.delete == true) {
            ctx.response.status = 200
            ctx.body = {
                status: 200,
                data: eliminado
            }
        } else {
            logger.error('Error al eliminar el objeto')
            ctx.response.status = 400
            ctx.body = {
                status: 400,
                error: 'No se elimino nada: Producto no encontrado',
                data: eliminado
            }
        }  
    } catch (error) {
        logger.error(error)
        ctx.response.status = 500
        ctx.body = {
            status: 500,
            data: internalError
        }
    }
}