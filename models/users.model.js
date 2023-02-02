import { Schema, model } from 'mongoose';

const UsuariosSchema = new Schema({
    username: {type: String, require:true, max:20},
    password: {type: String, require:true, max:30},
    phone: {type: Number, require:true},
    age: {type: Number, require:true},
    address: {type: String, require:true, max:30},
    email: {type: String, require:true, max:50},
    image: {type: String, require:true, max:40},
    admin: {type: Boolean, require:true}
});

const UsersModelMongoDB = model('usuarios', UsuariosSchema)

export default UsersModelMongoDB