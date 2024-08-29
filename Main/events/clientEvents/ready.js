//discord.gg/lunatix && laschebest
const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    async start(client) {
        console.log(`[${client.user.tag}] Activated!`);
    }
}