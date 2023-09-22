const path = require("path");
const express = require("express")
const router = express.Router();

const apiRoutes = require("./api");

// Serve the statically built deployment files
router.use(express.static("deploy"));

// API routes for fetching and handling data, authenticating users, etc. 
router.use("/api", apiRoutes);

// Catch all that just passes you to the react SPA
router.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "..", 'deploy', 'index.html'));
});

module.exports = router;