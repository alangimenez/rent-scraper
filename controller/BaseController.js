const RealStates = require('../enums/RealStates')
const Operations = require('../enums/Operations')
const PropertyType = require('../enums/PropertyType')

class BaseController {
    constructor() {}

    retrieveRealState(req) {
        const realState = req.query.realState

        if(!(realState in RealStates)) {
            throw new Error("The param realState is invalid")
        }

        return RealStates[realState]
    }

    retrieveOperation(req) {
        const operation = req.query.operation

        if(!(operation in Operations)) {
            throw new Error("The param operation is invalid")
        }

        return operation
    }

    retrievePropertyType(req) {
        const propertyType = req.query.propertyType

        if(!(propertyType in PropertyType)) {
            throw new Error("The param propertyType is invalid")
        }

        return propertyType
    }

    retrieveDate(req) {
        const createdDate = req.query.createdDate

        if(createdDate == undefined) {
            throw new Error("The param createdDate can't be empty")
        }

        return createdDate
    }

    retrieveDate(req) {
        const date = req.query.date

        if(date == undefined) {
            throw new Error("The param date can't be empty")
        }

        return date
    }

    retrieveLowerPrice(req) {
        const lowerPrice = req.query.lowerPrice

        if(isNaN(lowerPrice)) {
            throw new Error("The param lowerPrice is not a number")
        }

        return lowerPrice
    }

    retrieveUpperPrice(req) {
        const upperPrice = req.query.upperPrice

        if(isNaN(upperPrice)) {
            throw new Error("The param upperPrice is not a number")
        }

        return upperPrice
    }
}

const baseControllerInstance = new BaseController()

module.exports = baseControllerInstance