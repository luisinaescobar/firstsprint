const { createHmac } = require('crypto');
const jwt =  require('jsonwebtoken');
// Athorization: Bearer <token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearertoken = bearerHeader.split(" ")[1];
        req.token = bearertoken;
        next();
    } else{
        res.send('You need to add your token to the header with the word Bearer');
    }
    
};
function encript(secret) {
    return createHmac('sha256', secret).digest('hex');
};

function verifyAdmin(req, res, next) {
    const { JWT_SECRET } = process.env
    jwt.verify(req.token, JWT_SECRET, async (error, authData) => {
        if (authData.mail.admin === true) {
           return next();
        }
        else {
            res.status(404).send(`You are not an admin.`);
        }
    })
};

function verifySuspend(req, res, next) {
    const { JWT_SECRET } = process.env
    jwt.verify(req.token, JWT_SECRET, async (error, authData) => {
        if (authData.mail.disabled === false) {
           return next();
        }
        else {
            res.status(404).send(`Sorry, you are suspended.`);
        }
    })
};

module.exports = {
    verifyToken, verifyAdmin, verifySuspend, encript,
}