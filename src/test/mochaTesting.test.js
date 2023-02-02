import dotenv from 'dotenv';
dotenv.config();
import supertest from 'supertest';
import { expect } from 'chai';
import { generateProduct } from './generator/product.generator.js';
import httpServer from '../../server.js'

let request;
let server;
let id;

describe("+++++++++++ Testeo General de API Productos +++++++++++", () => {

    before( async () => {
        server = await startServer()
        request = supertest(`http://localhost:${process.env.PORT}/api/productos`)
        console.log(' --- COMINEZO DEL TEST --- ');
    }) 

    after( () => {
        console.log(' FIN DEL TEST ');
    }) 

    describe('Prueba GET en -> /api/productos', () => {
        it('Debería retornar un status 200', async () => {
            const response = await request.get('/')
            expect(response.status).to.eql(200)
        })
    })

    describe('Prueba POST en -> /api/productos/:id', () => {
        it('Debería retornar un "Objeto agregado" en status', async () => {
            let producto = generateProduct();
            const response = await request.post('/').send(producto);
            id = response._body.data.doc._id;
            expect(response._body.data.status).to.eql('Objeto agregado');
        })
    })

    describe('Prueba especifica de GET en -> /api/productos/:id', () => {
        it('Debería retornar un status 200', async () => {
            const response = await request.get(`/${id}`);
            expect(response.status).to.eql(200);
        })
    })

    describe('Prueba PUT en -> /api/productos/:id', () => {
        it('Debería retornar un "true" en state.update', async () => {
            let producto = generateProduct();
            const response = await request.put(`/${id}`).send(producto)
            expect(response._body.state.update).to.eql(true);
        })
    })

    describe('Prueba DELETE en -> /api/productos/:id', () => {
        it('Debería retornar un "true" en state.delete', async () => {
            const response = await request.delete(`/${id}`);
            expect(response._body.state.delete).to.eql(true);
        })
    })
})

async function startServer() {
    return new Promise((resolve, reject) => {
        const server = httpServer.listen(process.env.PORT, () => {
            console.log(`Servidor express escuchando en el puerto ${server.address().port}`);
            resolve(server)
        });
        server.on('error', error => {
            console.log(`Error en Servidor: ${error}`)
            reject(error)
        });
    })
}