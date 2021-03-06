const express = require('express');
const path = require('path');
const cors = require('cors');

require('dotenv').config();
require('./db/mongoose');
const userRouter = require('./routers/users');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => console.log(`listening at port ${port}`));
