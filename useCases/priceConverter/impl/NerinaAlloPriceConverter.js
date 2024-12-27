const Currency = require('../../../enums/Currency')

class NerinaAlloPriceConverter {
    constructor() {}

    convert(currency, price) {
        let formattedPrice

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
}

const nerinaAlloPriceConverterInstance = new NerinaAlloPriceConverter() 

module.exports = nerinaAlloPriceConverterInstance