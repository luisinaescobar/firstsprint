const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken, verifyAdmin, verifySuspend } = require('../middlewares/middlewares');

function createPaymentRouter(params) {
    const router = new Router();

    router.get('/payments/', verifyToken, verifySuspend, async (req, res) => {
        try {
            const data = await getModel('Payment').findAll();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/payments/:id',verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('Payment').findOne({
                where: {
                    id: req.params.id
                }
            });
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send(`Payment with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.post('/payments/',verifyToken, verifyAdmin, async (req, res) => {
        try {
            const Payment = getModel('Payment');
            const data = new Payment(req.body);
            const saved = await data.save()
            if (saved) {
                res.status(201).send(saved);
            } else {
                res.status(500).send('Could not save the payment.');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.put('/payments/:id',verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('Payment').findOne({
                where: {
                    id: req.params.id
                }
            });
            const updated = await data.update(req.body);
            if (updated) {
                res.status(200).send('Payment updated');
            } else {
                res.status(404).send(`Payment with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.delete('/payments/:id',verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('Payment').findOne({
                where: {
                    id: req.params.id
                }
            });
            await data.destroy();
            if (data) {
                res.status(200).send('Payment deleted');
            } else {
                res.status(404).send(`Payment with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    return router;
}

module.exports = {
    createPaymentRouter
}