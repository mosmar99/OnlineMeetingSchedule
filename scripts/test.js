const axios = require("axios");

axios
    .get("http://localhost:3000/api/meetings")
    .then(res => {
        console.log("res", res.data);
        console.log(res.data[0].startDate)
    })
    .catch(err => {
        console.log("catch", err)
    })
