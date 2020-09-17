const app = require('./app');
const db = require('./databases/db');
require('dotenv').config();

const port = process.env.PORT;

db.connect().then(() => {
    console.log('Database connected');
    app.listen(port, () => {
        console.log(`App running on port ${port}`);
    })
})