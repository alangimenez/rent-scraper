class BaseController {
    constructor() {}

    retrieveRealState(req) {
        const realState = req.query.realState

        if(realState == undefined) {
            throw new Error("The param realState can't be empty")
        }

        return realState
    }

    retrieveDate(req) {
        const createdDate = req.query.createdDate

        if(createdDate == undefined) {
            throw new Error("The param createdDate can't be empty")
        }

        return createdDate
    }
}

const baseControllerInstance = new BaseController()

module.exports = baseControllerInstance