const PropertiesMongo = require('../../repositories/mongoDb/PropertiesMongo')

class SaveProperties {
    constructor() {}

    async saveProperties(properties) {
        const actualDate = new Date()

        await properties.map(async e => {
            const property = {
                ...e,
                createdDate: actualDate
            }
            await PropertiesMongo.uploadElement(property)
        })
    }
}

const SavePropertiesInstance = new SaveProperties()

module.exports = SavePropertiesInstance