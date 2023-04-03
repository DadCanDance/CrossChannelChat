//Initial basic code for cross posting messages between 2 discord channels

const fs = require('fs'); //built in file system class
const config = require('./config.json');

const token = config.token;
const sourceChannelId = config.sourceChannelId;
const targetChannelId = config.targetChannelId;

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [ 
                                GatewayIntentBits.DirectMessages,
                                GatewayIntentBits.Guilds,
                                GatewayIntentBits.GuildBans,
                                GatewayIntentBits.GuildMessages,
                                GatewayIntentBits.MessageContent,] });


    console.log(`discord.js version:  ${require("discord.js").version}`);


    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });


    client.on('messageCreate', (message) => {

        if (message.author.bot) return; // Ignore messages from bots

        let targetChannel;

        if (message.channel.id === sourceChannelId) {
            targetChannel = client.channels.cache.get(targetChannelId);
        } else if (message.channel.id === targetChannelId) {
            targetChannel = client.channels.cache.get(sourceChannelId);
        } else {
            return; // Ignore messages from other channels
        }

        targetChannel.send(`${message.author.username}: ${message.content}`);

    });

    client.login(token);
    
    
//writes the specified error to a log file
//no longer used
function logMessage(error) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${error}\n`;
    fs.appendFile('error.log', logMessage, (err) => {
        if (err) {
            console.error(`Failed to write error to log file: ${err}`);
        }
    });
}


//This kills the process by hitting Enter in the cmd window
process.stdin.on('data', (data) => {
    const input = data.toString().trim();
  
    if (input === '') {
        process.exit(0);    
    }
});
