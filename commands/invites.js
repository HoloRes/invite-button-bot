module.exports = {
    data:{
        name: 'invites', // command name
        description: "-",
        devOnly: true // restricts normal users to use this command
    },
    execute: async (client, message, args) => {
        const webhookId = "" // Add the id for the webhook here.
        const webhookToken = "" // Add the token for the webhook here.

        const { WebhookClient , MessageEmbed, MessageActionRow, MessageButton } = require("discord.js") 
        const invites = new WebhookClient({
            id: webhookId,
            token: webhookToken
        })

        const invites = require('./invites.json')
        
    }
}