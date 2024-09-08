const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const AUTH_ROUTE = require('./route/auth.route')
const PRODUCT_ROUTE = require('./route/product.route')
const ORDER_ROUTE = require('./route/order.route')
const CATEGORIES_ROUTE = require('./route/categories.route');
require("./config/instrument");
const sentry = require("@sentry/node");


app.use(express.json());
app.use(cookieParser());
app.use('/auth', AUTH_ROUTE);
app.use('/product', PRODUCT_ROUTE);
app.use('/order', ORDER_ROUTE);
app.use('/categories', CATEGORIES_ROUTE);

sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});