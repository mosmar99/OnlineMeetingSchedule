const express = require('express');
const routes = require("./routes");
const cors = require("cors");
const mongoose = require('mongoose');

// get access to .env vars
require('dotenv').config()

// start server
const app = express();

// enable req.body
app.use(express.json());

// mountain routes on "/"
app.use("/", routes);

if (process.argv[2] === "development") {
    app.use((req, res, next) => {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
        console.log(`Request at ${req.url} (${time})`);
    
        next();
    });
}

var allowlist = ['http://localhost:3000/', "http://127.0.0.1:3000/"]

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;

    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }

    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('[1] Connected to database')
        app.listen(process.env.PORT, () => {
            console.log('[2] Server is listening on port', process.env.PORT)
        })
    })
    .catch(err => {
        console.log('[1] Error connecting to database', err)
    })