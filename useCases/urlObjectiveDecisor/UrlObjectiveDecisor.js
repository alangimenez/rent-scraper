const RealStates = require('../../enums/RealStates')
const PropertyType = require('../../enums/PropertyType')
const Operations = require('../../enums/Operations')

class UrlObjectiveDecisor {
    constructor() {}

    getUrlObjective(realState, operation, propertyType) {
        const searchedCase = `${realState}-${propertyType}-${operation}`
        let urlObjective;

        switch (searchedCase) {
            case `${RealStates.ICarlucci}-${PropertyType.House}-${Operations.Sale}`:
                urlObjective = "https://icarlucci.com.ar/propiedades/casas/venta?"
                break
            case `${RealStates.ICarlucci}-${PropertyType.House}-${Operations.Rent}`:
                urlObjective = "https://icarlucci.com.ar/propiedades/casas/alquileres?"
                break
            case `${RealStates.ICarlucci}-${PropertyType.Field}-${Operations.Sale}`:
                urlObjective = "https://icarlucci.com.ar/propiedades/terrenos+o+lotes/venta?"
                break
            default: 
                throw new Error(`urlObjective not implemented for real state ${realState}, operation ${operation}, property type ${propertyType}`)
        }

        return urlObjective
    }
}

const urlObjectiveDecisor = new UrlObjectiveDecisor()

module.exports = urlObjectiveDecisor