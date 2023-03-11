const experss = require('express');
const app = experss();
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const apiv1 = require('./routes/apiv1')
const {errorHandler, responseHandler} = require('./middlewares/responseHandler');
const connectDB = require('./configs/db');

connectDB();

app.use(helmet());
app.use(morgan('dev'));
app.use(experss.json());

app.use('/api', apiv1);

app.use(errorHandler);
app.use(responseHandler);

app.listen(PORT, () => {
    console.log("Server Started on port", PORT);
})