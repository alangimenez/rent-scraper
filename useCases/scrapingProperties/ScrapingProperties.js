const realState = require('../../enums/RealStates')
const ICarlucciScraper = require('./impl/ICarlucciScraper')
const NerinaAlloScraper = require('./impl/NerinaAlloScraper')
const DeAngelisScraper = require('./impl/DeAngelisScraper')
const UrrutiaScraper = require('./impl/UrrutiaScraper')
const sarroPucheta = require('./impl/SarroPuchetaScraper')
const properatiScraper = require('./impl/ProperatiScraper')
const reMaxScraper = require('./impl/RemaxScraper')
const argenpropScraper = require('./impl/ArgenPropScraper')
const argencasasScraper = require('./impl/ArgencasasScraper')
const mercadoLibreScraper = require('./impl/MercadoLibreScraper')
const zonapropScraper = require('./impl/ZonapropScraper')
const UrlObjectiveDecisor = require('../urlObjectiveDecisor/UrlObjectiveDecisor')

class ScrapingProperties {
    constructor() { }

    async scrapeProperties(realStateName, propertyType, operation) {
        console.log(`Inició scraping para ${realStateName.id}`)
        const scraper = this.#getRealStateScraper(realStateName)
        const urlObjectives = UrlObjectiveDecisor.getUrlObjective(realStateName.id, operation, propertyType)

        let propertyList = []

        for (const e of urlObjectives) {
            console.log(`Inició scraping para la ciudad ${e.id}, operacion ${operation}, tipo ${propertyType}`)
            const properties = await scraper.scrape(e)
            propertyList = [...propertyList, ...properties]
            console.log(`Finalizó scraping para la ciudad ${e.id}, operacion ${operation}, tipo ${propertyType}`)
        }

        console.log(`Finalizó scraping para ${realStateName.id}`)

        return propertyList
    }

    #getRealStateScraper(realStateName) {
        let scraper;

        switch (realStateName) {
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
                scraper = UrrutiaScraper
                break
            case realState.Oyhanarte:
                scraper = NerinaAlloScraper
                break
            case realState.DeAngelis:
                scraper = DeAngelisScraper
                break
            case realState.SarroPucheta:
                scraper = sarroPucheta
                break
            case realState.Properati:
                scraper = properatiScraper
                break
            case realState.ReMax:
                scraper = reMaxScraper
                break
            case realState.Argenprop:
                scraper = argenpropScraper
                break
            case realState.Argencasas:
                scraper = argencasasScraper
                break
            case realState.MercadoLibre:
                scraper = mercadoLibreScraper
                break
            case realState.Zonaprop:
                scraper = zonapropScraper
                break
            default:
                console.log(realStateName)
                throw new Error("Scraper case not implemented")
        }

        return scraper
    }
}

const ScrapingPropertiesInstance = new ScrapingProperties()

module.exports = ScrapingPropertiesInstance;