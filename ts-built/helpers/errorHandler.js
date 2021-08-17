"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (message, status, validErrors) {
    if (message === void 0) { message = "An unknown error occurred"; }
    if (status === void 0) { status = 500; }
    if (validErrors === void 0) { validErrors = []; }
    var error = new Error(message);
    error.statusCode = status;
    if (validErrors.length > 0) {
        var validMassages = validErrors.map(function (err) { return err.msg; });
        error.validErrors = validMassages;
    }
    return error;
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map