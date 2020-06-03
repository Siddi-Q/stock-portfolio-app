const express = require('express');
const cors = require('cors');

require('dotenv').config();
require('./db/mongoose');
const userRouter = require('./routers/users');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.listen(port, () => console.log(`listening at port ${port}`));
