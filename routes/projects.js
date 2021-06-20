const config = require("../config.json");
const projectUtils = require("../util/project-utils");
const projects = require("../util/project-manager");
const semver = require("semver");

const getProject = req => {
    const projectName = req.params["project"];
    return projects.filter(p => projectUtils.simpleName(p.name) === projectUtils.simpleName(projectName))[0];
}

module.exports = (app) => {
    app.get("/:project", (req, res) => {
        res.redirect(req.url + "/description");
    })

    app.get("/:project/description", async (req, res) => {
        const project = getProject(req);
        if (project === undefined) {
            res.redirect("/");
            return;
        }

        let release;

        if (project.releases.length > 0) {
            release = project.releases.sort((a, b) => semver.rcompare(a.name, b.name))[0];
        }
        res.render("project/description",
            {
                page: "description",
                title: `${project.name} by __lucyy`,
                project: project,
                gradientDark: projectUtils.gradientDark(project),
                gradient: projectUtils.gradient(project),
                release: release
            })
    });

    app.get("/:project/updates", async (req, res) => {
        const project = getProject(req);
        if (project === undefined) {
            res.redirect("/");
            return;
        }

        let releases = project.releases.sort((a, b) => semver.rcompare(a.name, b.name));

        res.render("project/updates",
            {
                page: "updates",
                title: `Updates | ${project.name} by __lucyy`,
                project: project,
                gradientDark: projectUtils.gradientDark(project),
                gradient: projectUtils.gradient(project),
                releases: releases,
                release: releases[0]
            })
    })

    app.get("/:project/source", (req, res) => {
        const project = getProject(req);
        if (project === undefined) {
            res.redirect("/");
            return;
        }

        res.redirect(project.source);
    });
};
