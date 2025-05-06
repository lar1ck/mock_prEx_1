const Trade = require('../models/tradeModel');

exports.getAllTrades = (req, res) => {
  Trade.getAllTrades((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getTradeById = (req, res) => {
  Trade.getTradeById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

exports.createTrade = (req, res) => {
  Trade.createTrade(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.updateTrade = (req, res) => {
  Trade.updateTrade(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: req.params.id, ...req.body });
  });
};

exports.deleteTrade = (req, res) => {
  Trade.deleteTrade(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(204).send();
  });
};
