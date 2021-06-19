const fs = require("fs");
const projectUtils = require("./project-utils");

let out = [];

(async () => {
    for (let file of fs.readdirSync("projects")) {
        let project = require(`../projects/${file.substr(0, file.length - 3)}`);
        if (project.hasOwnProperty("releases")) {
            for (let release of project.releases) {
                release.artifacts = await projectUtils.getArtifacts(project, release.build);
            }
        }
        out.push(project);
    }
})();

module.exports = out;