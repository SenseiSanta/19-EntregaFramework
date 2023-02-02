import { Schema, model } from 'mongoose';

const ProductsSchema = new Schema({
    product: {type: String, require:true, max:20},
    description: {type: String, require:true, max:80},
    code: {type: String, require:true, max:10},
    price: {type: Number, require:true},
    stock: {type: Number, require:true},
    img: {type: String, require:true},
});

const ProductsModelMongoDB = model('productos', ProductsSchema)

export default ProductsModelMongoDB