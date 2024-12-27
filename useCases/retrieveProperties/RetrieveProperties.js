const PropertiesMongo = require('../../repositories/mongoDb/PropertiesMongo')
const moment = require('moment-timezone');

class RetrieveProperties {
    constructor() {}

    retrievePropertiesByCreatedDate(createdDate) {
        const actualDate = this.#createDateInUtc(createdDate)

        const year = actualDate.year()
        const month = actualDate.month() + 1
        const day = actualDate.date()

        return PropertiesMongo.getByCreatedDate(year, month, day)
    }

    #createDateInUtc(date) {
        // Asegurarse que la cadena de entrada tenga el formato correcto
        const dateParts = date.split('-');
        if (dateParts.length !== 3) {
            return 'Invalid format date';
        }

        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Los meses en Moment.js empiezan desde 0
        const day = parseInt(dateParts[2]);

        // Crear un objeto Moment en UTC-0 (GMT) a partir de la fecha
        const utcDate = moment.utc({ year: year, month: month, date: day });

        return utcDate;
    }
}

const retrievePropertiesInstance = new RetrieveProperties()

module.exports = retrievePropertiesInstance