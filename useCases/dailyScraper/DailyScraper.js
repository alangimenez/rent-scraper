const ScrapingProperties = require('../scrapingProperties/ScrapingProperties')
const CompareProperties = require('../propertyComparator/CompareProperties')
const SaveProperties = require('../saveNewProperties/SaveNewProperties')
const PropertyDecorator = require('../propertyDecorator/PropertyDecorator')
const CasesForScraping = require('../../enums/CasesForScraping')
const SaveRegister = require('../saveRegister/SaveRegister')
const LoggerProcessor = require('../loggerProcessor/LoggerProcessor')

class DailyScraper {
    constructor() { }

    async handlePropertyProcess(realState, propertyType, operation) {
        const allProperties = await ScrapingProperties.scrapeProperties(realState, propertyType, operation)
        LoggerProcessor.debug(`Scraped ${allProperties.length} properties`)
        const newProperties = await CompareProperties.compare(allProperties, operation)
        LoggerProcessor.debug(`Found ${newProperties.length} new properties`)
        const decoratedProperties = PropertyDecorator.decorate(newProperties, realState, operation, propertyType)
        LoggerProcessor.debug(`Decorated ${decoratedProperties.length} properties`)
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
                LoggerProcessor.info(`\x1b[35mReal state: ${e.realState.id}, propertyType: ${e.propertyType}, operation: ${e.operation}, status OK, added: ${quantityAddedProperties.addedProperties}\x1b[0m`)
            } catch (err) {
                LoggerProcessor.error(err.message)
                await SaveRegister.saveProcessResult(e, { addedProperties: 0 }, "ERROR")
                LoggerProcessor.error(`Real state: ${e.realState.id}, propertyType: ${e.propertyType}, operation: ${e.operation}, status ERROR`)
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