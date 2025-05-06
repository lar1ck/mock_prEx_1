const db = require('../config/db');

exports.getAllTrainees = callback => {
  db.query('SELECT * FROM Trainees', callback);
};

exports.getTraineeById = (id, callback) => {
  db.query('SELECT * FROM Trainees WHERE Trainees_Id = ?', [id], callback);
};

exports.createTrainee = (trainee, callback) => {
  db.query('INSERT INTO Trainees SET ?', trainee, callback);
};

exports.updateTrainee = (id, trainee, callback) => {
  db.query('UPDATE Trainees SET ? WHERE Trainees_Id = ?', [trainee, id], callback);
};

exports.deleteTrainee = (id, callback) => {
  db.query('DELETE FROM Trainees WHERE Trainees_Id = ?', [id], callback);
};
