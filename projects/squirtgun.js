module.exports = {
    name: "Squirtgun",
    colours: ["yellow", "purple"],
    desc: "Squirtgun is a multi-purpose Minecraft plugin library, providing a command framework, formatting engine and basic cross-platform server API.",
    links: {
        "GitHub": "https://github.com/lucyy-mc/squirtgun"
    },
    build: {
        buildType: "LucyStuff_Squirtgun_Publish",
        branch: "master",
        artifacts: {
            API: {
                dir: "squirtgun-api/build/libs",
                match: name => !name.endsWith("-sources.jar") && !name.endsWith("-javadoc.jar"),
                version: /(?<=squirtgun-api-).*(?=.jar)/
            },
            Commands: {
                dir: "squirtgun-commands/build/libs",
                match: name => !name.endsWith("-sources.jar") && !name.endsWith("-javadoc.jar")
            },
            "Bukkit platform": {
                dir: "squirtgun-platform-bukkit/build/libs",
                match: name => !name.endsWith("-sources.jar") && !name.endsWith("-javadoc.jar")
            },
            "Bungee platform": {
                dir: "squirtgun-platform-bungee/build/libs",
                match: name => !name.endsWith("-sources.jar") && !name.endsWith("-javadoc.jar")
            }
        }
    },
    releases: [
        {
            name: "2.0.0-pre4",
            build: 272,
            changelog: "Changed a load of stuff"
        }
    ]
}