const express = require('express');
const todoRouter = require('./routes/todoRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./databases/db');

console.log(process.env.SECRET);

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/todos', todoRouter);
app.use('/api/users', userRouter);
app.use('/auth', authRouter);


const port = 3000;
app.listen(port, () => {
    console.log(`API Running on port ${port}`);
})