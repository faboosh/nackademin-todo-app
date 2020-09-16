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
                useUnifiedTopology: true
            }

            await mongoose.connect(uri, options);

            module.exports.disconnect = async () => {
                await mongoose.connection.dropDatabase();
                await mongoose.connection.close();
                await mongod.stop();
            }

            module.exports.dropDatabase = async () => {
                await mongoose.connection.dropDatabase();
            }

            break;
    }
}

module.exports.connect = connect();