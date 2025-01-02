const realState = require('../../enums/RealStates')
const ICarlucciScraper = require('./impl/ICarlucciScraper')
const NerinaAlloScraper = require('./impl/NerinaAlloScraper')
const DeAngelisScraper = require('./impl/DeAngelisScraper')
const UrlObjectiveDecisor = require('../urlObjectiveDecisor/UrlObjectiveDecisor')

class ScrapingProperties {
    constructor() {}

    async scrapeProperties(realStateName, propertyType, operation) {
        const scraper = this.#getRealStateScraper(realStateName)
        const urlObjectives = UrlObjectiveDecisor.getUrlObjective(realStateName, operation, propertyType)

        let propertyList = []
        
        for (const e of urlObjectives) {
            const properties = await scraper.scrape(e)
            propertyList = [...propertyList, ...properties]
        }

        return propertyList
    }

    #getRealStateScraper(realStateName) {
        let scraper;

        switch(realStateName) {
            case realState.ICarlucci:
                scraper = ICarlucciScraper
                break
            case realState.NerinaAllo:
                scraper = NerinaAlloScraper
                break
            case realState.VeronicaEspinosa:
                scraper = NerinaAlloScraper
                break
            case realState.MarceloMilano:
                scraper = NerinaAlloScraper
                break
            case realState.Urrutia:
                scraper = NerinaAlloScraper
                break
            case realState.Oyhanarte:
                scraper = NerinaAlloScraper
                break
            case realState.DeAngelis:
                scraper = DeAngelisScraper
                break
            default:
                throw new Error("Scraper case not implemented")
        }

        return scraper
    }
}

const ScrapingPropertiesInstance = new ScrapingProperties()

module.exports = ScrapingPropertiesInstance;