const ScrapingProperties = require('../scrapingProperties/ScrapingProperties')
const CompareProperties = require('../propertyComparator/CompareProperties')
const SaveProperties = require('../saveNewProperties/SaveNewProperties')

class DailyScraper {
    constructor() {}

    async handlePropertyProcess(realState) {
        const allProperties = await ScrapingProperties.scrapeProperties(realState)
        const newProperties = await CompareProperties.compare(allProperties)
        await SaveProperties.saveProperties(newProperties)
    }
}

const dailyScraperInstance = new DailyScraper()

module.exports = dailyScraperInstance