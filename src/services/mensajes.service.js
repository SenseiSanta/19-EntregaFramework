import { MensajesDAOFirebase } from '../../models/daos/Mensajes.DAO.js';
const db = new MensajesDAOFirebase();

export async function getAllMessagesData() {
    try {
        return await db.getAll()
    } catch (error) {
        throw new Error ('Ha ocurrido un error al obtener los datos de la BD')
    }
}

export async function getMessageDataID(id) {
    try {
        let data = await db.getById(id)
        return data
    } catch (error) {
        throw new Error (`Ha ocurrido un error al obtener los datos del mensaje solicitado con ID ${id}`)
    }
}

export async function updateMessageByID(id, obj) {
    try {
        let data = await db.updateById(id, obj)
        return data
    } catch (error) {
        throw new Error (`Ha ocurrido un error al obtener los datos del mensaje solicitado con ID ${id}`)
    }
}

export async function addNewMessage(newMsg) {
    try {
        return await db.save(newMsg)
    } catch (error) {
        throw new Error (`Ha ocurrido al guardar el nuevo mensaje con autor a: ${newMsg.author}`)
    }
}

export async function deleteMessageByID (id) {
    try {
        let data = await db.deleteById(id);
        return data
    } catch (error) {
        throw new Error (`Ha ocurrido un error al intentar eliminar el mensaje con ID: ${id}`)
    }
}
