const express = require('express');
const router = require('./routes/routes');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/todos', router);

const port = 3000;
app.listen(port, () => {
    console.log(`API Running on port ${port}`);
})