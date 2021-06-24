const config = require("../config.json");
const projectUtils = require("../util/project-utils");
const projects = require("../util/project-manager");
const semver = require("semver");
const fs = require("fs");

const getProject = req => {
    const projectName = req.params["project"];
    return projects.filter(p => p.simpleName === projectName.toLowerCase())[0];
}

const getBaseParams = function (project) {
    return {
        project: project,
        gradientDark: projectUtils.gradientDark(project),
        gradient: projectUtils.gradient(project),
        releases: project.releases.sort((a, b) => semver.rcompare(a.name, b.name)),
        description: project.shortdesc
    };
}

module.exports = (app) => {
    app.get("/:project", (req, res) => {
        let url = req.url;
        res.redirect(url + (url.endsWith("/") ? "" : "/") + "description");
    });

    app.get("/:project/description", async (req, res) => {
        const project = getProject(req);
        if (project === undefined) {
            res.redirect("/");
            return;
        }

        let params = getBaseParams(project);
        params.title = `${project.name} by __lucyy`;
        params.page = "description";
        res.render("project/description", params)
    });

    app.get("/:project/updates", async (req, res) => {
        const project = getProject(req);
        if (project === undefined) {
            res.redirect("/");
            return;
        }

        let params = getBaseParams(project);
        params.title = `Updates | ${project.name} by __lucyy`;
        params.page = "updates";
        res.render("project/updates", params);
    });

    app.get("/:project/source", (req, res) => {
        const project = getProject(req);
        if (project === undefined || project.source === undefined) {
            res.redirect("/");
            return;
        }
        res.redirect(project.source);
    });
    app.get("/:project/wiki", (req, res) => {
        const project = getProject(req);
        if (project === undefined || project.wiki === undefined) {
            res.redirect("/");
            return;
        }
        res.redirect("./wiki/" + Object.keys(project.wiki)[0]);
    });

    app.get("/:project/wiki/:page", (req, res) => {
        const project = getProject(req);
        if (project === undefined) {
            res.redirect("/");
            return;
        }

        if (project.wiki === undefined || project.wiki[req.params["page"]] === undefined) {
            res.redirect("/" + project.simpleName);
            return;
        }

        const fileName = req.params["page"];

        let params = getBaseParams(project);
        params.title = `${project.wiki[fileName]} | ${project.name} by __lucyy`;
        params.page = "wiki";
        params.wikiPage = fs.readFileSync(`projects/${project.simpleName}/${fileName}.html`);
        res.render("project/wiki", params);
    });

    app.get("/d/:name/:page*", (req, res) => {
        const project = projects
             .filter(p => p.hasOwnProperty("linkName") && p.linkName === req.params["name"].toLowerCase())[0];
        if (project === undefined) {
            res.redirect("/");
            return;
        }
        res.redirect(`/${project.simpleName}/wiki/${req.params["page"].toLowerCase()}`);
    });

    app.get("/:project/version", (req, res) => {
        const project = getProject(req);
        if (project === undefined || project.releases.length === 0) {
            res.status(404).send("Not Found");
            return;
        }
        res.send(project.releases.sort((a, b) => semver.rcompare(a.name, b.name))[0].name);
    })
};
