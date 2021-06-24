module.exports = {
    name: "Squirtgun",
    colours: ["yellow", "purple"],
    order: 1,
    links: {
        "GitHub": "https://github.com/lucyy-mc/squirtgun"
    },
    supports: [
        "Bukkit/Spigot/Paper 1.8-1.16",
        "BungeeCord"
    ],
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
            changelog: ["Changed a load of stuff"]
        }
    ]
}