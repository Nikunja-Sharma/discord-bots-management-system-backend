const { Client, GatewayIntentBits } = require('discord.js');
const Bot = require('../models/Bot');

const botInstances = {};

const startBot = async (token) => {
  if (!botInstances[token]) {
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

    client.once('ready', async () => {
      console.log(`Logged in as ${client.user.tag}`);

      // Check if bot info is already in the database
      const existingBot = await Bot.findOne({ token });
      if (!existingBot) {
        // Store bot information in the database
        const botData = {
          token: token,
          botName: client.user.username,
          botAvatar: client.user.displayAvatarURL(),
          botId: client.user.id,
          botTag: client.user.tag, // Store client.user.tag (username#discriminator)
        };

        const newBot = new Bot(botData);
        await newBot.save();

        console.log(`Bot info saved to database: ${client.user.tag}`);
      }
    });

    client.on('messageCreate', (message) => {
      if (message.content === '!ping') {
        message.reply('Pong!');
      }
    });

    try {
      await client.login(token);
      botInstances[token] = client;
    } catch (error) {
      console.error(`Failed to login bot with token: ${token}`);
      if (error.code === 'TokenInvalid') {
        console.error('Invalid token provided.');
      } else {
        console.error(`Unexpected error: ${error.message}`);
      }
    }
  }
};

const stopBot = (token) => {
  if (botInstances[token]) {
    botInstances[token].destroy();
    delete botInstances[token];
    console.log(`Bot with token ${token} stopped.`);
  }
};

const getActiveBots = () => {
  return Object.keys(botInstances);
};

module.exports = {
  startBot,
  stopBot,
  getActiveBots,
};
