const { getModel } = require("../database/index");
const { encript} =  require('../middlewares/middlewares')
async function initialize() {
    const User = getModel('User');
    const current = await User.findOne({
        username: 'admin'
    })
    if (!current) {
        User.create({
            username: 'admin',
            lastname: 'admin',
            email: 'admin@admin.com',
            address: 'admin',
            phone: 123,
            password: encript('admin'),
            admin: true,
            disabled: false
        })
    }
    const Product = getModel('Product');
    const current1 = await Product.findOne({
        name: 'Pasta'
    })
    if (!current1) {
        Product.create({
            name: 'Pasta',
            price: 1234
        })
    }
    const Payment = getModel('Payment');
    const current2 = await Payment.findOne({
        name: 'Cash'
    })
    if (!current2) {
        Payment.create({
            name: 'Cash',
        })
    }
    const Status = getModel('Status');
    const current3 = await Status.findOne({
        name: 'Created'
    })
    if (!current3) {
        Status.create({
            name: 'Created'
        })
    }
};
module.exports = {
    initialize
};