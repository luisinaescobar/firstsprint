const { Router, application } = require('express');
const { getModel } = require('../database');
const { verifyToken, verifyAdmin, verifySuspend } = require('../middlewares/middlewares');
const { config } = require('dotenv');
const axios = require('axios');
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
    router.get('/payments/:id', verifyToken, verifyAdmin, async (req, res) => {
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
    router.post('/payments/', verifyToken, verifyAdmin, async (req, res) => {
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
    router.put('/payments/:id', verifyToken, verifyAdmin, async (req, res) => {
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
    router.delete('/payments/:id', verifyToken, verifyAdmin, async (req, res) => {
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


    //funciones de pago con paypal

    router.post('/paynow/', verifyToken, async (req, res) => {
        try {
            const order = req.body.OrderId
            const data = await getModel('Productorder').findOne({
                where: { OrderId: order }
            });
            console.log(data)
            const pedido = {
                "intent": "CAPTURE",
                "purchase_units": [
                    {
                        "reference_id": data.OrderId,
                        "amount": {
                            "currency_code": "USD",
                            "value": data.total
                        },
                        "description": data.OrderId
                    }
                ],
                "application_context": {
                    "brand_name": "Luisina",
                    "landing_page": "LOGIN",
                    "user_action": "PAY_NOW",
                    "return_url": "http://localhost:5000/v1/captureorder/",
                    "cancel_url": "http://localhost:5000/v1/history/"
                },
            }
            const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, pedido, {
                "auth": {
                    "username": process.env.PAYPAL_CLIENTID,
                    "password": process.env.PAYPAL_SECRET
                }
            });
            //console.log(response.data)
            res.status(200).send(response.data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
    router.get('/captureorder/', /*verifyToken,*/ async (req, res) => {
        try {
            const { token } = req.query
            const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
                "auth": {
                    "username": process.env.PAYPAL_CLIENTID,
                    "password": process.env.PAYPAL_SECRET
                }
            });

            //console.log(response.data)
           // console.log(response.data.purchase_units[0].reference_id)
            if (response.data.status === 'COMPLETED') {
                const status1 = await getModel('Order').findOne({
                    where: {id: response.data.purchase_units[0].reference_id}
                });
                const estado = status1.update({StatusId: 2})
                res.status(200).send('Success!');
                return estado
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    })
    return router;
}

module.exports = {
    createPaymentRouter
}