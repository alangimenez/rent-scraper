const express = require('express');
const router = express.Router();
const Configs = require('../config/Configs')
const DailyScraper = require('../useCases/dailyScraper/DailyScraper')
const BaseController = require('./BaseController')

router.post('/', async (req, res) => {
    try {
        const realState = BaseController.retrieveRealState(req)
        const propertyType = BaseController.retrievePropertyType(req)
        const operation = BaseController.retrieveOperation(req)

        await DailyScraper.handlePropertyProcess(realState, propertyType, operation);
    } catch (e) {
        let error = {
            message: e.message,
            type: e.name
        }

        if (Configs.DEBUG_MODE == "true") {
            error.stack = e.stack
        }

        res.status(500).json(error)
    }
    
    res.status(201).json()
})

module.exports = router