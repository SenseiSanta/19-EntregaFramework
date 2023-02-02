/* ============== Imports Grales. ============== */
import {logger} from '../utils/logger.js';
import { getAllMessagesData, getMessageDataID, updateMessageByID, addNewMessage, deleteMessageByID } from '../services/mensajes.service.js'
import CustomError from '../classes/CustomError.class.js';

/* ============= Mensaje de error ============= */
const internalError = 'Error en el servidor, intente nuevamente';

/* =============== CONTROLADORES =============== */
export async function getAllMessages (ctx) {
    try {
        let messagesList = await getAllMessagesData()
        ctx.body = {
            status: 200,
            data: messagesList
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

export async function getMessageByID (ctx) {
    try {
        const id = ctx.params.id;
        let data = await getMessageDataID(id)
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

export async function updateMessage (ctx) {
    try {
        const newObject = {};
        const id = ctx.params.id;
        let { author, text } = ctx.request.body;
        if (author) { newObject["author"] = author };
        if (text) { newObject["text"] = text };
        const actualizado = await updateMessageByID(id, newObject)
        console.log(actualizado)
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
                data: {error: 'No se actualizo nada: Usuario no encontrado',
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

export async function addMessage (ctx) {
    try {
        let { author, text } = ctx.request.body;
        // Validacion de datos
        if (!author || !text) {
            logger.error(`El mensaje no se ha guardado porque faltan datos del mismo`)
            ctx.response.status = 403
            ctx.body = {
                status: 403,
                data: 'Faltan datos para guardar el usuario'
            }
        } else {
            const newMessage = {
                author,
                text,
                timestamp: new Date().toLocaleString()
            };
            let data = await addNewMessage(newMessage);
            ctx.response.status = 201
            ctx.body = {
                status: 201,
                data: data
            }
        }
    } catch (error) {
        logger.error(error);
        ctx.response.status = 500
        ctx.body = {
            status: 500,
            data: internalError
        }
    }
}

export async function deleteMessage (ctx) {
    try {
        const id = ctx.params.id;
        const eliminado = await deleteMessageByID(id)
        if (eliminado.state.delete == true) {
            ctx.response.status = 200
            ctx.body = {
                status: 200,
                data: eliminado
            }
        } else {
            logger.error('Error al eliminar el usuario')
            ctx.response.status = 400
            ctx.body = {
                status: 400,
                error: 'No se elimino nada: Usuario no encontrado',
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
