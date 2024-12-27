const ICarlucciPriceConverter = require('./impl/ICarlucciPriceConverter')
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
            default:
                throw new Error("Converter case not implemented")
        }

        return converter
    }
}

const priceConverterInstance = new PriceConverter() 

module.exports = priceConverterInstance