const express = require("express");
const config = require("./config.json")

const app = express();
const port = config.port;

app.set("view engine", "ejs")

const rte = new (require("./routes/index"))(app);

app.listen(port, () => console.log(`Listening on port ${port}`));