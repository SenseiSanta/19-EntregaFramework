import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export const configMaria = {
    db: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'santiago',
            password: 'santiago',
            database: 'entrega11mensajes'
        }
    }
}

export const configSQLite = {
    db: {
        client: 'better-sqlite3',
        connection: {
            filename: path.join(__dirname, '../../DB/products.db3')
        },
        useNullAsDefault: true
    }
}

export const configMongoDB = {
    db: {
        cnxString: `mongodb://127.0.0.1:27017/preentrega`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    }
}

export const config = {
    server: {
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV
    }
}