const Currency = require('../../../enums/Currency')

class MercadoLibrePriceConverter {
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

        const intPrice = this.#convertToNumber(formattedPrice)

        return intPrice
    }

    #convertFromUsd(price) {
        const firstStep = price.replace("US$", "")
        const secondStep = firstStep.replaceAll(" ", "")
        const thirdStep = secondStep.replaceAll("USD", "")
        const formattedPrice = thirdStep.replaceAll(".", "")
        return formattedPrice
    }

    #convertFromArs(price) {
        const firstStep = price.replace("$", "")
        const secondStep = firstStep.replaceAll(" ", "")
        const formattedPrice = secondStep.replaceAll(".", "")
        return formattedPrice
    }

    #checkIfPriceExist(price) {
        if (!price.includes("Consultar") || !price.includes("precio")) {
            return true
        }
    }

    #convertToNumber(price) {
        const parsed = parseInt(price, 10); // Intentar convertir a entero en base 10
        return isNaN(parsed) ? 0 : parsed; // Si no es un número válido, devuelve 0
    }
}

const mercadoLibrePriceConverterInstance = new MercadoLibrePriceConverter() 

module.exports = mercadoLibrePriceConverterInstance