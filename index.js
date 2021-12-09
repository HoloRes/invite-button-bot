const Discord = require("discord.js")

const config = require("./config.json")

const client = new Discord.Client({
    intents: config.discord.intents,
    partials: config.discord.partials
})

client.functions = {
    noop: function noop(){
        null
    },
    wait: function wait(time){
        new Promise(resolve => setTimeout(resolve,time))
    },
    deleteIn: function deleteIn(time, messageId) {
        return new Promise(resolve => setTimeout(resolve, time)).then(() => message.channel.messages.fetch(messageId).then(m =>m.delete()).catch(() => null)) 
    },
    cutChars: function cutChars(input, limit) {
        return input.length > limit ? `${input.slice(0, limit)}... ${input.slice(limit).length} chars more` : input 
    }
}

const fs = require('fs')
client.commands = new Discord.Collection()
const cmdFiles = fs.readdirSync('./commands/')
    for(const file of cmdFiles){
        const command = require(`./commands/${file}`)
        client.commands.set(command.data.name, command)
    }
const cmdParser = require("./commandParser.js")


client.on("ready", () => {
    console.log(`Ready on client ${client.user.tag}!`)
    client.commands.map(cmd => console.log(`Loaded command with name ${cmd.data.name}`))
})


client.on("messageCreate", (message) => {
    cmdParser(client, message)
})

client.login(config.tokens.bot)