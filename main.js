//Initial basic code for cross posting messages between 2 discord channels

const fs = require('fs'); //file system module
let config = { }

// Check if config.json exists
if (fs.existsSync('./config.json')) {
    config = require('./config.json');
}

// Get token from environment variable
const token = process.env.TOKEN ?? config.token;
const sourceChannelId = process.env.SOURCE_CHANNEL_ID ?? config.sourceChannelId;
const targetChannelId = process.env.TARGET_CHANNEL_ID ?? config.targetChannelId;
const errorLog = process.env.ERROR_LOG ?? config.errorLog ?? './logFile.log';

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [ 
                                GatewayIntentBits.DirectMessages,
                                GatewayIntentBits.Guilds,
                                GatewayIntentBits.GuildMessages,
                                GatewayIntentBits.MessageContent,] });


logMessage(`discord.js version:  ${require("discord.js").version}`);

client.on('ready', () => {
    logMessage(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', (message) => {

    try {

        if (message.author.bot) return; // Ignore messages from bots

        let targetChannel;

        if (message.channel.id === sourceChannelId) {
            targetChannel = client.channels.cache.get(targetChannelId);
        } else if (message.channel.id === targetChannelId) {
            targetChannel = client.channels.cache.get(sourceChannelId);
        } else {
            return; // Ignore messages from other channels
        }
                    
        targetChannel = targetChannelId;
        targetChannel.send(`${message.author.username}: ${message.content}`);

    }catch (error) { //handle unknown errors
        logMessage(error);
    }
});
        
client.login('token')
        .then(() => {
            logMessage('Bot logged in successfully');
        })
        .catch(error => {
            logMessage(`client.login: ${error}`);
        });

        
//writes the specified msg to a log file (default), or to console depending on config
function logMessage(msg) {
    const timestamp = new Date().toISOString();
    const message = `${timestamp} - ${msg}\n`;

    if (errorLog == 'stderr') {
        console.error(message);
    } else if (errorLog == 'stdout') {
        console.log(message);
    } else {
        fs.appendFile(errorLog, message, (err) => {
            if (err) {
                console.error(`Failed to write error to log file: ${err}`);
            }
        });
    }
}

//only used if bot is run from console
//This kills the process by hitting Enter in the cmd window
process.stdin.on('data', (data) => {
    const input = data.toString().trim();
  
    if (input === '') {
        process.exit(0);    
    }
});
