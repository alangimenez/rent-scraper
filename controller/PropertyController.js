const express = require('express')
const router = express.Router()
const RetrieveProperties = require('../useCases/retrieveProperties/RetrieveProperties')

const VALID_PAGE_SIZES = [15, 30, 50]

router.get('/filterOptions', async (req, res) => {
    try {
        const result = await RetrieveProperties.getFilterOptions()
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

router.get('/search', async (req, res) => {
    try {
        const { source, realState, operation, dateFrom, dateTo, city, currency, minPrice, maxPrice } = req.query

        const page = Math.max(1, parseInt(req.query.page) || 1)
        const requestedSize = parseInt(req.query.pageSize) || 15
        const pageSize = VALID_PAGE_SIZES.includes(requestedSize) ? requestedSize : 15

        const filters = {}
        if (source)    filters.source = source
        if (realState) filters.realState = realState
        if (operation) filters.operation = operation
        if (dateFrom)  filters.dateFrom = dateFrom
        if (dateTo)    filters.dateTo = dateTo
        if (city)      filters.city = city
        if (currency)  filters.currency = currency
        if (minPrice)  filters.minPrice = minPrice
        if (maxPrice)  filters.maxPrice = maxPrice

        const result = await RetrieveProperties.searchProperties(filters, page, pageSize)
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

module.exports = router
