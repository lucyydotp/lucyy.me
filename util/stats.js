const config = require("../config.json");
const {MongoClient} = require("mongodb");
const cron = require("node-cron");

const client = MongoClient(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const examplePayload = {
    uuid: "uuid",
    playerCount: 123,
    platform: "bukkit",
    authMode: "bungee",
    server: "paper",
    version: "1.3.0",
    mcVersion: "1.17",
    javaVersion: "17"
}

function DataSet(project) {
    this.project = project;
    this.timestamp = Date.now();
    this.serverCount = 0;
    this.playerCount = 0;
    this.uuids = []
    this.data = []

    this.addData = function (data) {
        if (this.uuids.contains(data.uuid)) return;
        this.uuids.push(data.uuid);
        this.serverCount += 1;
        delete data.uuid;
        this.data.push(data);
    }
}

const dataSets = new Map();
let dataSet = new DataSet();

module.exports = {

    push: async function () {
        await dataSets.map(async set => {
            let dataCloned = Object.assign({}, set);

            await client.collection("stats").updateOne(
                {timestamp: dataSet.timestamp},
                {$set: dataCloned},
                {upsert: true})
        });
    },

    addData: function (data) {
        dataSet.addData(data);
        this.push().catch(console.warn);
    },

    init: async function () {
        console.log("Connecting to Mongo...");
        await client.connect();

        cron.schedule("0,30 * * * *", function() {
            this.push().catch(console.warn);
            dataSet = new DataSet();
        }, {})

        await client.db("admin").command({ping: 1});
        console.log("Connected to Mongo");
    }
}