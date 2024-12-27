const ScrapingProperties = require('../scrapingProperties/ScrapingProperties')
const CompareProperties = require('../propertyComparator/CompareProperties')
const SaveProperties = require('../saveNewProperties/SaveNewProperties')
const PropertyDecorator = require('../propertyDecorator/PropertyDecorator')

class DailyScraper {
    constructor() {}

    async handlePropertyProcess(realState, propertyType, operation) {
        const allProperties = await ScrapingProperties.scrapeProperties(realState, propertyType, operation)
        const newProperties = await CompareProperties.compare(allProperties)
        const decoratedProperties = PropertyDecorator.decorate(newProperties, realState, operation, propertyType)
        await SaveProperties.saveProperties(decoratedProperties)
    }
}

const dailyScraperInstance = new DailyScraper()

module.exports = dailyScraperInstance