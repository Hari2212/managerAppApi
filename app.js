const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth.route');
const common = require('./routes/common.route');
// Database Connection
mongoose.connect(process.env.DATABASE)
.then(x=> console.log("Database connected successfully!!"))
.catch(x => console.log("Database Connection Failure!!",x));

// Handle the CORS

app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

// Body parser to access api body data 
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Add cookie parser to get the cookie data from the header
app.use(cookieParser());

app.get('/', function (req, res) {
    res.send("Welcome to Manager Application API...")
});

app.use('/api/auth',authRoute);
app.use('/api/app',common);

app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'API endpoint doesnt exist'
    })
  });
// console.log("Gettiing port number",process.env.PORT);
app.listen(process.env.PORT, () => {
    console.log("Server Running on PORT", process.env.PORT);
});
