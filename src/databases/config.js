const mongoose = require('mongoose');
const { MONGODB_URL } = require('../constants');
const { logger } = require('../constants/logger');

module.exports = async function connectDB() {
    mongoose.connect(MONGODB_URL)
        .then(() => logger.success('🚀 Connect database successfully!'))
        .catch((error) => {
            logger.error('🚀 Connect database failed');
            logger.error(error);
        })
    return mongoose.connection
};