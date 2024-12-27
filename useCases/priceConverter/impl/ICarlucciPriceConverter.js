const Currency = require('../../../enums/Currency')

class ICarlucciPriceConverter {
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
        const secondStep = firstStep.replace(" ", "")
        const formattedPrice = secondStep.replace(".", "")
        return formattedPrice
    }

    #convertFromArs(price) {
        const firstStep = price.replace("$", "")
        const secondStep = firstStep.replace(" ", "")
        const formattedPrice = secondStep.replace(".", "")
        return formattedPrice
    }
}

const iCarlucciPriceConverterInstance = new ICarlucciPriceConverter() 

module.exports = iCarlucciPriceConverterInstance