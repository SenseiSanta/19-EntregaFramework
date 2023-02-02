/* ============= INICIO DE ROUTEO ============= */
import koaRouter from 'koa-router';
const routerUsuarios = new koaRouter({
    prefix: '/api/usuarios'
});
import { getAllUsers, getUserByID, addUser, updateUser, deleteUser } from '../controllers/usuarios.controllers.js';

/* ============= Routing y metodos ============= */
// Solicitando info de todos los productos
routerUsuarios.get('/', getAllUsers)

// Solicitando info de producto segun id
routerUsuarios.get('/:id', getUserByID) 

// Actualizacion de objeto en la DB
routerUsuarios.put('/:id', updateUser)

// Insercion de objeto nuevo a la DB
routerUsuarios.post('/', addUser)

// Borrado de objeto de la DB
routerUsuarios.delete('/:id', deleteUser)

/* =========== Exportacion de modulo =========== */
export default routerUsuarios;