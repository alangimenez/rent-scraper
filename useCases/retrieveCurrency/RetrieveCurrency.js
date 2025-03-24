const iCarlucciCurrencyRetriever = require('./impl/ICarlucciCurrencyRetriever')
const nerinaAlloCurrencyRetriever = require('./impl/NerinaAlloCurrencyRetriever')
const argencasasCurrencyRetriever = require('./impl/ArgencasasCurrencyRetriever')
const mercadoLibreCurrencyRetriever = require('./impl/MercadoLibreCurrencyRetriever')
const realState = require('../../enums/RealStates')

class RetrieveCurrency {
    constructor() { }

    retrieve(price, realStateName) {
        const retriever = this.#getRealStateCurrencyRetriever(realStateName)
        return retriever.retrieve(price)
    }

    #getRealStateCurrencyRetriever(realStateName) {
        let retriever

        switch (realStateName) {
            case realState.ICarlucci:
                retriever = iCarlucciCurrencyRetriever
                break
            case realState.NerinaAllo:
                retriever = nerinaAlloCurrencyRetriever
                break
            case realState.VeronicaEspinosa:
                retriever = nerinaAlloCurrencyRetriever
                break
            case realState.MarceloMilano:
                retriever = nerinaAlloCurrencyRetriever
                break
            case realState.Urrutia:
                retriever = nerinaAlloCurrencyRetriever
                break
            case realState.Oyhanarte:
                retriever = nerinaAlloCurrencyRetriever
                break
            case realState.DeAngelis:
                retriever = nerinaAlloCurrencyRetriever
                break
            case realState.SarroPucheta:
                retriever = nerinaAlloCurrencyRetriever
                break
            case realState.Properati:
                retriever = nerinaAlloCurrencyRetriever
                break
            case realState.ReMax:
                retriever = nerinaAlloCurrencyRetriever
                break
            case realState.Argenprop:
                retriever = nerinaAlloCurrencyRetriever
                break
            case realState.Argencasas:
                retriever = argencasasCurrencyRetriever
                break
            case realState.MercadoLibre:
                retriever = mercadoLibreCurrencyRetriever
                break
            case realState.Zonaprop:
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