/* ============= INICIO DE ROUTEO ============= */
import koaRouter from 'koa-router';
const routerProductosTest = new koaRouter({
    prefix: '/api/productos-test'
});
import { productoMock } from '../mocks/producto.mock.js'
import { logger } from '../utils/logger.js';

/* ============ Creacion de objeto ============ */
const caja = new productoMock();

/* ============= Routing y metodos ============= */
routerProductosTest.get('/', (req, res) => {
    let PRODUCTOS = caja.generarDatos()
    logger.info(PRODUCTOS)
    res.render('productos-test')
})

/* =========== Exportacion de modulo =========== */
export default routerProductosTest;