require('dotenv').config();
require('express-async-errors'); // our error handler, 

const express = require('express');
const path = require('path');

// routers
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
// db
const connectDB = require('./db/connect');
// middleware
const notFound = require('./middlewares/not_found');
const errorHandlerMiddleware = require('./middlewares/errorHandler');

const app = express();

// adding the static folder
app.use(express.static(path.join(__dirname, "Public")));

app.use(express.json())
app.use(express.urlencoded({ extended: true })); // to get the data from forms

// PUG specific stuff

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/user', userRouter);

app.use(notFound); // using the notFound middleware
app.use(errorHandlerMiddleware);



// home page route
app.get('/', (req, res) => {
    res.status(200).render("index.html");
}
);

const port = 3000;

const start = async () => {
    try { // if connection is successfull then and only then we will start the server
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    }

    catch (error) {
        console.log(error);
    }
}

start()