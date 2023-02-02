import { config, configMongoDB } from "../config/config.js";
import CustomError from "./CustomError.class.js";
import mongoose from "mongoose";
import { logger } from "../utils/logger.js";
import DBClient from "./DBClient.class.js";

let instance = null;

class MongoDBClient extends DBClient {
    constructor() {
        super();
        this.connected = false;
        this.client = mongoose;
        this.firstConnection = (new Date()).toLocaleDateString();
    }

    async connect() {
        try {
            await this.client.connect(configMongoDB.db.cnxString, configMongoDB.db.options);
            this.connected = true;
        } catch (error) {
            throw new CustomError(500, "Error al conectarse a MongoDB", error)
        }
    }

    async printInstance() {
        logger.info(`Actualmente se encuentra ${this.connected}. Su creacion fue realizada el ${this.firstConnection}`);
    }

    async disconnect () {
        try {
            await this.client.connection.close();
            this.connected = false;
        } catch (error) {
            throw new CustomError(500, "Error al desconectarse de MongoDB", error)
        }
    }

    static getInstance () {
        if (!instance) {
            instance = new MongoDBClient();
        } 
        return instance;
    }
}

export default MongoDBClient;