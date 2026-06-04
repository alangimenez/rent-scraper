const mongoose = require('mongoose');
const config = require('../../config/Configs');
const loggerProcessor = require('../../useCases/loggerProcessor/LoggerProcessor');

(async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        loggerProcessor.info('database connected')
    } catch (e) {
        loggerProcessor.error('database not connected. Error: ' + e)
    }
})();

class CrudMongo {
    // constructor
    constructor(model) {
        this.model = model;
    }

    // metodos
    async getAll() {
        try {
            return await this.model.find({}, { __v: 0 });
        } catch (e) {
            loggerProcessor.error('cant getAll')
        }
    }

    async uploadElement(element) {
        try {
            return await this.model.create(element);
        } catch (e) {
            loggerProcessor.error(`Can't upload element: ${element.id}`)
            loggerProcessor.error(element)
        }
    }

    async deleteElement(element) {
        try {
            return await this.model.deleteOne({ bondName: bondName });
        } catch (e) {
            loggerProcessor.error('cant delete element')
        }
    }
}

module.exports = { CrudMongo }