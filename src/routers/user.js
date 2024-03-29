const { Router } = require('express');
const { getModel } = require('../database');
const jwt = require('jsonwebtoken');
const { encript, verifyToken, verifyAdmin } = require('../middlewares/middlewares');
const { getProfile } = require ('../routers/auth/auth') 
const { findCreateUser} = require('../config/db')
function createUserRouter(params) {
    const router = new Router();
    router.get('/users/', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('User').findAll();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('User').findOne({
                where: { id: req.params.id }
            });
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send(`User with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.post('/signup/', async (req, res) => {
        try {
            const User = getModel('User');
            const data = new User({
                username: req.body.username,
                lastname: req.body.lastname,
                email: req.body.email,
                address: req.body.address,
                phone: req.body.phone,
                password: encript(req.body.password),
                idProvider: null
            });
            const mail = await getModel('User').findOne({
                where: { email: req.body.email }
            });
            if (mail === null) {
                await data.save()
                res.status(201).json('Now you can log in.');
            } else {
                throw res.status(403).send('Use another email account');
            }
        } catch (error) {
            const msj = error.message
            console.log(msj);
            res.status(417).send('You need to complete all the information.' + msj);
        }
    });
    router.post('/login/', async (req, res) => {
        try {
            const { JWT_SECRET } = process.env;
            const mail = await getModel('User').findOne({
                where: {
                    email: req.body.email,
                    password: encript(req.body.password)
                }
            });
            if (mail !== null) {
                jwt.sign({ mail }, JWT_SECRET, (err, token) => { res.json({ token }) });
            } else {
                throw new Error('Wrong information');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });///To suspend clients
    router.put('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('User').findOne({
                where: { id: req.params.id }
            });
            const updated = await data.update(req.body);
            if (updated) {
                res.status(200).send('User updated/suspended');
            } else {
                res.status(404).send(`User with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/token/', async (req, res) => {
        try {
            const profile = getProfile();
            await findCreateUser(profile)
            const mail = await getModel('User').findOne({
                where: { idProvider: profile.id }
            });
            console.log(mail)
            const { JWT_SECRET } = process.env;
            if (mail !== null) {
                jwt.sign({ mail }, JWT_SECRET, (_err, token) => { res.json({ token }) });
            } else {
                throw new Error('Wrong information');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    })
    return router;
}

module.exports = {
    createUserRouter
}