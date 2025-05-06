const db = require('../config/db');

exports.getAllMarks = callback => {
  db.query('SELECT * FROM Marks', callback);
};

exports.getMarkById = (id, callback) => {
  db.query('SELECT * FROM Marks WHERE Mark_Id = ?', [id], callback);
};

exports.createMark = (mark, callback) => {
  db.query('INSERT INTO Marks SET ?', mark, callback);
};

exports.updateMark = (id, mark, callback) => {
  db.query('UPDATE Marks SET ? WHERE Mark_Id = ?', [mark, id], callback);
};

exports.deleteMark = (id, callback) => {
  db.query('DELETE FROM Marks WHERE Mark_Id = ?', [id], callback);
};
