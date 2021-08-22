const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken, verifyAdmin } = require('../middlewares/middlewares');

function createStatusRouter(params) {
    const router = new Router();

    router.get('/status/', verifyToken, verifyAdmin,async (req, res) => {
        try {
            const data = await getModel('Status').findAll();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.post('/status/', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const Status = getModel('Status');
            const data = new Status (req.body);
            const saved = await data.save()
            if (saved) {
                res.status(201).send(saved);
            } else {
                res.status(500).send('Could not save the status.');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    
    return router;
}

module.exports = {
    createStatusRouter
}