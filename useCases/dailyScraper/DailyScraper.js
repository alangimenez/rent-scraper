const ScrapingProperties = require('../scrapingProperties/ScrapingProperties')
const CompareProperties = require('../propertyComparator/CompareProperties')
const SaveProperties = require('../saveNewProperties/SaveNewProperties')
const PropertyDecorator = require('../propertyDecorator/PropertyDecorator')
const CasesForScraping = require('../../enums/CasesForScraping')
const SaveRegister = require('../saveRegister/SaveRegister')

class DailyScraper {
    constructor() {}

    async handlePropertyProcess(realState, propertyType, operation) {
        const allProperties = await ScrapingProperties.scrapeProperties(realState, propertyType, operation)
        const newProperties = await CompareProperties.compare(allProperties, operation)
        const decoratedProperties = PropertyDecorator.decorate(newProperties, realState, operation, propertyType)
        await SaveProperties.saveProperties(decoratedProperties)
        return {
            addedProperties: decoratedProperties.length
        }
    }

    async launchPropertyProcess() {
        for (const e of CasesForScraping) {
            try {
                const quantityAddedProperties = await this.handlePropertyProcess(e.realState, e.propertyType, e.operation)
                await SaveRegister.saveProcessResult(e, quantityAddedProperties, "OK")
                console.log(`Real state: ${e.realState.id}, propertyType: ${e.propertyType}, operation: ${e.operation}, status OK, added: ${quantityAddedProperties.addedProperties}`)
            } catch (e) {
                console.log(e.message)
                await SaveRegister.saveProcessResult(e, quantityAddedProperties, "ERROR")
                console.log(`Real state: ${e.realState.id}, propertyType: ${e.propertyType}, operation: ${e.operation}, status ERROR`)
            }
        }

        return
    }

    async checkSpecificScraper(realState, propertyType, operation) {
        const allProperties = await ScrapingProperties.scrapeProperties(realState, propertyType, operation)
        return {
            total: allProperties.length,
            properties: allProperties
        }
    }
}

const dailyScraperInstance = new DailyScraper()

module.exports = dailyScraperInstance