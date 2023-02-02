import { Schema, model } from 'mongoose';

const CartSchema = new Schema({
    products: {type: Array, required: true},
    owner: {type: String, required: true}
});

const CartsModelMongoDB = model('carritos', CartSchema)

export default CartsModelMongoDB