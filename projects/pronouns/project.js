module.exports = {
    name: "ProNouns",
    colours: ["blue", "purple"],
    shortdesc: "ProNouns is a Minecraft server plugin that lets players set their pronouns, which server admins can substitute into server messages.",
    order: 0,
    //wiki: "https://docs.lucyy.me/en/latest/pronouns/",
    wiki: {
        "commands": "Commands",
        "config": "Config",
        "placeholders": "Placeholders",
        "developer": "Developers",
        "set": "Setting your pronouns"
    },
    links: {
        "GitHub": "https://github.com/lucyy-mc/pronouns",
        "Polymart": "https://lucyy.me/pronouns",
        "SpigotMC": "https://www.spigotmc.org/resources/pronouns.86199/"
    },
    supports: [
        "Bukkit/Spigot/Paper 1.8-1.17",
        "BungeeCord"
    ],
    source: "https://github.com/lucyy-mc/pronouns",
    build: {
        buildType: "LucyStuff_ProNouns_Build",
        branch: "master",
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
            name: "1.3.0",
            build: 284,
            changelog: [
                "Updated to support 1.17",
                "Removed dependency on paper, should run fine on CB/spigot now",
                "Internal code restructure to allow for cross-platform support",
                "Added an \"Ask\" pronoun set",
                "Commands that accept player arguments (show for example) now accept offline players if they have connected to the server before",
                "Experimental native BungeeCord support",
                "Replaced LucyCommonLib with Squirtgun",
                "Better help menu",
                "Changed some error messages here and there",
                "New preview text",
                "Moved from Maven to Gradle (this means nothing unless you're building the plugin yourself)",
                "Fix dependency relocation issues"
            ]
        }
    ],
    linkName: "pn"
}