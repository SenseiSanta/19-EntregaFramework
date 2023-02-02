/* ============== Imports Grales. ============== */
import {logger} from '../utils/logger.js';
import { getAllCartData, getCartDataID, addNewCart, addProductInCart } from '../services/carritos.service.js'
import { getProdDataID } from '../services/productos.service.js'
import CustomError from '../classes/CustomError.class.js';

/*, addNewCart, deleteCartByID*/

/* ============= Mensaje de error ============= */
const internalError = 'Error en el servidor, intente nuevamente';

/* =============== CONTROLADORES =============== */
export async function getAllCarts (req, res) {
    try {
        let cartList = await getAllCartData()
        res.status(200).json(cartList);
    } catch (error) {
        logger.error(error)
        res.status(500).json(new CustomError(500, error, internalError))
    }
}

export async function getCartByID (req, res) {
    try {
        const id = req.params['id'];
        let data = await getCartDataID(id)
        if (data == undefined) {
            res.status(404).json(new CustomError(404, 'El id no coincide con los guardados en DB', 'El id no se encuentra en la base de datos, revise el parametro ingresado'));
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        logger.error(error)
        res.status(500).json(new CustomError(500, error, internalError))
    }
}

export async function addCart (req, res) {
    try {
        let owner = req.params['owner'] || 'unassigned'
        console.log(owner)
        let state = await addNewCart(owner);
        if (state == false) {
            logger.error('El carrito no se pudo crear, intente nuevamente')
            res.status(400).send('El carrito no fue creado, intente nuevamente')
        } else {
            logger.info(`Carrito ${state.id} creado exitosamente`)
            res.status(201).json({status: 'Created', data: state});
        }
    } catch (error) {
        logger.error(error);
        res.status(500).json(new CustomError(500, error, internalError))
    }
}

export async function addProductToCart (req, res) {
    let errorCode;
    try {
        const cartId = req.params['id'];
        const prodId = req.body.id;
        let cartData = await getCartDataID(cartId)
        if (cartData == undefined) {
            res.status(404).send('No se ha encontrado ningun carrito con ese id, por favor revise los parametros ingresados');
        } else {
            let productData = await getProdDataID(prodId)
            if (productData == undefined) {
                res.status(404).send('No se ha encontrado ningun producto con ese id, por favor intente mas tarde');
            } else {
                cartData.productos.push(productData)
                let insertProduct = await addProductInCart(cartData, cartId)
                if (insertProduct) {
                    res.status(200).json({msg: "Agregado exitosamente. A continuacion el carrito:",
                                          obj: cartData});
                } else {
                    res.status(400).send('Al parecer no se ha actualizado el carrito debido a un problema interno');
                }
            }
        }
    } catch (error) {
        switch (errorCode) {
            case 1:
                logger.error(`${error.description}. ${error.message}`);
                res.status(error.status).send(error.message);
                break;
            default:
                logger.error(error);
                res.status(500).json(new CustomError(500, error, internalError))
                break;
        }

    }
}

export async function delProductInCart (req, res) {
    const idCart = req.params['id'];
    const idProd = req.params['id_prod'];
    const carrito = await getCartByID(idCart);
    if (carrito.error) {
        res.status(400).json(
            {
                error: carrito.error,
                mensaje: 'Error en el carrito'
            })
    } else {
        const producto = await cajaProducto.getById(idProd);
        if (producto.error){
            res.status(400).json(
                {
                    error: producto.error,
                    mensaje: 'Error en el producto'
                })
        } else {
            const eliminado = await cajaCarritos.deleteProductById(carrito, producto)
            if (eliminado) {
                res.status(200).json({msg: 'Eliminado con exito'});
            } else {
                res.status(400).json({error: 'No se elimino nada: Producto no encontrado'})
            }
        }
    }
}

/*export async function deleteProduct (req, res) {
    try {
        const id = req.params['id'];
        const eliminado = await deleteProdByID(id)
        if (eliminado) {
            logger.info('Eliminado con exito')
            res.status(200).send('Eliminado con exito');
        } else {
            logger.error('Error al eliminar el objeto')
            res.status(400).json({error: 'No se elimino nada: Producto no encontrado'})
        }  
    } catch (error) {
        logger.error(error)
        res.status(500).send(internalError)
    }
} */