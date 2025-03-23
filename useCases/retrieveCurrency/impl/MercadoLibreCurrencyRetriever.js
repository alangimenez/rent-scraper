const Currency = require('../../../enums/Currency')

class MercadoLibreCurrencyRetriever {
    constructor () {}

    retrieve(price) {
        let currency;

        if (price.includes("USD") || price.includes("US$")) {
            currency = Currency.Usd
        } else {
            currency = Currency.Ars
        }

        return currency
    }
}

const mercadoLibreCurrencyRetriever = new MercadoLibreCurrencyRetriever()

module.exports = mercadoLibreCurrencyRetriever