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
            case `${RealStates.NerinaAllo}-${PropertyType.House}-${Operations.Sale}`:
                urlObjective = "https://www.allopropiedades.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=&location_type=&ptypes=3&o=2,2&watermark=&"
                break
            case `${RealStates.NerinaAllo}-${PropertyType.Field}-${Operations.Sale}`:
                urlObjective = "https://www.allopropiedades.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=1&locations=&location_type=&ptypes=1&o=2,2&watermark=&"
                break
            case `${RealStates.NerinaAllo}-${PropertyType.House}-${Operations.Rent}`:
                urlObjective = "https://www.allopropiedades.com.ar/Buscar?q=&currency=ANY&min-price=&max-price=&min-roofed=&max-roofed=&min-surface=&max-surface=&min-total_surface=&max-total_surface=&min-front_measure=&max-front_measure=&min-depth_measure=&max-depth_measure=&age=&min-age=&max-age=&suites=&rooms=&tags=&operation=2&locations=&location_type=&ptypes=3&o=2,2&watermark=&"
                break
            default: 
                throw new Error(`urlObjective not implemented for real state ${realState}, operation ${operation}, property type ${propertyType}`)
        }

        return urlObjective
    }
}

const urlObjectiveDecisor = new UrlObjectiveDecisor()

module.exports = urlObjectiveDecisor