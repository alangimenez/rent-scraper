const ScraperController = require('./controller/ScraperController')
const PropertyController = require('./controller/PropertyController')

const config = require('./config/Configs');
const express = require("express");

const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.use('/scraper', ScraperController)
app.use('/property', PropertyController)

const port = config.PORT;

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;