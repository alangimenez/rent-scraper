const { CrudMongo } = require('../mongoDb/MongoCrud')
const Register = require('../../models/Register')

class RegisterMongo extends CrudMongo {
    constructor() {
        super(Register)
    }
}

const PropertiesMongoInstance = new RegisterMongo()

module.exports = PropertiesMongoInstance