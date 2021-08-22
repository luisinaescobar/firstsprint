const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken, verifyAdmin, verifySuspend } = require('../middlewares/middlewares');
const jwt = require('jsonwebtoken');


function createProductRouter(params) {
    const router = new Router();

    router.get('/products/', verifyToken, verifySuspend, async (req, res) => {
        try {
            const data = await getModel('Product').findAll();
            res.status(200).send(data);
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/products/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('Product').findOne({
                where: { id: req.params.id }
            });
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send(`Product with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    );
    router.post('/products/', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const Product = getModel('Product');
            const data = new Product(req.body);
            const saved = await data.save();
            if (saved) {
                res.status(201).send(saved);
            } else {
                res.status(500).send('Could not save the product.');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.put('/products/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('Product').findOne({
                where: {
                    id: req.params.id
                }
            });
            const updated = await data.update(req.body);
            if (updated) {
                res.status(200).send('Product updated');
            } else {
                res.status(404).send(`Product with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.delete('/products/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const data = await getModel('Product').findOne({
                where: {
                    id: req.params.id
                }
            });
            await data.destroy();
            if (data) {
                res.status(200).send('Product deleted');
            } else {
                res.status(404).send(`Product with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    return router;
}

module.exports = {
    createProductRouter
}