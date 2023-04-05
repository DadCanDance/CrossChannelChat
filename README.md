# CrossChannelChat
Simple discord bot to cross-post messages from one Discord channel to another


Follow these steps to install PM2 and set up Discord bot as a service:

1. Install PM2 globally:
$ npm install -g pm2

2.Navigate to Discord bot's directory using the command prompt.

3. Start the bot script with PM2:
$ pm2 start main.js --name "CrossChannelChat"

4. The bot is now running as a service managed by PM2. To check the status of the bot, use the following command:
$ pm2 status

5. Save the current process list to be started automatically on boot:
$ pm2 save

The Discord bot is now running as a service using PM2 and will restart automatically if it crashes or if the system reboots.