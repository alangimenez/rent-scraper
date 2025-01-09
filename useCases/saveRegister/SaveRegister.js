const RegisterMongo = require('../../repositories/mongoDb/RegisterMongo')

class SaveRegister {
    constructor() {}

    async saveProcessResult(detail, quantitySavedProperties, status) {
        const register = {
            date: new Date(),
            type: detail.propertyType,
            realState: detail.realState.id,
            operation: detail.operation,
            quantityProperties: quantitySavedProperties.addedProperties,
            status: status
        }

        await RegisterMongo.uploadElement(register)

        return
    }
}

const saveRegisterInstance = new SaveRegister() 

module.exports = saveRegisterInstance