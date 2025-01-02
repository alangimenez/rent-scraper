const mongoose = require('mongoose');
const config = require('../../config/Configs');

(async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('database connected')
    } catch (e) {
        console.log('database not connected. Error: ' + e)
    }
})();

class CrudMongo {
    // constructor
    constructor(model) {
        this.model = model;
    }

    // metodos
    async getAll() {
        try {
            return await this.model.find({}, { __v: 0 });
        } catch (e) {
            console.log('cant getAll')
        }
    }

    async uploadElement(element) {
        try {
            return await this.model.create(element);
        } catch (e) {
            console.log(`Can't upload element: ${element.id}`)
            console.log(element)
        }
    }

    async deleteElement(element) {
        try {
            return await this.model.deleteOne({ bondName: bondName });
        } catch (e) {
            console.log('cant delete element')
        }
    }
}

module.exports = { CrudMongo }