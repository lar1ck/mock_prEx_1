const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradesController');

router.get('/', tradeController.getAllTrades);
router.get('/:id', tradeController.getTradeById);
router.post('/', tradeController.createTrade);
router.put('/:id', tradeController.updateTrade);
router.delete('/:id', tradeController.deleteTrade);

module.exports = router;
