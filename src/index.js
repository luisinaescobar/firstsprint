const express = require('express');
const { config } = require('dotenv');
const { connect } = require('./database/index');
const { createProductRouter } = require('./routers/product');
const { createUserRouter } = require('./routers/user');
const { createPaymentRouter } = require('./routers/payment');
const { createOrderRouter } = require('./routers/order');
const { createStatusRouter } = require('./routers/status');
const { initialize } = require('./config/db');
const helmet = require('helmet');

async function main() {
    config();
    const PORT = process.env.PORT || 3000;
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(helmet());
    const {
        DB_USERNAME,
        DB_PASSWORD,
        DB_NAME,
        DB_PORT,
        DB_HOST
    } = process.env;
    const isDBok = await connect(DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME);
    initialize();
    if (isDBok) {
        server.use('/api/v1', createProductRouter());
        server.use('/api/v1', createUserRouter());
        server.use('/api/v1', createPaymentRouter());
        server.use('/api/v1', createOrderRouter());
        server.use('/api/v1', createStatusRouter());
        server.listen(PORT, () => {
            console.log('Server is running...');
        });
    } else {
        console.log('failed to load DB')
    }
}

main();