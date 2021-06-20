const fs = require("fs");
const projectUtils = require("./project-utils");

let out = [];

out.init = async function () {
    for (let file of fs.readdirSync("projects").filter(file => file.endsWith(".js"))) {
        let project = require(`../projects/${file.substr(0, file.length - 3)}`);
        if (project.hasOwnProperty("releases")) {
            for (let release of project.releases) {
                console.log(`Caching artifacts for ${project.name} ${release.name}`)
                release.artifacts = await projectUtils.getArtifacts(project, release.build);
            }
        }
        this.push(project);
    }
};

module.exports = out;