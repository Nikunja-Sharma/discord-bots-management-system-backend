const { startBot, stopBot, getActiveBots } = require('../bots/botInstances');
const Bot = require('../models/Bot');

// Start a new bot and store its info in the DB if not already present
const startNewBot = async (req, res) => {
  const { token } = req.body;

  try {
    // Start the bot and store info if it's a new bot
    await startBot(token);

    // Retrieve the bot details from the database
    const botDetails = await Bot.findOne({ token });

    if (botDetails) {
      res.status(201).json({
        message: 'Bot started successfully.',
        botDetails: {
          botName: botDetails.botName,
          botAvatar: botDetails.botAvatar,
          botId: botDetails.botId,
          botTag: botDetails.botTag,
        },
      });
    } else {
      res.status(404).json({ error: 'Bot details not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to start bot.' });
  }
};

// List all active bots
const listActiveBots = async (req, res) => {
  try {
    const activeBots = getActiveBots();
    const detailedActiveBots = await Promise.all(activeBots.map(async (token) => {
      const botDetails = await Bot.findOne({ token });
      return {
        token,
        botName: botDetails.botName,
        botAvatar: botDetails.botAvatar,
        botId: botDetails.botId,
        botTag: botDetails.botTag,
      };
    }));
    res.status(200).json({ activeBots: detailedActiveBots });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve active bots.' });
  }
};
// Stop an existing bot
const stopExistingBot = async (req, res) => {
  const { token } = req.body;

  try {
    // Stop the bot using its token
    stopBot(token);
    res.status(200).json({ message: 'Bot stopped successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to stop bot.' });
  }
};

// Get all bots' details from the database
const getAllBots = async (req, res) => {
    try {
      const bots = await Bot.find({});
      res.status(200).json(bots);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve bots.' });
    }
  };

module.exports = {
  startNewBot,      // Ensure this is defined correctly
  stopExistingBot,
  listActiveBots,
  getAllBots,
};
