//discord.gg/lunatix && laschebest
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('example-command')
        .setDescription('This is an example command.'),
    commandPermissions: [], // ["123456789012345678"] as roles or [PermissionsFlagsBits.Flags.Administrator] as perms.
    usage: '/example-command',
    developerOnly: false,
    async execute(client, interaction) {
        await interaction.reply('Example command executed!');
    }
};
