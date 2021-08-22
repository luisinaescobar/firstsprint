const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken, verifyAdmin, verifySuspend } = require('../middlewares/middlewares');
const jwt = require('jsonwebtoken');
function createOrderRouter(params) {
    const router = new Router();

    router.get('/orders/', verifyToken, verifyAdmin, async (req, res) => {
        try {
            const User = getModel('User');
            const Product = getModel('Product');
            const Payment = getModel('Payment');
            const Status = getModel('Status');
            const data = await getModel('Order').findAll({
                include: [User, Product, Payment, Status]
            });
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/orders/:id', verifyToken, verifyAdmin, async (req, res) => {
        try {

            const User = getModel('User');
            const Product = getModel('Product');
            const Payment = getModel('Payment');
            const Status = getModel('Status');
            const data = await getModel('Order').findOne({
                where: {
                    id: req.params.id
                },
                include: [User, Product, Payment, Status]
            });
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send(`Order with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.post('/orders/', verifyToken, verifySuspend, async (req, res) => {
        const { JWT_SECRET } = process.env;
        const Order = getModel('Order');
        const Product = getModel('Product');
        const Payment = getModel('Payment');
        const Status = getModel('Status');
        const User = getModel('User');
        const { address, description } = req.body;
        const pro1 = Number(req.body.ProductId);
        const sta = Number(req.body.StatusId);
        const pay = Number(req.body.PaymentId);
        try {
            jwt.verify(req.token, JWT_SECRET, async (error, authData) => {
                if (error) {
                    res.status(500).send({ message: error.message });
                } else {
                    const prod = await Product.findOne({ where: { id: pro1 } });
                    const est = await Status.findOne({ where: { id: sta } });
                    const pagar = await Payment.findOne({ where: { id: pay } });
                    const per = await User.findOne({ where: { id: authData.mail.id } });
                    const order = await Order.create({ address, description, ProductId: prod.id, StatusId: est.id, PaymentId: pagar.id, UserId: per.id });
                    res.status(500).send({ order: order, username: per.username, email: per.email, address: per.address });
                }
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.put('/orders/:id', async (req, res) => {
        try {
            const data = await getModel('Order').findOne({
                where: {
                    id: req.params.id
                }
            });
            const updated = await data.update(req.body);
            if (updated) {
                res.status(200).send('Order updated');
            } else {
                res.status(404).send(`Order with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.delete('/orders/:id', async (req, res) => {
        try {
            const data = await getModel('Order').findOne({
                where: {
                    id: req.params.id
                }
            });
            await data.destroy();
            if (data) {
                res.status(200).send('Order deleted');
            } else {
                res.status(404).send(`Order with ID ${req.params.id} does not exist.`);
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });///falta agregar la opcion de q el usuario pueda ver todos sus pedidos
    router.get('/history/', verifyToken, verifySuspend, async (req, res) => {
        try {
            const { JWT_SECRET } = process.env;
            jwt.verify(req.token, JWT_SECRET, async (error, authData) => {
                if (error) {
                    res.status(500).send({ message: error.message });
                } else {
                    const Product = getModel('Product');
                    const Payment = getModel('Payment');
                    const Status = getModel('Status');
                    const data = await getModel('Order').findAll({
                        where: { UserId: authData.mail.id },
                        include: [Product, Payment, Status]
                    });
                    res.status(200).send(data);
                    //res.status(200).send({description:data.description, ProductId: data.ProductId, address:data.address,confimed: data.confimed, PaymentId: data.PaymentId, StatusId: data.StatusId});
                }
            })
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    return router;
}

module.exports = {
    createOrderRouter
}