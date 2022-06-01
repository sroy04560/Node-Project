class CustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const creteCustomError = (msg, statsCode) => {
    return new CustomError(msg, statsCode)
}

module.exports = { CustomError, creteCustomError }