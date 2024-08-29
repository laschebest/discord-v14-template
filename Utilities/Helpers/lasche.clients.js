//discord.gg/lunatix && laschebest
const { GatewayIntentBits, OAuth2Scopes, Partials, Collection } = require('discord.js')
const fs = require('fs');
const path = require('path');

class Client {
    constructor(options) {
        this.client = new (require('discord.js').Client)({
            intents: Object.keys(GatewayIntentBits),
            partials: Object.keys(Partials),
            OAuth2Scopes: Object.keys(OAuth2Scopes)
        });
        this.options = options;
        this.client.normalCommands = new Collection();
        this.client.slashCommands = new Collection();
        this.client.commandAliases = new Collection();
        process.on('uncaughtException', (error) => {
            console.error('Uncaught Exception:', error);
        });
        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        });
        process.on('warning', (warning) => {
            console.warn('Warning:', warning);
        });
        this.client.on('error', (error) => {
            console.error('Discord.js Client Error:', error);
        });
        this.client.on('warn', (info) => {
            console.warn('Discord.js Warning:', info);
        });
        this.client.on('shardError', (error, shardId) => {
            console.error(`Shard ${shardId} encountered an error:`, error);
        });
        this.client.on('rateLimit', (info) => {
            console.warn('Rate limit hit:', info);
        });
        
        this.client.on('shardDisconnect', (event, shardId) => {
            console.warn(`Shard ${shardId} disconnected`);
        });
        
        this.client.on('shardReconnecting', (shardId) => {
            console.log(`Shard ${shardId} is reconnecting`);
        });
        
        this.client.on('shardResume', (shardId, replayedEvents) => {
            console.log(`Shard ${shardId} resumed, replaying ${replayedEvents} events`);
        });
    }

    async connect(database = {}) {
        // database connections looks like this: { type: "MongoDB", url: "mongodb://localhost:27017" }
        await this.client.login(this.options.token).catch(err => console.log("Bot token is invalid try again."))

        if (database?.type) {
            if (database.type === "MongoDB") {
                const mongoose = require('mongoose')
                await mongoose.connect(database.url, {}).then(() => console.log("Connected to MongoDB")).catch(err => console.log("Failed to connect to MongoDB", err))
            }
        }
    }

    async readCommandFiles(slash = false, text = false) {
        if (slash) {
            const slashCommandDir = path.join(__dirname, `../../Main/commands/slashCommands`);
            const slashCommandFiles = this.getAllFiles(slashCommandDir);
            for (const file of slashCommandFiles) {
                const command = require(file);
                this.client.slashCommands.set(command.data.name, command);
                this.client.on("ready", async () => {
                    this.client.guilds.cache.map(async (x) => {
                        x.commands.create(command.data);
                    })
                })
            }
        }
        if (text) {
            const textCommandDir = path.join(__dirname, `../../Main/commands/textCommands`);
            const textCommandFiles = this.getAllFiles(textCommandDir);
            for (const file of textCommandFiles) {
                const command = require(file);
                this.client.normalCommands.set(command.name, command);
                command.commandAliases.forEach(alias => {
                    this.client.commandAliases.set(alias, command);
                });
            }
        }
    }

    getAllFiles(dir, files_ = []) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const name = path.join(dir, file);
            if (fs.statSync(name).isDirectory()) {
                this.getAllFiles(name, files_);
            } else if (name.endsWith('.js')) {
                files_.push(name);
            }
        }
        return files_;
    }

    async readEventFiles() {
        const eventFiles = this.getAllFiles(path.join(__dirname, '../../Main/events'));
        for (const file of eventFiles) {
            const event = require(file);
            this.client.on(event.name, (...args) => event.start(this.client, ...args));
        }
    }
}

module.exports = Client;