require('dotenv').config();
require('./db/mongoose');

const express = require('express');
const path = require('path');
const cors = require('cors');

const authRouter = require('./routers/auth');
const stockRouter = require('./routers/stock');
const userRouter = require('./routers/users');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/stock', stockRouter);
app.use('/user', userRouter);

app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => console.log(`listening at port ${port}`));
