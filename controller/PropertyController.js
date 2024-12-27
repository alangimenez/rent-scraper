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

module.exports = router