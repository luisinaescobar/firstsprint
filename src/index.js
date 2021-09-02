const { config } = require('dotenv');
const { connect } = require('./database/index');
const { initialize } = require('./config/db');
const { makeServer } = require('./server');

async function main() {
    config();
    const PORT = process.env.PORT || 3000;
     const {
         DB_USERNAME,
         DB_PASSWORD,
         DB_NAME,
         DB_PORT,
         DB_HOST
     } = process.env;
     const isDBok = await connect(DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME);
    initialize();
    const server = makeServer();
    if (isDBok) {
        server.listen(PORT, () => {
            console.log('Server is running...');
        });
    } else {
        console.log('failed to load DB')
    }
}

main();