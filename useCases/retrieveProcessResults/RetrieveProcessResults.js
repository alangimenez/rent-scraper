const RegisterMongo = require('../../repositories/mongoDb/RegisterMongo')
const DateUtils = require('../../utils/DateUtils')

class RetrieveProcessResults {
    constructor() {}

    async retrieve(input) {
        const date = DateUtils.createDateInUtc(input)

        const year = date.year()
        const month = date.month() + 1
        const day = date.date()

        return RegisterMongo.getByDate(year, month, day)
    }
}

const retrieveProcessResultsInstance = new RetrieveProcessResults() 

module.exports = retrieveProcessResultsInstance