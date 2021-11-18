const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken, verifyAdmin, verifySuspend } = require('../middlewares/middlewares');
const { cache, storeObjectInCache, invalidateCache } = require('../middlewares/cache');

function createProductRouter(params) {
    const router = new Router();

    router.get('/products/', /*verifyToken, verifySuspend,*/ cache, async (req, res) => {
        try {
            const data = await getModel('Product').findAll();
            storeObjectInCache(req, data);
            res.status(200).json(data);
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
                res.status(200).json(data);
            } else {
                res.status(404).send(`Product with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    );
    router.post('/products/', verifyToken, verifyAdmin, cache, async (req, res) => {
        try {
            const Product = getModel('Product');
            const data = new Product(req.body);
            const saved = await data.save();
            if (saved) {
                invalidateCache({
                    method: 'GET',
                    baseUrl: req.baseUrl,
                });
                res.status(201).json(saved);
            } else {
                res.status(500).send('Could not save the product.');
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.put('/products/:id', verifyToken, verifyAdmin, cache, async (req, res) => {
        try {
            const data = await getModel('Product').findOne({
                where: {
                    id: req.params.id
                }
            });
            const updated = await data.update(req.body);
            if (updated) {
                invalidateCache({
                    method: 'GET',
                    baseUrl: req.baseUrl,
                });
                res.status(200).send('Product updated');
            } else {
                res.status(404).send(`Product with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.delete('/products/:id', verifyToken, verifyAdmin, cache, async (req, res) => {
        try {
            const data = await getModel('Product').findOne({
                where: { id: req.params.id }
            });
            await data.destroy();
            if (data) {
                invalidateCache({
                    method: 'GET',
                    baseUrl: req.baseUrl,
                });
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
};