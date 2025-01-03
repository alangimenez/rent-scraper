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
    new ScrapingCase(RealStates.VeronicaEspinosa, Operations.Sale, PropertyType.House),
    new ScrapingCase(RealStates.VeronicaEspinosa, Operations.Sale, PropertyType.Field),
    new ScrapingCase(RealStates.VeronicaEspinosa, Operations.Rent, PropertyType.House),
    new ScrapingCase(RealStates.MarceloMilano, Operations.Sale, PropertyType.House),
    new ScrapingCase(RealStates.MarceloMilano, Operations.Sale, PropertyType.Field),
    new ScrapingCase(RealStates.MarceloMilano, Operations.Rent, PropertyType.House),
    new ScrapingCase(RealStates.Urrutia, Operations.Sale, PropertyType.House),
    new ScrapingCase(RealStates.Urrutia, Operations.Sale, PropertyType.Field),
    new ScrapingCase(RealStates.Urrutia, Operations.Rent, PropertyType.House),
    new ScrapingCase(RealStates.Oyhanarte, Operations.Sale, PropertyType.House),
    new ScrapingCase(RealStates.Oyhanarte, Operations.Sale, PropertyType.Field),
    new ScrapingCase(RealStates.Oyhanarte, Operations.Rent, PropertyType.House),
    new ScrapingCase(RealStates.DeAngelis, Operations.Sale, PropertyType.House),
    new ScrapingCase(RealStates.DeAngelis, Operations.Sale, PropertyType.Field),
    new ScrapingCase(RealStates.DeAngelis, Operations.Rent, PropertyType.House),
    new ScrapingCase(RealStates.SarroPucheta, Operations.Sale, PropertyType.House),
    new ScrapingCase(RealStates.SarroPucheta, Operations.Sale, PropertyType.Field),
    new ScrapingCase(RealStates.SarroPucheta, Operations.Rent, PropertyType.House),
]