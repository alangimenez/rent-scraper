const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const coleccion = 'register';

const registerSchema = new Schema ({
    date: {type: Date, default: Date.now},
    type: {type: String},
    realState: {type: String},
    operation: {type: String},
    quantityProperties: {type: String},
    status: {type: String}
})

const Register = mongoose.model(coleccion, registerSchema);

module.exports = Register;