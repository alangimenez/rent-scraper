const moment = require('moment-timezone');

class DateUtils {
    constructor() { }

    createDateInUtc(date) {
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

const dateUtilsInstance = new DateUtils()

module.exports = dateUtilsInstance