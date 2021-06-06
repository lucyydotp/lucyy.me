const http = require("http");
const fetch = require("node-fetch");

module.exports = class {
    async updateData() {
        console.log("Updating GitHub data...");
        let response = await fetch("https://raw.githubusercontent.com/lucyy-mc/lucyy-mc/main/profile.json");
        this.githubData = await response.json();
        setInterval(this.updateData, 3600000);
        console.log("Updated GitHub data");
    }
    constructor(app) {
        this.updateData();
        setInterval(this.updateData, 3600000);
        app.get("/", (req, res) => {
            res.render("index",
                {
                    github: this.githubData,
                    title: "__lucyy"
                })
        });
    }
}