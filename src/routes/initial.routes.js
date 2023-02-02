/* ============= INICIO DE ROUTEO ============= */
import koaRouter from 'koa-router';
const routerInitial = new koaRouter({
  prefix: '/'
});
import { fileURLToPath } from "url";
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================ Passport ================== */
import passport from 'passport';

routerInitial.use(passport.initialize());
routerInitial.use(passport.session());

/* ============= Middlewares ============= */
    /*----- Compresion -----*/
import compression from 'compression';

    /*---- Autenticacion ----*/
function auth (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.status(401).redirect('/login')
    }
};

/* ============= Routing y metodos ============= */
import { getMainInfo, loginPage, loginPageError,
   registerCredentials, registerPage, cartPage, logout,
   generateRandomProd, getServerInfo, getRandomThrows } from '../controllers/initial.controllers.js';

//Ruta principal -> Home
routerInitial.get('/', compression(), auth, getMainInfo);

//Ruta del render de LOGIN
routerInitial.get('/login', loginPage);

//Ruta del render del error en el LOGUEO
routerInitial.get('/login-error', loginPageError);

//Ruta del render de REGISTRO
routerInitial.get('/register', registerPage);

//Autenticacion de las credenciales del LOGUEO
routerInitial.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login-error'}));

//Autenticacion de las credenciales del REGISTRO
routerInitial.post('/register', registerCredentials);

//Ruta del render del CARRITO
routerInitial.get('/carrito', auth, cartPage)

//Ruta para finalizar la sesion -> LOGOUT
routerInitial.get('/logout', logout);

//Ruta para obtener productos random
routerInitial.get('/api/productos-test', auth, generateRandomProd)

//Ruta de visualizacion de las caracteristicas de servidor
routerInitial.get('/info', compression(), getServerInfo)

//Ruta para obtener productos random
routerInitial.get('/api/randoms', getRandomThrows)

//Ruta para ver datos
routerInitial.get('/datos', (req, res) => {
  res.status(200).send(`Servidor escuchando en puerto ${puerto}, proceso N ${process.pid}`)
})

/* =========== Exportacion de modulo =========== */
export default routerInitial;