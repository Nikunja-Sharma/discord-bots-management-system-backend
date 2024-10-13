const express = require('express');
const router = express.Router();
const { startNewBot, stopExistingBot, listActiveBots, getAllBots } = require('../controllers/botController');

router.post('/start', startNewBot);
router.post('/stop', stopExistingBot);
router.get('/list', listActiveBots);
router.get('/all', getAllBots);
module.exports = router;
