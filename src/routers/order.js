const { Router } = require('express');
const { getModel } = require('../database');
const { verifyToken, verifyAdmin, verifySuspend } = require('../middlewares/middlewares');
const jwt = require('jsonwebtoken');
const { getConnection } = require('../database/index');
//const sequelize = getConnection();
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
        const sequelize = getConnection();
        const { address, products } = req.body;
        const t = await sequelize.transaction();
        const userId = req.user.mail.id
        const pay = Number(req.body.PaymentId);
        const Order = getModel('Order');
        const Product = getModel('Product');
        const Payment = getModel('Payment');
        const Status = getModel('Status');
        const User = getModel('User');
        const productorder = getModel('Productorder');
        const est = await Status.findOne({ where: { id: 1 } });
        const pagar = await Payment.findOne({ where: { id: pay } });
        const per = await User.findOne({ where: { id: userId } });
        
        try {
            const prods = [];
            for (product of products) {
                const prod = await Product.findAll({ where: { id: product.id } }, { transaction: t });
                if (!prod) {
                    res.status(404).send(`Product with ID ${product.id} does not exist.`);
                } else { prods.push([prod, product.quantity]); }
            }
            const order = await Order.create({ StatusId: est.id, PaymentId: pagar.id, UserId: per.id, address }, { transaction: t });
            for (data of prods) {
                const [prod, quantity] = data;
                console.log(prod[0].dataValues)
                console.log(quantity)
                const total = prod[0].dataValues.price * quantity;
                await productorder.create({ ProductId: prod[0].dataValues.id, OrderId: order.id, quantity: quantity, total: total }, { transaction: t });
            }
            await t.commit();
            const r = await Order.findOne({
                where: {
                    id: order.id
                }, include: [Product]
            });
            res.json(r);
        } catch (error) {
            await t.rollback();
            //console.log(error);
            res.status(500).send({ message: error.message });
        }
    });
    router.put('/orders/:id', verifyToken, verifyAdmin, async (req, res) => {
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
    router.delete('/orders/:id', verifyToken, verifyAdmin, async (req, res) => {
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
    });
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