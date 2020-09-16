const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

require('dotenv').config();

const { ENVIRONMENT } = process.env;

async function connect() {
    switch(ENVIRONMENT) {
        case "production":
            await mongoose.connect(process.env.DBCONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
            break;
        default:
            const mongod = new MongoMemoryServer();
            const uri = await mongod.getConnectionString();

            const options = {
                useNewUrlParser: true,
                autoReconnect: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000
            }

            await mongoose.connect(uri, options);

            break;
    }
}

module.exports.connect = connect();