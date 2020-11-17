const dotenv = require('dotenv');

dotenv.config();

const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');

const { ErrorHandlerMiddleware } = require('./middlewares');

const apiPort = config.get('api.port');

const app = express();

const { productRouter } = require('./routers');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/products', productRouter);

app.use(ErrorHandlerMiddleware.handlePathNotFound);
app.use(ErrorHandlerMiddleware.handleError);

app.listen(apiPort);