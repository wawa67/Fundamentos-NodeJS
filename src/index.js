const express = require("express");
const app = express();

app.get("/", (request, response) => {
    return response.json({message:"Hello World! I'm Ignite"});
});

app.listen(3333);