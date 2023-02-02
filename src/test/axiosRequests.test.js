import axios from 'axios';
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';
dotenv.config();

let idNewProduct;

let newProduct = JSON.stringify({
    "product": "Monitor Samsung 24p",
    "description": "Monitor modelo X-32 con movimiento 2D",
    "code": "12345",
    "price": 610,
    "stock": 12,
    "img": "https://images.samsung.com/is/image/samsung/p6pim/ar/lf24t350fhlczb/gallery/ar-t35f-388813-lf24t350fhlczb-456992025?$650_519_PNG$"
  })

let upToDateProduct = JSON.stringify({
    "product": "Monitor Samsung 24p",
    "description": "Monitor modelo X-32 con movimiento 2D",
    "code": "12345",
    "price": 800,
    "stock": 5,
    "img": "https://images.samsung.com/is/image/samsung/p6pim/ar/lf24t350fhlczb/gallery/ar-t35f-388813-lf24t350fhlczb-456992025?$650_519_PNG$"
  })
    

//TODO - Ver todos los productos 
async function askForProducts() {
    return await axios({
        method: 'get',
        url: 'http://localhost:8080/api/productos/'
    })
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        console.log(error);
    });
}

//TODO - Ver producto especifico por ID
async function askForProductById() {
    return await axios({
        method: 'get',
        url: `http://localhost:8080/api/productos/${idNewProduct}`
    })
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        console.log(error);
    });
}

//TODO - Agregar nuevo producto
async function addNewProduct() {
    return await axios({
        method: 'post',
        url: 'http://localhost:8080/api/productos/',
        headers: { 
          'Content-Type': 'application/json'
        },
        data: newProduct
    })
    .then(function (response) {
        logger.info(`Se acaba de agregar un producto`)
        console.log(response.data.data.doc)
        return response
    })
    .catch(function (error) {
        console.log(error);
    });
}

//TODO - Actualizar producto segun ID
async function updateProduct() {
    return await axios({
        method: 'put',
        url: `http://localhost:8080/api/productos/${idNewProduct}`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data: upToDateProduct
    })
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        console.log(error);
    });
}

//TODO - Eliminar producto segun ID
async function delProduct() {
    return await axios({
        method: 'delete',
        url: `http://localhost:8080/api/productos/${idNewProduct}`,
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        console.log(error);
    });
}




function main() {
    askForProducts()
    .then((res) => {
        logger.info('De momento la base de datos se conforma por los siguientes productos:')
        res.data.forEach(element => {
            console.log(`- ${element.product}`)
        })
    })
    .then(async () => {
        let info = await addNewProduct()
        idNewProduct = info.data.data.doc._id
        let productById = await askForProductById()
        logger.info('El Producto solicitado por ID es el siguiente: ', productById.data)
        let actualProduct = await updateProduct()
        console.log('El objeto actualizado queda de la siguiente manera: ', actualProduct.data)
        let deletedProduct = await delProduct()
        console.log(deletedProduct.data)
    })
    .then(()=>{
        console.log('Fin')
    })
}

main()