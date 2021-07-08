/*
 * Copyright © Lucy Poulton 2021.  All rights reserved.
 */

const fs = require("fs");
const projectUtils = require("./project-utils");

let out = [];

out.init = async function () {
    for (let file of fs.readdirSync("projects", {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)) {
        let project = require(`../projects/${file}/project`);

        project.desc = fs.readFileSync(`projects/${file}/description.html`, {encoding: "utf-8"});
        project.simpleName = file;

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