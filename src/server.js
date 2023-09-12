require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const router = require('./routes');
const connectDB = require('./databases/config');
const { PORT } = require('./constants');
const swaggerDocs = require('./constants/swagger');
const { logger } = require('./constants/logger');
const app = express();

swaggerDocs(app, PORT)

const server = http.createServer(app);
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json())
connectDB()

app.use('/', router);

server.listen(PORT, async () => {
    logger.start(`🚀 App running on port ${PORT}`);
});

