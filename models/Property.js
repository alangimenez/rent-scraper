const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'property';

const propertySchema = new Schema ({
    title: {type: String},
    id: {type: String},
    createdDate: {type: Date, default: Date.now},
    price: {type: Number},
    type: {type: String},
    url: {type: String},
    pictureSrc: {type: String},
    realState: {type: String},
    operation: {type: String},
    currency: {type: String},
    address: {type: String}
})

const Property = mongoose.model(coleccion, propertySchema);

module.exports = Property;