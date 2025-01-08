const PriceConverter = require('../priceConverter/PriceConverter')
const currencyRetriever = require('../retrieveCurrency/RetrieveCurrency')
const Source = require('../../enums/Source')

class PropertyDecorator {
    constructor() {}

    decorate(properties, realState, operation, propertyType) {
        properties.forEach(e => {
            e.type = propertyType,
            e.operation = operation,
            e.source = realState.sourceType

            const currency = currencyRetriever.retrieve(e.price, realState)
            e.currency = currency

            const convertedPrice = PriceConverter.convert(realState, currency, e.price)
            e.price = convertedPrice
        });

        if (realState.sourceType == Source.RealState) {
            properties.forEach(e => {
                e.realState = realState.id
            })
        }

        return properties
    }
}

const propertyDecoratorInstance = new PropertyDecorator()

module.exports = propertyDecoratorInstance