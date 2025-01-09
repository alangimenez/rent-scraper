const { CrudMongo } = require('../mongoDb/MongoCrud')
const Register = require('../../models/Register')

class RegisterMongo extends CrudMongo {
    constructor() {
        super(Register)
    }

    async getByDate(year, month, day) {
        return await this.model.find({
            $expr: {
                $and: [
                    { $eq: [ { $year: "$date" }, year ] },
                    { $eq: [ { $month: "$date" }, month ] },
                    { $eq: [ { $dayOfMonth: "$date" }, day ] }
                ]
            }
        })
    }
}

const PropertiesMongoInstance = new RegisterMongo()

module.exports = PropertiesMongoInstance