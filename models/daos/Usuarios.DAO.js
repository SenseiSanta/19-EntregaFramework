import { ContenedorMongoDB } from "../container/ContenedorMongoDB.js"
import UsersModelMongoDB from "../users.model.js"
import { logger } from '../../src/utils/logger.js';

export class UsersDAOMongoDB extends ContenedorMongoDB {
    constructor() {
        super(UsersModelMongoDB);
    }

    async getUserByUsername(user) {
        try {
            await this.conn.connect();
            const doc = await this.coleccion.find({username: user});
            if (doc == '') {
                return undefined;
            } else {
                return doc
            }
        }
        catch(error) {
            console.log(error);
        } finally {
            await this.conn.disconnect();
        }
    }
}