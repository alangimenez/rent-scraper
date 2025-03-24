const Currency = require('../../../enums/Currency')

class ZonapropPriceConverter {
    constructor() {}

    convert(currency, price) {
        let formattedPrice

        if (!this.#checkIfPriceExist(price)) {
            return 0
        }

        if (currency == Currency.Usd) {
            formattedPrice = this.#convertFromUsd(price)
        } else {
            formattedPrice = this.#convertFromArs(price)
        }

        return formattedPrice
    }

    #convertFromUsd(price) {
        const firstStep = price.replace("USD", "")
        const secondStep = firstStep.replaceAll(" ", "")
        const formattedPrice = secondStep.replaceAll(".", "")
        return formattedPrice
    }

    #convertFromArs(price) {
        const firstStep = price.replace("$", "")
        const secondStep = firstStep.replaceAll(" ", "")
        const formattedPrice = secondStep.replaceAll(".", "")
        return formattedPrice
    }

    #checkIfPriceExist(price) {
        if (price.includes("Consultar")) {
            return false
        } else {
            return true
        }
            
    }
}

const zonaproprPriceConverterInstance = new ZonapropPriceConverter() 

module.exports = zonaproprPriceConverterInstance