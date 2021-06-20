const fs = require("fs");
const desc = fs.readFileSync("projects/pronouns-desc.html", {encoding: "utf-8"});
module.exports = {
    name: "ProNouns",
    colours: ["blue", "purple"],
    shortdesc: "ProNouns is a Minecraft server plugin that lets players set their pronouns, which server admins can substitute into server messages.",
    desc: desc,
    wiki: "https://docs.lucyy.me/en/latest/pronouns/",
    links: {
        "GitHub": "https://github.com/lucyy-mc/pronouns",
        "Polymart": "https://lucyy.me/pronouns",
        "SpigotMC": "https://www.spigotmc.org/resources/pronouns.86199/"
    },
    supports: [
        "Bukkit/Spigot/Paper 1.8-1.16",
        "BungeeCord",
        "Sponge 8",
        "Fabric (soon)"
    ],
    source: "https://github.com/lucyy-mc/pronouns",
    build: {
        buildType: "LucyStuff_ProNouns_Build",
        branch: "the-big-cleanup",
        artifacts: {
            API: {
                dir: "pronouns-api/build/libs",
                match: name => !name.endsWith("-javadoc.jar") & !name.endsWith("-sources.jar"),
                version: /(?<=pronouns-api-).*(?=.jar)/
            },
            Bukkit: {
                dir: "pronouns-bukkit/build/libs",
                match: name => !name.endsWith("-nodeps.jar")
            },
            Bungee: {
                dir: "pronouns-bungee/build/libs",
                match: name => !name.endsWith("-nodeps.jar")
            },
            PlaceholderAPI: {
                dir: "pronouns-papi/build/libs",
                match: name => !name.endsWith("-javadoc.jar") & !name.endsWith("-sources.jar")
            },
        }
    },
    releases: [
        {
            name: "1.3.0-beta2",
            build: 266,
            changelog: [
                "Updated to support 1.17",
                "Removed dependency on paper, should run fine on CB/spigot now",
                "Internal code restructure to allow for cross-platform support (builds for other platforms coming soon)",
                "Added an \"Ask\" pronoun set",
                "Commands that accept player arguments (show for example) now accept offline players if they have connected to the server before",
                "Experimental BungeeCord support"
            ]
        },
        {
            name: "1.3.0-beta1",
            build: 208,
            changelog: [
                "Replaced LucyCommonLib with Squirtgun",
                "Better help menu",
                "Offline player support in commands",
                "Changed some error messages here and there",
                "New preview text",
                "Moved from Maven to Gradle (this means nothing unless you're building the plugin yourself)",
                "Fix dependency relocation issues"
            ]
        }
    ]
}