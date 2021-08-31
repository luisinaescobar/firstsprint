const express = require('express');
const { createUserRouter } = require('./routers/user');
const { createProductRouter } = require('./routers/product');
const { createPaymentRouter } = require('./routers/payment');
const { createOrderRouter } = require('./routers/order');
const { createStatusRouter } = require('./routers/status');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

function loadSwaggerinfo(server) {
    try {
        const doc = yaml.load(fs.readFileSync('./src/spec.yml', 'utf8'));
        server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
    } catch (e) {
        console.log(e);
    }
};
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
    loadSwaggerinfo(server);
    return server;
}
module.exports = {
    makeServer,
};