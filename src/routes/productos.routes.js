/* ============= INICIO DE ROUTEO ============= */
import koaRouter from 'koa-router';
const routerProducts = new koaRouter({
    prefix: '/api/productos'
});
import { getAllProducts, getProductByID, addProduct, updateProduct, deleteProduct } from '../controllers/productos.controllers.js';

/* ============= Routing y metodos ============= */
// Solicitando info de todos los productos
routerProducts.get('/', getAllProducts)

// Solicitando info de producto segun id
routerProducts.get('/:id', getProductByID) 

// Actualizacion de objeto en la DB
routerProducts.put('/:id', updateProduct)

// Insercion de objeto nuevo a la DB
routerProducts.post('/', addProduct)

// Borrado de objeto de la DB
routerProducts.delete('/:id', deleteProduct)

/* =========== Exportacion de modulo =========== */
export default routerProducts;