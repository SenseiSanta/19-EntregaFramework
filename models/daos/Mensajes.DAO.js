import admin from 'firebase-admin';
import { createRequire } from "module";
import { ContenedorFirebase } from '../container/ContenedorFirebase.js';
const require = createRequire(import.meta.url);
const serviceAccount = require("../../DB/crt/desafioclase20-firebase-adminsdk-hhz23-0a02b3cd01.json")

//Conecta
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

export class MensajesDAOFirebase extends ContenedorFirebase {
    constructor(){
        super('mensajes')
    }
}