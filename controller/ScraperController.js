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

        const response = await DailyScraper.handlePropertyProcess(realState, propertyType, operation);
        res.status(201).json(response)
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
})

router.post('/all', async (req, res) => {
    try {
        await DailyScraper.launchPropertyProcess();
        res.status(201).json()
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
})

router.post('/check', async (req, res) => {
    try {
        const realState = BaseController.retrieveRealState(req)
        const propertyType = BaseController.retrievePropertyType(req)
        const operation = BaseController.retrieveOperation(req)

        const response = await DailyScraper.checkSpecificScraper(realState, propertyType, operation);
        res.status(200).json(response)
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
})

module.exports = router