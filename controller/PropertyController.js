const express = require('express');
const router = express.Router();
const RetrieveProperties = require('../useCases/retrieveProperties/RetrieveProperties')
const BaseController = require('./BaseController')

router.get('/', async (req, res) => {
    try {
        const createdDate = BaseController.retrieveDate(req)

        const result = await RetrieveProperties.retrievePropertiesByCreatedDate(createdDate);
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

router.get('/filteredByPricePropertyType', async (req, res) => {
    try {
        const lowerPrice = BaseController.retrieveLowerPrice(req)
        const upperPrice = BaseController.retrieveUpperPrice(req)
        const propertyType = BaseController.retrievePropertyType(req)

        const result = await RetrieveProperties.retrieveByPrice(lowerPrice, upperPrice, propertyType);
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

module.exports = router