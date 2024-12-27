const PriceConverter = require('../priceConverter/PriceConverter')
const currencyRetriever = require('../retrieveCurrency/RetrieveCurrency')

class PropertyDecorator {
    constructor() {}

    decorate(properties, realState, operation, propertyType) {
        properties.forEach(e => {
            e.type = propertyType,
            e.realState = realState,
            e.operation = operation

            const currency = currencyRetriever.retrieve(e.price, realState)
            e.currency = currency

            const convertedPrice = PriceConverter.convert(realState, currency, e.price)
            e.price = convertedPrice
        });

        return properties
    }
}

const propertyDecoratorInstance = new PropertyDecorator()

module.exports = propertyDecoratorInstance