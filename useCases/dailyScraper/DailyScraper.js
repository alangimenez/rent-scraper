const ScrapingProperties = require('../scrapingProperties/ScrapingProperties')
const CompareProperties = require('../propertyComparator/CompareProperties')
const SaveProperties = require('../saveNewProperties/SaveNewProperties')
const PropertyDecorator = require('../propertyDecorator/PropertyDecorator')
const CasesForScraping = require('../../enums/CasesForScraping')

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
                console.log(`Real state: ${e.realState.id}, propertyType: ${e.propertyType}, operation: ${e.operation}, status OK, added: ${quantityAddedProperties.addedProperties}`)
            } catch (e) {
                console.log(e.message)
                console.log(`Real state: ${e.realState.id}, propertyType: ${e.propertyType}, operation: ${e.operation}, status ERROR`)
            }
        }


        /* CasesForScraping.forEach(async e => {
            try {
                const quantityAddedProperties = await this.handlePropertyProcess(e.realState, e.propertyType, e.operation)
                console.log(`Real state: ${e.realState}, propertyType: ${e.propertyType}, operation: ${e.operation}, status OK, added: ${quantityAddedProperties.addedProperties}`)
            } catch (e) {
                console.log(`Real state: ${e.realState}, propertyType: ${e.propertyType}, operation: ${e.operation}, status ERROR`)
            }
        }) */
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