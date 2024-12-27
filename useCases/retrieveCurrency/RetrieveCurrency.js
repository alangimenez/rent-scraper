const iCarlucciCurrencyRetriever = require('./impl/ICarlucciCurrencyRetriever')
const nerinaAlloCurrencyRetriever = require('./impl/NerinaAlloCurrencyRetriever')
const realState = require('../../enums/RealStates')

class RetrieveCurrency {
    constructor() {}

    retrieve(price, realStateName) {
        const retriever = this.#getRealStateCurrencyRetriever(realStateName)
        return retriever.retrieve(price)
    }

    #getRealStateCurrencyRetriever(realStateName) {
        let retriever

        switch(realStateName) {
            case realState.ICarlucci:
                retriever = iCarlucciCurrencyRetriever
                break
            case realState.NerinaAllo:
                retriever = nerinaAlloCurrencyRetriever
                break
            default:
                throw new Error("Currency retriever case not implemented")
        }

        return retriever
    }
}

const currencyRetriever = new RetrieveCurrency() 

module.exports = currencyRetriever