const RealStates = require('./RealStates')
const Operations = require('./Operations')
const PropertyType = require('./PropertyType')
const ScrapingCase = require('../dto/ScrapingCase')

module.exports = [
    new ScrapingCase(RealStates.ICarlucci, Operations.Sale, PropertyType.House),
    new ScrapingCase(RealStates.ICarlucci, Operations.Sale, PropertyType.Field),
    new ScrapingCase(RealStates.ICarlucci, Operations.Rent, PropertyType.House),
    new ScrapingCase(RealStates.NerinaAllo, Operations.Sale, PropertyType.House),
    new ScrapingCase(RealStates.NerinaAllo, Operations.Sale, PropertyType.Field),
    new ScrapingCase(RealStates.NerinaAllo, Operations.Rent, PropertyType.House),
]