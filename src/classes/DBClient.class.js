import CustomError from "./CustomError.class.js";

class DBClient {
    
    async connect () {
        throw new CustomError(500, "Falta implementar", "Method: Connect en Subclase")
    }

    async disconnect () {
        throw new CustomError(500, "Falta implementar", "Method: Disconnect en Subclase")
    }
}

export default DBClient;