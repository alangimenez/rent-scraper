const realState = require('../../enums/RealStates')
const ICarlucciScraper = require('./impl/ICarlucciScraper')
const UrlObjectiveDecisor = require('../urlObjectiveDecisor/UrlObjectiveDecisor')

class ScrapingProperties {
    constructor() {}

    async scrapeProperties(realStateName, propertyType, operation) {
        const scraper = this.#getRealStateScraper(realStateName)
        const urlObjective = UrlObjectiveDecisor.getUrlObjective(realStateName, operation, propertyType)
        const properties = await scraper.scrape(urlObjective)

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