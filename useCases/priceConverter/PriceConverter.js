const ICarlucciPriceConverter = require('./impl/ICarlucciPriceConverter')
const nerinaAlloPriceConverter = require('./impl/NerinaAlloPriceConverter')
const realState = require('../../enums/RealStates')

class PriceConverter {
    constructor() {}

    convert(realStateName, currency, price) {
        const converter = this.#getRealStatePriceConverter(realStateName)
        return converter.convert(currency, price)
    }

    #getRealStatePriceConverter(realStateName) {
        let converter

        switch(realStateName) {
            case realState.ICarlucci:
                converter = ICarlucciPriceConverter
                break
            case realState.NerinaAllo:
                converter = nerinaAlloPriceConverter
                break
            case realState.VeronicaEspinosa:
                converter = nerinaAlloPriceConverter
                break
            default:
                throw new Error("Converter case not implemented")
        }

        return converter
    }
}

const priceConverterInstance = new PriceConverter() 

module.exports = priceConverterInstance