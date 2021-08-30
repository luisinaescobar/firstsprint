const express = require('express');
const { createUserRouter } = require('./routers/user');
const { createProductRouter } = require('./routers/product');
const { createPaymentRouter } = require('./routers/payment');
const { createOrderRouter } = require('./routers/order');
const { createStatusRouter } = require('./routers/status');
const helmet = require('helmet');

function makeServer() {
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(helmet());
    server.use('/api/v1', createProductRouter());
    server.use('/api/v1', createUserRouter());
    server.use('/api/v1', createPaymentRouter());
    server.use('/api/v1', createOrderRouter());
    server.use('/api/v1', createStatusRouter());

    return server;
}
module.exports = {
    makeServer,
};