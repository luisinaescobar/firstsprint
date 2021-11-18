const redis = require('redis');
const client = redis.createClient({ host: 'myfirstcluster.ek96ql.0001.sae1.cache.amazonaws.com'
});

client.on('error', (error) => {
    console.error(error);
});

function makeKey(req) {
    return `${req.method}_${req.baseUrl}`;
}

function storeObjectInCache(req, object) {
    const key = makeKey(req);
    client.set(key, JSON.stringify(object));
}

function cache(req, res, next) {
    const key = makeKey(req);
    client.get(key, (error, data) => {
        if (error || !data) {
            next();
        } else {
            res.send(JSON.parse(data));
        }
    });
}

function invalidateCache(req) {
    client.DEL(makeKey(req));
}
module.exports = {
    storeObjectInCache, cache, invalidateCache,
};