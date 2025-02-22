const Currency = require('../../../enums/Currency')

class ArgencasasCurrencyRetriever {
    constructor () {}

    retrieve(price) {
        let currency;

        if (price.includes("USD") || price.includes("u$s")) {
            currency = Currency.Usd
        } else {
            currency = Currency.Ars
        }

        return currency
    }
}

const argencasasCurrencyRetriever = new ArgencasasCurrencyRetriever()

module.exports = argencasasCurrencyRetriever