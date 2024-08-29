//discord.gg/lunatix && laschebest
const { Main: { prefixes } } = require('../../Utilities/Settings/config.js');

module.exports = {
    name: 'example-command',
    description: 'This is an example command.',
    commandPermissions: [], // ["123456789012345678"] as roles or [PermissionsFlagsBits.Flags.Administrator] as perms.
    usage: `${prefixes[0]}example-command`,
    commandAliases: ['example', 'ex'],
    commandCooldown: 5000, // 5 seconds 
    developerOnly: false,
    async start(client, message, args) {
        await message.reply('Example command executed!');
    }
}