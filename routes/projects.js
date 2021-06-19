const config = require("../config.json");
const projectUtils = require("../util/project-utils");
const projects = require("../util/project-manager");
const semver = require("semver");

module.exports = (app) => {
    app.get("/:project", async (req, res) => {
        const projectName = req.params["project"];
        const project = projects.filter(p => projectUtils.simpleName(p.name) === projectUtils.simpleName(projectName))[0];
        if (project === undefined) {
            res.redirect("/");
            return;
        }

        let release, releaseUrls;

        if (Object.keys(project.releases).length > 0) {
            release = project.releases.sort((a, b) => semver.rcompare(a.name, b.name))[0];
            releaseUrls = await projectUtils.getArtifacts(project, release.build);
        }
        res.render("project/project",
            {
                title: `${project.name} by __lucyy`,
                project: project,
                gradientDark: projectUtils.gradientDark(project),
                gradient: projectUtils.gradient(project),
                release: release,
                releaseUrls: releaseUrls
            })
    });
};
