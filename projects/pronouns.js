module.exports = {
    name: "ProNouns",
    colours: ["blue", "purple"],
    desc: "ProNouns is a Minecraft server plugin that lets players set their pronouns, which server admins can substitute into server messages.",
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
            bukkit: {
                dir: "pronouns-bukkit/build/libs",
                match: name => name.match(/pronouns-bukkit-\d\.\d\.\d\.jar/)
            },
            bungee: {
                dir: "pronouns-bungee/build/libs",
                match: name => name.match(/pronouns-bungee-\d\.\d\.\d\.jar/)
            }
        }
    },
    releases: [{
        name: "1.3.0-beta2",
        build: 266,
        changelog: [
            "Updated to support 1.17",
            "Removed dependency on paper, should run fine on CB/spigot now",
            "Internal code restructure to allow for cross-platform support (builds for other platforms coming soon)",
            "Added an \"Ask\" pronoun set",
            "Commands that accept player arguments (show for example) now accept offline players if they have connected to the server before"
        ]
    }]
}