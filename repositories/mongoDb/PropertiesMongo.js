const { CrudMongo } = require('../mongoDb/MongoCrud')
const Property = require('../../models/Property')

class PropertiesMongo extends CrudMongo {
    constructor() {
        super(Property)
    }

    async getByCreatedDate(year, month, day) {
        return await this.model.find({
            $expr: {
                $and: [
                    { $eq: [ { $year: "$createdDate" }, year ] },
                    { $eq: [ { $month: "$createdDate" }, month ] },
                    { $eq: [ { $dayOfMonth: "$createdDate" }, day ] }
                ]
            }
        })
    }
}

const PropertiesMongoInstance = new PropertiesMongo()

module.exports = PropertiesMongoInstance