const express = require('express');
const routes = require("./routes");
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();
const port = 3000;

if (process.argv[2] === "development") {
    app.use((req, res, next) => {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
        console.log(`Request at ${req.url} (${time})`);
    
        next();
    });
}

app.use(express.json());

app.use("/", routes);

app.listen(port, () => console.log(`Express server listening on port ${port}!`))

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