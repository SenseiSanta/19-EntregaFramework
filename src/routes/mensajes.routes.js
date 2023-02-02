/* ============= INICIO DE ROUTEO ============= */
import koaRouter from 'koa-router';
const routerMessages = new koaRouter({
    prefix: '/api/mensajes'
});
import { getAllMessages, getMessageByID, addMessage, updateMessage, deleteMessage } from '../controllers/mensajes.controllers.js';

/* ============= Routing y metodos ============= */
// Solicitando info de todos los Messageos
routerMessages.get('/', getAllMessages)

// Solicitando info de Messageo segun id
routerMessages.get('/:id', getMessageByID) 

// Actualizacion de objeto en la DB
routerMessages.put('/:id', updateMessage)

// Insercion de objeto nuevo a la DB
routerMessages.post('/', addMessage)

// Borrado de objeto de la DB
routerMessages.delete('/:id', deleteMessage)

/* =========== Exportacion de modulo =========== */
export default routerMessages;