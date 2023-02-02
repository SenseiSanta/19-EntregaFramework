
import { MensajesDAOFirebase } from '../../models/daos/Mensajes.DAO.js';
import { UsersDAOMongoDB } from '../../models/daos/Usuarios.DAO.js';
import { ProductsDAOMongoDB } from '../../models/daos/Productos.DAO.js';

const cajaMensajes = new MensajesDAOFirebase();
const cajaProducto = new ProductsDAOMongoDB();
const cajaUsuario = new UsersDAOMongoDB();

export async function getMessages() {
    try {
        return await cajaMensajes.getAll();
    } catch (error) {
        throw new Error ('Ha ocurrido un problema al obtener los mensajes')
    }
}

export async function getProducts() {
    try {
        return await cajaProducto.getAll();
    } catch (error) {
        throw new Error ('Ha ocurrido un problema al obtener los productos')
    }
}

export async function getUsers() {
    try {
        return await cajaUsuario.getAll()
    } catch (error) {
        throw new Error ('Ha ocurrido un problema al obtener los usuarios')
    }
}

export async function getUserById(id) {
    try {
        return await cajaUsuario.getById(id)
    } catch (error) {
        throw new Error ('Ha ocurrido un problema al obtener el usuario especificado')
    }
}

export async function getUserByUsername(user) {
    try {
        return await cajaUsuario.getUserByUsername(user)
    } catch (error) {
        throw new Error ('Ha ocurrido un problema al obtener el usuario especificado')
    }
}

export async function saveInfoUser(userInfo) {
    try {
        return await cajaUsuario.save(userInfo)
    } catch (error) {
        throw new Error (`Ha ocurrido un problema al guardar el usuario ${userInfo.username}`)
    }
}