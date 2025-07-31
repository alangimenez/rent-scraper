const ScraperController = require('./controller/ScraperController')
const PropertyController = require('./controller/PropertyController')
const RegisterProcessController = require('./controller/RegisterProcessController')
const loggerProcessor = require('./useCases/loggerProcessor/LoggerProcessor')

const config = require('./config/Configs');
const express = require("express");

const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.use('/scraper', ScraperController)
app.use('/property', PropertyController)
app.use('/registerProcess', RegisterProcessController)

const port = config.PORT;

const server = app.listen(port, () => loggerProcessor.info(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;