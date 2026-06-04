const PropertiesMongo = require('../../repositories/mongoDb/PropertiesMongo')

class RetrieveProperties {
    constructor() {}

    searchProperties(filters, page, pageSize) {
        return PropertiesMongo.searchByFilters(filters, page, pageSize)
    }

    getFilterOptions() {
        return PropertiesMongo.getFilterOptions()
    }
}

const retrievePropertiesInstance = new RetrieveProperties()

module.exports = retrievePropertiesInstance
