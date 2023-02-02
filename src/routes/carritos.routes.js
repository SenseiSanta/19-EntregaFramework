/* ============= INICIO DE ROUTEO ============= */
import koaRouter from 'koa-router';
const routerCarritos = new koaRouter({
    prefix: '/carritos'
});
import { getAllCarts, getCartByID, addCart, addProductToCart, delProductInCart } from '../controllers/carritos.controllers.js';
/*, delProductInCart, deleteCart*/

/* ============= Routing y metodos ============= */
// Solicitando info de todos los carritos
routerCarritos.get('/', getAllCarts)

 // Solicitando info de carrito segun id
routerCarritos.get('/:id', getCartByID) 

// Crear un nuevo carrito
routerCarritos.post('/', addCart)

// Agrega productos a un carrito
routerCarritos.post('/:id/productos', addProductToCart)

//Elimina un producto de un carrito
routerCarritos.delete('/:id/productos/:id_prod', delProductInCart)

/* //Elimina un  carrito
routerCarritos.delete('/:id', deleteCart)  */

/* =========== Exportacion de modulo =========== */
export default routerCarritos;