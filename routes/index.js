/*
 * Copyright © Lucy Poulton 2021.  All rights reserved.
 */

const http = require("http");
const fetch = require("node-fetch");
const config = require("../config.json");
const projectUtils = require("../util/project-utils")
const projects = require("../util/project-manager")

module.exports = class {
    async updateData() {
        console.log("Updating GitHub projects...");
        let response = await fetch(config.profileUrl);
        this.githubData = await response.json();
        setInterval(this.updateData, 3600000);
        console.log("Updated GitHub projects");
    }
    constructor(app) {
        this.updateData();
        setInterval(this.updateData, 3600000);
        app.get("/", (req, res) => {
            res.render("index",
                {
                    github: this.githubData,
                    title: "Lucy Poulton",
                    projects: projects,
                    gradient: projectUtils.gradient
                })
        });
    }
}