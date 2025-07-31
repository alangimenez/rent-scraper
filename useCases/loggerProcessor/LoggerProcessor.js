const logLevel = require('../../enums/LogLevel')
const configs = require('../../config/Configs')

class LoggerProcessor {
    constructor() {
        this.level = configs.LOG_LEVEL
    }

    debug(message) {
        if (this.level <= logLevel.Debug) {
            console.debug("[DEBUG] " + message)
        }
    }

    info(message) {
        if (this.level <= logLevel.Info) {
            console.info("[INFO] " + message)
        }
    }

    warning(message) {
        if (this.level <= logLevel.Warning) {
            console.warn("[WARNING] " + message)
        }
    }

    error(message) {
        if (this.level <= logLevel.Error) {
            console.error("[ERROR] " + message)
        }
    }
}

const loggerProcessorInstance = new LoggerProcessor()

module.exports = loggerProcessorInstance