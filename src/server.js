const express = require('express')
const path = require("path");

const app = express()
const port = 3000

app.use(express.static("deploy"));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", 'deploy', 'index.html'));
});

app.listen(port, () => console.log(`Express server listening on port ${port}!`))