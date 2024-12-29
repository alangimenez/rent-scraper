const PropertiesMongo = require('../../repositories/mongoDb/PropertiesMongo')

class CompareProperties {
    constructor() { }

    async compare(allProperties) {
        const savedProperties = await PropertiesMongo.getAll()

        return this.#mergeUniqueLists(savedProperties, allProperties)
    }

    #mergeUniqueLists(listOne, listTwo) {
        // Crear un conjunto para rastrear combinaciones únicas de operacion e id
        const seen = new Set();
        let listWithoutDuplicates = []

        listOne.forEach(e => {
            const detailedId = `${e.id}-${e.operation}`
            seen.add(detailedId)
        });

        listTwo.forEach(e => {
            const detailedId = `${e.id}-${e.operation}`
            if (!seen.has(detailedId)) {
                seen.add(detailedId)
                listWithoutDuplicates = [...listWithoutDuplicates, e]
            } 
        });

        return listWithoutDuplicates
    }
}

const ComparePropertiesInstance = new CompareProperties()

module.exports = ComparePropertiesInstance