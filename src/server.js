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
//const cors = require('cors');
const { makeRouter: makeUsersRouter } = require('../test/usersTest');
const passport = require('passport');
const session = require('express-session')

const { router } = require('./routers/auth/auth');
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
    //server.use(session({ secret:'pass' }));
    server.use(session({
        secret: 'pass',
        resave: true,
        saveUninitialized: true
    }));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(helmet());
    server.use('/api', createProductRouter());
    server.use('/api', createUserRouter());
    server.use('/api', createPaymentRouter());
    server.use('/api', createOrderRouter());
    server.use('/api', createStatusRouter());
    server.use('/api/userstest', makeUsersRouter());
    server.use('/api', router );
    loadSwaggerinfo(server);
    return server;
}
module.exports = {
    makeServer,
};