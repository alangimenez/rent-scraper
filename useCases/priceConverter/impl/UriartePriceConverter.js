const Currency = require('../../../enums/Currency')

class UriartePriceConverter {
    constructor() {}

    convert(currency, price) {
        let formattedPrice

        if (!this.#checkIfPriceExist(price)) {
            return 0
        }

        if (price.includes("|")) {
            price = this.#getUsdPrice(price)
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
        if (!price.includes("Consulte") || !price.includes("precio")) {
            return true
        }
    }

    #getUsdPrice(price) {
        const array = price.split("|")
        if (array[0].includes("USD")) {
            return array[0]
        } else {
            return array[1]
        }
    }
}

const uriartePriceConverterInstance = new UriartePriceConverter() 

module.exports = uriartePriceConverterInstance