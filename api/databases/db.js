const mongoose = require('mongoose');

function connect() {
    mongoose.connect(process.env.DBCONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
}

module.exports = connect();