const PropertiesMongo = require('../../repositories/mongoDb/PropertiesMongo')

class CompareProperties {
    constructor() {}

    async compare(allProperties) {
        const savedProperties = await PropertiesMongo.getAll()

        const savedPropertiesSet = new Set(savedProperties.map(obj => obj.id))

        return allProperties.filter(obj => !savedPropertiesSet.has(obj.id))
    }
}

const ComparePropertiesInstance = new CompareProperties()

module.exports = ComparePropertiesInstance