const express = require('express');
const router = express.Router();
const RetrieveProcessResults = require('../useCases/retrieveProcessResults/RetrieveProcessResults')
const BaseController = require('./BaseController')

router.get('/', async (req, res) => {
    try {
        const date = BaseController.retrieveDate(req)

        const result = await RetrieveProcessResults.retrieve(date);
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json(e.message)
    }
})

module.exports = router