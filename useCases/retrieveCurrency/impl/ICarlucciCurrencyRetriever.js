const Currency = require('../../../enums/Currency')

class ICarlucciCurrencyRetriever {
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

const iCarlucciCurrencyRetriever = new ICarlucciCurrencyRetriever()

module.exports = iCarlucciCurrencyRetriever