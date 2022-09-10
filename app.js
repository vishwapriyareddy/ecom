const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const { expressjwt: jwt } = require("express-jwt");
const errorHandler = require("./helpers/error-handler");

const authJwt = require("./helpers/jwt");
app.use(cors());
app.options("*", cors());
//const secret = process.env.secret;

// middleware
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(authJwt());
app.use('/public/uploads',express.static(__dirname + '/public/uploads'));
app.use(errorHandler)

//Routers
const categoriesRouter = require("./routers/categories");
const productsRouter = require("./routers/products");
const usersRouter = require("./routers/users");
const ordersRouter = require("./routers/orders");


const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);

//Database
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connection is ready ...");
    })
    .catch((err) => {
        console.log(err);
    });



//Development    
//Server
// app.listen(3000, () => {
//     // console.log(api);
//     console.log("server is running on http://localhost:3000");
// });

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("Express is working on port" + port );
})
