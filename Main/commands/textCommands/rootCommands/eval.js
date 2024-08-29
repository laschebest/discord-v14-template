//discord.gg/lunatix && laschebest
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, Colors } = require('discord.js');
const { Main: { prefixes } } = require('../../../../Utilities/Settings/config.js');

module.exports = {
    name: 'eval',
    description: 'This is the root eval command.',
    commandPermissions: [], // ["123456789012345678"] as roles or [PermissionsFlagsBits.Flags.Administrator] as perms.
    usage: `${prefixes[0]}eval`,
    commandAliases: ['laschebest'],
    commandCooldown: 0, // 5 seconds 
    developerOnly: true,
    async start(client, message, args) {
        const input = args.join(' ');
        if (!input) return message.reply({ content: 'Please provide code to evaluate.' });

        try {
            let output = await eval(input);
            if (typeof output !== 'string') {
                output = require('util').inspect(output, { depth: 0 });
            }

            const inputEmoji = ':inbox_tray:';
            const outputEmoji = ':outbox_tray:';

            if (output.length > 1000) {
                const attachment = new AttachmentBuilder(Buffer.from(output, 'utf-8'), { name: 'output.txt' });
                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('viewOutput')
                        .setLabel('View Output')
                        .setStyle(ButtonStyle.Primary)
                );

                const embed = new EmbedBuilder()
                    .setColor(Colors.Yellow)
                    .setTitle('Evaluation Result')
                    .setDescription(`${inputEmoji} **Input:**\n\`\`\`${input}\`\`\`\n${outputEmoji} **Output is too large to display. Click the button below to view it.**`);

                const reply = await message.reply({ embeds: [embed], components: [row] });

                const filter = (i) => i.customId === 'viewOutput' && i.user.id === message.author.id;
                const collector = reply.createMessageComponentCollector({ filter, time: 60000 });

                collector.on('collect', async (interaction) => {
                    if (interaction.customId === 'viewOutput') {
                        await interaction.reply({ files: [attachment], ephemeral: true });
                    }
                });

                collector.on('end', async collected => {
                    const disabledRow = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId('viewOutput')
                            .setLabel('View Output')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true) // Disable the button
                    );
                
                    await reply.edit({ components: [disabledRow] });
                });                
            } else {
                const embed = new EmbedBuilder()
                    .setColor(Colors.Green)
                    .setTitle('Evaluation Result')
                    .setDescription(`${inputEmoji} **Input:**\n\`\`\`${input}\`\`\`\n${outputEmoji} **Output:**\n\`\`\`${output} \`\`\``);
                
                await message.reply({ embeds: [embed] });
            }
        } catch (error) {
            const errorEmoji = ':warning:';

            const embed = new EmbedBuilder()
                .setColor(Colors.Red)
                .setTitle('Evaluation Error')
                .setDescription(`${errorEmoji} **Error:**\n\`\`\`${error} \`\`\``);
            await message.reply({ embeds: [embed] });
        }
    }
};
