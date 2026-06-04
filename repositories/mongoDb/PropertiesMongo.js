const { CrudMongo } = require('../mongoDb/MongoCrud')
const Property = require('../../models/Property')

class PropertiesMongo extends CrudMongo {
    constructor() {
        super(Property)
    }

    async searchByFilters(filters, page = 1, pageSize = 15) {
        const query = {}

        if (filters.source)    query.source = filters.source
        if (filters.realState) query.realState = filters.realState
        if (filters.currency)  query.currency = filters.currency
        if (filters.operation) query.operation = filters.operation
        if (filters.city)      query.city = { $regex: filters.city, $options: 'i' }

        if (filters.dateFrom || filters.dateTo) {
            query.createdDate = {}
            if (filters.dateFrom) query.createdDate.$gte = new Date(filters.dateFrom)
            if (filters.dateTo)   query.createdDate.$lte = new Date(filters.dateTo)
        }

        if (filters.minPrice || filters.maxPrice) {
            query.price = {}
            if (filters.minPrice) query.price.$gte = Number(filters.minPrice)
            if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice)
        }

        const skip = (page - 1) * pageSize

        const [data, total] = await Promise.all([
            this.model.find(query).sort({ createdDate: -1 }).skip(skip).limit(pageSize),
            this.model.countDocuments(query)
        ])

        return {
            data,
            pagination: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize)
            }
        }
    }

    async getFilterOptions() {
        const [cities, realStates, sources, currencies, operations] = await Promise.all([
            this.model.distinct('city'),
            this.model.distinct('realState'),
            this.model.distinct('source'),
            this.model.distinct('currency'),
            this.model.distinct('operation')
        ])

        return {
            cities: cities.filter(Boolean).sort(),
            realStates: realStates.filter(Boolean).sort(),
            sources: sources.filter(Boolean),
            currencies: currencies.filter(Boolean),
            operations: operations.filter(Boolean)
        }
    }
}

const PropertiesMongoInstance = new PropertiesMongo()

module.exports = PropertiesMongoInstance
