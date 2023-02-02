class CustomError {
    constructor(status, description, message) {
        this.status = status;
        this.description = description;
        this.message = message;
    }
}

export default CustomError;