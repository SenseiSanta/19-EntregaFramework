import { faker } from '@faker-js/faker/locale/es'
faker.locale = 'es'

function generateProduct() {
    return {
        product: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.random.numeric(5),
        price: parseInt(faker.commerce.price()),
        stock: parseInt(faker.random.numeric(2)),
        img: faker.image.abstract()
    }
}

export {
    generateProduct
}
