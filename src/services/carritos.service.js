import { ProductsDAOMongoDB } from '../../models/daos/Productos.DAO.js';
import { CarritosDaoMongoDB } from '../../models/daos/Carrito.DAO.js';
import { logger } from '../utils/logger.js';

const cajaCarrito = new CarritosDaoMongoDB();

export async function getAllCartData() {
    try {
        return await cajaCarrito.getAll();
    } catch (error) {
        logger.error(error)
        throw new Error ('Ha ocurrido un problema al obtener los carritos')
    }
}

export async function getCartDataID(id) {
    try {
        let data = await cajaCarrito.getById(id)
        return data
    } catch (error) {
        logger.error(error)
        throw new Error (`Ha ocurrido un error al obtener los datos del carrito solicitado con ID ${id}`)
    }
}

export async function addNewCart(owner) {
    try {
        let state = await cajaCarrito.save(owner);
        return state
    } catch (error) {
        logger.error(error)
        throw new Error (`Ha ocurrido un error al intentar crear el carrito. Intente nuevamente`)
    }
}

export async function addProductInCart(cart, id) {
    try {
        let process = await cajaCarrito.updateCart(cart, id);
        return process;
    } catch (error) {
        logger.error(error)
        throw new Error (`Ha ocurrido un error al intentar actualizar el carrito con su nuevo producto. Intente nuevamente`)
    }
}