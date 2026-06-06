class HttpError extends Error {
    constructor(message, errorCode) {
        if (typeof message === 'string') {
            super(message);
        }else{
            super("");
            this.customMessage = message;
        }
        this.code = errorCode;
    }
}
module.exports = HttpError;