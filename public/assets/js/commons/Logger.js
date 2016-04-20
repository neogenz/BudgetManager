(function init(exports) {

    exports.logger = (function () {
        return {
            logExceptionWithThrow: _logExceptionWithThrow,
            logExceptionWithoutThrow: _logExceptionWithoutThrow,
            logError: _logError,
            logWarning: _logWarning,
            logInfo: _logInfo,
            logDebug: _logDebug
        };
    })();

    /**
     * @name _logExceptionWithThrow
     * Log an exception, may be with parameters. Rethrow exception after log.
     * @param {Error} exception Exception to log.
     * @param {Array<Object>} parameters Array of parameters. Optionally.
     */
    function _logExceptionWithThrow(exception, parameters) {
        console.error(exception);
        throw exception;
    }


    /**
     * @name _logExceptionWithoutThrow
     * Log an exception, may be with parameters. Don't rethrow the exception.
     * @param {Error} exception Exception to log.
     * @param {Array<Object>} parameters Array of parameters. Optionally.
     */
    function _logExceptionWithoutThrow(exception, parameters) {
        console.error(exception);
    }


    /**
     * @name _logError
     * Log an error on error chanel. Traced by file, method and name of
     * scope or function which the error was logged.
     * @param {string} file File name where the error is detect.
     * @param {string} method Function name where the error is detect.
     * @param {string} message Personnalised message.
     */
    function _logError(file, method, message) {
        console.error('ERROR - ' + file + ' - ' + method + ' - ' + message);
    }


    /**
     * @name _logWarning
     * Log an error on warning chanel. Traced by file, method and name of
     * scope or function which the error was logged.
     * @param {string} file File name where the error is detect.
     * @param {string} method Function name where the error is detect.
     * @param {string} message Personnalised message.
     */
    function _logWarning(file, method, message) {
        console.warn('WARN - ' + file + ' - ' + method + ' - ' + message);
    }


    /**
     * @name _logInfo
     * Log an message on info chanel. Traced by file, method and name of
     * scope or function which the message was logged.
     * @param {string} file File name where the message is detect.
     * @param {string} method Function name where the message is logged.
     * @param {string} message Personnalised message.
     */
    function _logInfo(file, method, message) {
        console.info('INFO - ' + file + ' - ' + method + ' - ' + message);
    }


    /**
     * @name _logDebug
     * Log an message on debug chanel. Traced by file, method and name of
     * scope or function which the message was logged.
     * @param {string} file File name where the message is detect.
     * @param {string} method Function name where the message is logged.
     * @param {string} message Personnalised message.
     */
    function _logDebug(file, method, message) {
        console.debug('DEBUG - ' + file + ' - ' + method + ' - ' + message);
    }
})(neogenz);
