const fs = require("fs");

let out = [];

for (let file of fs.readdirSync("projects")) {
    out.push(require(`../projects/${file.substr(0, file.length - 3)}`));
}

module.exports = out;