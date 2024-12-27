const Currency = require('../../../enums/Currency')

class NerinaAlloCurrencyRetriever {
    constructor () {}

    retrieve(price) {
        let currency;

        if (price.includes("USD")) {
            currency = Currency.Usd
        } else {
            currency = Currency.Ars
        }

        return currency
    }
}

const nerinaAlloCurrencyRetriever = new NerinaAlloCurrencyRetriever()

module.exports = nerinaAlloCurrencyRetriever