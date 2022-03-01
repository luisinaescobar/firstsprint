const { createHmac } = require('crypto');
const jwt =  require('jsonwebtoken');
// Athorization: Bearer <token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const { JWT_SECRET } = process.env;

        const bearertoken = bearerHeader.split(" ")[1];
        req.token = bearertoken;
        jwt.verify(req.token, JWT_SECRET, async (error, authData) => {
            if(error){
                return res.send('Invalid token');
            }
            req.user=authData
            return next();
        })
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
       console.log(authData)
        if (authData.id.admin === true) {
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
        console.log(authData)
        if (authData.id.disabled === false) {
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