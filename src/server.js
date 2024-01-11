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
const path = require('path');
const app = express();

swaggerDocs(app, PORT)

const server = http.createServer(app);
app.use(cors({ origin: true, credentials: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({extended: true}))
connectDB()

app.use('/', router);

router.get("/", function (req, res, next) {
  res.sendFile('/views/show.html', {root: __dirname })
});

router.get("/create", function (req, res, next) {
  res.sendFile('/views/create.html', {root: __dirname })
});

server.listen(PORT, async () => {
    logger.start(`🚀 App running on port ${PORT}`);
});

