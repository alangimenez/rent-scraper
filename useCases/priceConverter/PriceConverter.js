const ICarlucciPriceConverter = require('./impl/ICarlucciPriceConverter')
const nerinaAlloPriceConverter = require('./impl/NerinaAlloPriceConverter')
const uriartePriceConverter = require('./impl/UriartePriceConverter')
const sarroPuchetaPriceConverter = require('./impl/SarroPuchetaPriceConverter')
const properatiPriceConverter = require('./impl/ProperatiPriceConverter')
const remaxPriceConverter = require('./impl/RemaxPriceConverter')
const argencasasPriceConverter = require('./impl/ArgencasasPriceConverter')
const realState = require('../../enums/RealStates')

class PriceConverter {
    constructor() { }

    convert(realStateName, currency, price) {
        const converter = this.#getRealStatePriceConverter(realStateName)
        return converter.convert(currency, price)
    }

    #getRealStatePriceConverter(realStateName) {
        let converter

        switch (realStateName) {
            case realState.ICarlucci:
                converter = ICarlucciPriceConverter
                break
            case realState.NerinaAllo:
                converter = nerinaAlloPriceConverter
                break
            case realState.VeronicaEspinosa:
                converter = nerinaAlloPriceConverter
                break
            case realState.MarceloMilano:
                converter = nerinaAlloPriceConverter
                break
            case realState.Urrutia:
                converter = uriartePriceConverter
                break
            case realState.Oyhanarte:
                converter = nerinaAlloPriceConverter
                break
            case realState.DeAngelis:
                converter = nerinaAlloPriceConverter
                break
            case realState.SarroPucheta:
                converter = sarroPuchetaPriceConverter
                break
            case realState.Properati:
                converter = properatiPriceConverter
                break
            case realState.ReMax:
                converter = remaxPriceConverter
                break
            case realState.Argenprop:
                converter = properatiPriceConverter
                break
            case realState.Argencasas:
                converter = argencasasPriceConverter
                break
            default:
                throw new Error("Converter case not implemented")
        }

        return converter
    }
}

const priceConverterInstance = new PriceConverter()

module.exports = priceConverterInstance