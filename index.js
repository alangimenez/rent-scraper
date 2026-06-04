const ScraperController = require('./controller/ScraperController')
const PropertyController = require('./controller/PropertyController')
const RegisterProcessController = require('./controller/RegisterProcessController')
const loggerProcessor = require('./useCases/loggerProcessor/LoggerProcessor')

const config = require('./config/Configs');
const express = require("express");
const path = require("path");

const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/scraper', ScraperController)
app.use('/property', PropertyController)
app.use('/registerProcess', RegisterProcessController)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = config.PORT;

const server = app.listen(port, () => loggerProcessor.info(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;