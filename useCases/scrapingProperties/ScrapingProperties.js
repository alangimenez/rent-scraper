const realState = require('../../enums/RealStates')
const operation = require('../../enums/Operations')
const propertyType = require('../../enums/PropertyType')
const ICarlucciScraper = require('./impl/ICarlucciScraper')

class ScrapingProperties {
    constructor() {}

    async scrapeProperties(realStateName) {
        const scraper = this.#getRealStateScraper(realStateName)
        const properties = await scraper.scrape()

        return properties
    }

    #getRealStateScraper(realStateName) {
        let scraper;

        switch(realStateName) {
            case realState.ICarlucci:
                scraper = ICarlucciScraper
                break
            default:
                throw new Error("Scraper case not implemented")
        }

        return scraper
    }
}

const ScrapingPropertiesInstance = new ScrapingProperties()

module.exports = ScrapingPropertiesInstance;