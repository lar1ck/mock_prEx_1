const db = require('../config/db');

exports.getAllTrades = callback => {
  db.query('SELECT * FROM Trades', callback);
};

exports.getTradeById = (id, callback) => {
  db.query('SELECT * FROM Trades WHERE Trade_Id = ?', [id], callback);
};

exports.createTrade = (trade, callback) => {
  db.query('INSERT INTO Trades SET ?', trade, callback);
};

exports.updateTrade = (id, trade, callback) => {
  db.query('UPDATE Trades SET ? WHERE Trade_Id = ?', [trade, id], callback);
};

exports.deleteTrade = (id, callback) => {
  db.query('DELETE FROM Trades WHERE Trade_Id = ?', [id], callback);
};
