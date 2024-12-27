const express = require('express');
const router = express.Router();
const DailyScraper = require('../useCases/dailyScraper/DailyScraper')
const BaseController = require('./BaseController')

router.post('/', async (req, res) => {
    try {
        const realState = BaseController.retrieveRealState(req)
        const propertyType = BaseController.retrievePropertyType(req)
        const operation = BaseController.retrieveOperation(req)

        await DailyScraper.handlePropertyProcess(realState, propertyType, operation);
    } catch (e) {
        res.status(500).json(e.message)
    }
    
    res.status(201).json()
})

module.exports = router