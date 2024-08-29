//discord.gg/lunatix && laschebest
const { Main: { developers, prefixes } } = require('../../../Utilities/Settings/config.js');
const { Events, PermissionFlagsBits } = require("discord.js");

const commandCooldowns = new Map();

module.exports = {
    name: Events.MessageCreate,
    async start(client, message) {
        if (message.author.bot) return;
        if (!prefixes.some(prefix => message.content.startsWith(prefix))) return;

        const prefix = prefixes.find(prefix => message.content.startsWith(prefix));
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        if (commandName.length === 0) return;
        const cmd = client.normalCommands.get(commandName) || client.commandAliases.get(commandName);
        if (!cmd) return;

        if (cmd.developerOnly && developers.includes(message.member.id)) return cmd.start(client, message, args);
        else if (cmd.developerOnly && !developers.includes(message.member.id)) return message.reply("This command is developer only.");

        if (message.guild.ownerId === message.author.id || developers.includes(message.member.id)) {
            return cmd.start(client, message, args);
        }

        if (cmd?.commandCooldown && cmd?.commandCooldown > 0) {
            const cooldownKey = `${cmd.name}${message.author.id}`;
            if (commandCooldowns.has(cooldownKey)) {
                const remainingTime = commandCooldowns.get(cooldownKey) - Date.now();
                if (remainingTime > 0) {
                    return message.reply({
                        content: `You can use this command again in ${Math.ceil(remainingTime / 1000)} seconds.`
                    }).then(() => {
                        setTimeout(() => message.delete(), 5000);
                    });
                }
            }
            commandCooldowns.set(cooldownKey, Date.now() + cmd.commandCooldown * 1000);
            setTimeout(() => commandCooldowns.delete(cooldownKey), cmd.commandCooldown * 1000);
        }

        if (cmd.commandPermissions && cmd.commandPermissions.length > 0) {
            const hasPermissions = cmd.commandPermissions.some(permission => 
                message.member.permissions.has(permission) || 
                message.member.roles.cache.some(role => role.id === permission) || 
                message.member.permissions.has(PermissionFlagsBits[permission]) ||
                message.member.id == permission
            );
            if (!hasPermissions) {
                return message.reply(`You need the following permissions to use this command.`).then(() => {
                    setTimeout(() => message.delete(), 10000);
                });
            }
        }

        cmd.start(client, message, args);
    }
};
