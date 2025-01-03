const Currency = require('../../../enums/Currency')

class SarroPuchetaPriceConverter {
    constructor() { }

    convert(currency, price) {
        let formattedPrice

        if (!this.#checkIfPriceExist(price)) {
            return 0
        }
        
        price = this.#getPrice(price)

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

    #getPrice(price) {
        const array = price.split("\n")
        return array[1]
    }
}

const sarroPuchetaPriceConverterInstance = new SarroPuchetaPriceConverter()

module.exports = sarroPuchetaPriceConverterInstance