const config = require('./config.json')
module.exports = async (client, message) => {
    const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

    const dismisRow = new MessageActionRow().addComponents(
        new MessageButton()
			.setCustomId('dismiss')
			.setLabel('Dismiss')
			.setStyle('DANGER')
    )
    const commandErrorEmbed = new MessageEmbed()
                                    .setColor('#0099ff')
                                    .setDescription("The command to be executed was not found, Make sure you have entered the correct command name or give the suggestion below a try!\n\tSuggestion: \`[work in progress]\`")
                                    .setFooter(message.author.username, message.author.avatarURL())
                                    .setTimestamp()

    if(message.author.bot) return undefined
    const prefix = config.others.prefixes.find(p => message.content.startsWith(p))
        if(!message.content.startsWith(prefix)) return undefined
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift(prefix.length)?.toLowerCase()
        if(!cmd) return undefined
    const command = client.commands.get(cmd) ?? client.commands.find(c => c.data.name.replace(/-/g, "") === cmd.replace(/-/g, "") || (c.data.aliases && c.data.aliases.some(alias => alias.replace(/-/g, "") === cmd.replace(/-/g, ""))))
        if(!command) return message.channel.send({ 
            content: `**[Command not found]**: Command with name \`${client.functions.cutChars(cmd, 20)}\` not found.`,
            embeds: [commandErrorEmbed],
            components: [dismisRow]
        })
            const devOnlyErrorEmbed = new MessageEmbed()
                                        .setColor('#FF005C')
                                        .setDescription("This command is restricted to devlopers only.\n\nPermissions required: Developer[MISSING]")
                                        .setFooter(message.author.username, message.author.avatarURL())
                                        .setTimestamp()
        if(command.data.devOnly === true) {
            if(!config.others.devs.includes(message.author.id)) {
                message.channel.send({
                    content: `**[Failed Executing Command]**: Failed executing command with name -> \`${command.data.name}\``,
                    embeds: [devOnlyErrorEmbed],
                    components: [dismisRow]
                })
                const trigger = false
                if(trigger === false) return undefined
            }
        }
    command.execute(client , message , args)
}