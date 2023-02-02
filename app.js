/*=================== MODULOS ===================*/
import koa from 'koa';
import { koaBody } from 'koa-body';
import exphbs from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import minimist from "minimist";
import os from 'os';
import cluster from 'cluster';
import multer from "multer";
import { MensajesDAOFirebase } from "./models/daos/Mensajes.DAO.js";
import { UsersDAOMongoDB } from './models/daos/Usuarios.DAO.js';
import { Server as IOServer } from "socket.io";
import { logger } from "./src/utils/logger.js";
import { config } from './src/config/config.js'

/*=== Instancia de Server, contenedor y rutas ===*/
const app = new koa();
import routerProducts from "./src/routes/productos.routes.js";
import routerCarritos from "./src/routes/carritos.routes.js";
import routerInitial from "./src/routes/initial.routes.js";
import routerUsuarios from './src/routes/usuarios.routes.js';
import routerMessages from './src/routes/mensajes.routes.js';
import routerProductosTest from "./src/routes/productosTest.routes.js";

/*================ Multer Setup ================*/
const storage = multer.diskStorage({
  destination: path.join('public/img/userImg'),
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
export const upload = multer({
  storage,
  dest: 'public/img/userImg'
})

/*================= Middlewears =================*/
app.use(koaBody());
/* app.use(multer({
  storage,
  dest: 'public/img/userImg'
}).single('image')) */

/*================ Session Setup ================*/
/* import { sessionMiddleware, wrap } from './src/controllers/server.controllers.js'
app.use(sessionMiddleware) */

/*============= Motor de plantillas =============*/
/* import views from 'koa-views';
const render = views(__dirname + '/views', {
  autoRender: false,
  extension: 'hbs',
  map: {
    html: 'handlebars'
  }
})
app.use(render)
app.use(async function (ctx) {
  ctx.state = {
    session: this.session,
    title: 'app'
  };
}); */

/*==================== Rutas ====================*/
app.use(routerInitial.routes());
app.use(routerProducts.routes());
app.use(routerCarritos.routes());
app.use(routerUsuarios.routes());
app.use(routerMessages.routes())
app.use(routerProductosTest.routes());
/* app.use("*", (req, res) => {
  const { method, url } = req
  logger.warn(`Ruta ${method} en ${url} no implementada`)
  res.send(`Ruta ${method} en ${url} no implementada`);
}); */

/*================== Servidor ==================*/
const minimistOptions = {default: {p: config.server.PORT, m: 'FORK'}}
const proceso = minimist(process.argv, minimistOptions)

//nodemon server.js -p 8081
//nodemon server.js -p 8081 -m CLUSTER
//forever start server.js -p 8082
//forever list
//tasklist
//pm2 start server.js --name="Server 1" --watch -- 8080
//pm2 start server.js --name="Server Cluster" --watch -i max -- 8081
//pm2 list
//forever stop 0
//pm2 delete all

export const PORT = process.argv[2] || proceso.p;
const SERVER_MODE = proceso.m;
const CPU_CORES = os.cpus().length;

if (cluster.isPrimary && SERVER_MODE == 'CLUSTER') {
  logger.info('Cantidad de cores: ', CPU_CORES)

  for (let i = 0; i < CPU_CORES; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    logger.info(`Worker ${process.pid}, ${worker.id} finaliza ${new Date().toLocaleDateString()}`);
    cluster.fork()
  })
} else {
  const server = app.listen(PORT, () => {
    logger.info(`Servidor escuchando en puerto ${PORT} -- proceso: ${process.pid}`);
  });
  server.on("error", (error) => logger.error(`${new Date().toLocaleDateString()}: Inconveniente en el servidor -> ${error}`));
}

/*============= Conexion Socket.io =============*/
import { ProductsDAOMongoDB } from "./models/daos/Productos.DAO.js";
const cajaProductos = new ProductsDAOMongoDB();

/* io.use(wrap(sessionMiddleware))

io.on("connection", async (socket) => {
  logger.info(`Nuevo cliente conectado -> ID: ${socket.id}`);
  const req = socket.request;
  if (req.session.passport) {
    const DB_MENSAJES = await listarMensajesNormalizados();
    const DB_PRODUCTOS = await cajaProductos.getAll();
    const userID = req.session.passport.user.id;
    const user = await cajaUsuario.getById(userID);
    const isAdmin = user.admin;
    io.sockets.emit("from-server-message", DB_MENSAJES);
    if (isAdmin) {
      io.sockets.emit("from-server-product-admin", DB_PRODUCTOS);
    } else {
      io.sockets.emit("from-server-product-noAdmin", DB_PRODUCTOS);
    }
  }
  

  socket.on("from-client-message", async (mensaje) => {
    await cajaMensajes.save(mensaje);
    const MENSAJES = await listarMensajesNormalizados();
    io.sockets.emit("from-server-message", MENSAJES);
  });

  socket.on("from-client-product", async (product) => {
    await cajaProductos.save(product);
    const PRODUCTOS = await cajaProductos.getAll();
    io.sockets.emit("from-server-product-admin", PRODUCTOS);
  });

  socket.on("from-client-product-question", async (user) => {
    const PRODUCTOS = await cajaProductos.getAll();
    const isAdmin = username.admin;
    if (isAdmin) {
      io.sockets.emit("from-server-product-admin", PRODUCTOS);
    } else {
      io.sockets.emit("from-server-product-noAdmin", PRODUCTOS);
    }
  })
});

/*=============== Normalizacion de datos ===============
import { normalize, schema, denormalize } from "normalizr";
import compression from "compression";

const schemaAuthors = new schema.Entity("author", {}, { idAttribute: "email" });
const schemaMensaje = new schema.Entity(
  "post",
  { author: schemaAuthors },
  { idAttribute: "id" }
);
const schemaMensajes = new schema.Entity(
  "posts",
  { mensajes: [schemaMensaje] },
  { idAttribute: "id" }
);

const normalizarMensajes = (mensajesConId) =>
  normalize(mensajesConId, schemaMensajes);

async function listarMensajesNormalizados() {
  const mensajes = await cajaMensajes.getAll();
  const normalizados = normalizarMensajes({ id: "mensajes", mensajes });
  return normalizados;
} */

export default app