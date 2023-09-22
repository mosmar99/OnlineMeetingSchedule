const express = require('express')
const routes = require("./routes");

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

app.use("/", routes);

app.listen(port, () => console.log(`Express server listening on port ${port}!`))