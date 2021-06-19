const config = require("../config.json");
const fetch = require("node-fetch");

module.exports = {
    __artifactCache: {},
    __buildIdCache: {},

    gradient: project => `linear-gradient(135deg, ${project.colours.map(x => `var(--colour-${x})`).join(", ")})`,
    gradientDark: project => `linear-gradient(135deg, ${project.colours.map(x => `var(--colour-dark-${x})`).join(", ")})`,
    simpleName: name => name.toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll(/[^A-Za-z0-9-_]/g, ""),

    getLatestArtifacts: async function(project) {
        return this.getLatestBuildId(project)
            .then(id => this.getArtifacts(project, id));
    },

    getLatestBuildId: async function (project) {
        if (this.__buildIdCache.hasOwnProperty(project.name)) {
            let data = this.__buildIdCache[project.name];
            if (data.expires > Date.now()) {
                return data.data;
            } else {
                delete this.__buildIdCache[project.name];
            }
        }
        if (project.build == null) return null;

        return fetch(`${config.teamcity}/app/rest/builds?locator=buildType:id:${project.build.buildType},branch:name:${project.build.branch}`,
            {headers: {"Accept": "application/json"}})
            .then(data => data.json())
            .then(async json => {
                if (json.build.length === 0) return null;
                let id = json.build[0].id;
                this.__buildIdCache[project.name] = {
                    expires: Date.now() + 72000000, // 2 hours
                    data: id
                };
                return id;
            });
    },

    getArtifacts: async function (project, buildId) {
        if (project.build == null) return null;

        if (this.__artifactCache.hasOwnProperty(buildId)) {
            let data = this.__artifactCache[buildId];
            if (data.expires > Date.now()) {
                return data.data;
            } else {
                delete this.__artifactCache[buildId];
            }
        }

        let out = {}
        for (let artifactName of Object.keys(project.build.artifacts)) {
            let artifact = project.build.artifacts[artifactName];
            let remote = await fetch(`${config.teamcity}/app/rest/builds/id:${buildId}` +
                `/artifacts/children/${artifact.dir}`, {headers: {"Accept": "application/json"}})
            let remoteJson = await remote.json()

            let file = remoteJson.file.find(x => artifact.match(x.name));
            if (file != null) {
                out[artifactName] = config.teamcity + file.href;
            }

            if (artifact.hasOwnProperty("version") && out.version === undefined) {
                out.version = file.name.match(artifact.version)[0]
            }
        }

        this.__artifactCache[project.name] = {
            expires: Date.now() + 2592000000, // 30 days
            data: out
        };

        return out;
    }
}