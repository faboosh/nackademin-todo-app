const express = require('express');
const todoListRouter = require('./routes/todoListRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const auth = require('./middlewares/auth');
const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/todolists', auth.verifyToken, todoListRouter);
app.use('/api/users', userRouter);
app.use('/auth', authRouter);

module.exports = app;

