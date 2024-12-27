// config.js
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env') // process.env.npm_lifecycle_event or process.env.NODE_ENV
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGODB_URI: process.env.MONGODB_URI || '127.0.0.1',
    PORT: process.env.PORT || 3001
}