const PropertiesMongo = require('../../repositories/mongoDb/PropertiesMongo')
const DateUtils = require('../../utils/DateUtils')

class RetrieveProperties {
    constructor() {}

    retrievePropertiesByCreatedDate(createdDate) {
        const actualDate = DateUtils.createDateInUtc(createdDate)

        const year = actualDate.year()
        const month = actualDate.month() + 1
        const day = actualDate.date()

        return PropertiesMongo.getByCreatedDate(year, month, day)
    }

    retrieveByPrice(lowerPrice, upperPrice, propertyType) {
        return PropertiesMongo.getByPriceAndPropertyType(lowerPrice, upperPrice, propertyType)
    }
}

const retrievePropertiesInstance = new RetrieveProperties()

module.exports = retrievePropertiesInstance