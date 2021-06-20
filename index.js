const express = require("express");
const config = require("./config.json")
const morgan = require("morgan")
const projectManager = require("./util/project-manager");

const app = express();
const port = config.port;

app.use(morgan("common"))

app.set("view engine", "ejs")

const rte = new (require("./routes/index"))(app);
require("./routes/projects")(app);

projectManager.init().then(() =>
app.listen(port, () => console.log(`Listening on port ${port}`)));