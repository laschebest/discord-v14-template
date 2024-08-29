//discord.gg/lunatix && laschebest
const { Main: { developers } } = require('../../../Utilities/Settings/config.js');
const { Events, PermissionFlagsBits } = require("discord.js");

const commandCooldowns = new Map();

module.exports = {
    name: Events.InteractionCreate,
    async start(client, interaction) {
        if (interaction.user.bot || !interaction.isCommand()) return;

        const cmdName = interaction.commandName;
        const command = client.slashCommands.get(cmdName);
        if (!command) return;

        if (command.developerOnly && developers.includes(interaction.user.id)) return command.start(client, interaction);
        if (command.developerOnly && !developers.includes(interaction.user.id)) return interaction.reply({content:"This command is developer only.", ephemeral:true});;

        if (interaction.guild.ownerId === interaction.user.id || developers.includes(interaction.user.id)) {
            return command.start(client, interaction);
        }

        if (command.commandCooldown && command.commandCooldown > 0) {
            const cooldownKey = `${interaction.user.id}-${cmdName}`;
            const currentTime = Date.now();
            if (commandCooldowns.has(cooldownKey)) {
                const expirationTime = commandCooldowns.get(cooldownKey) + command.commandCooldown * 1000;
                if (currentTime < expirationTime) {
                    const timeLeft = (expirationTime - currentTime) / 1000;
                    return interaction.reply({
                        content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmdName}\` command.`,
                        ephemeral: true
                    });
                }
            }
            commandCooldowns.set(cooldownKey, currentTime);
            setTimeout(() => commandCooldowns.delete(cooldownKey), command.commandCooldown * 1000);
        }

        if (command.commandPermissions && command.commandPermissions.length > 0) {
            const hasPermissions = command.commandPermissions.some(permission => 
                interaction.member.permissions.has(permission) || 
                interaction.member.roles.cache.some(role => role.id === permission) ||
                interaction.member.permissions.has(PermissionFlagsBits[permission]) ||
                interaction.user.id == permission
            );
            if (!hasPermissions) {
                return interaction.reply({
                    content: `You do not have the required permissions to use this command.`,
                    ephemeral: true
                });
            }
        }

        command.start(client, interaction);
    }
};
