const db = require('../config/db');

exports.getAllModules = callback => {
  db.query('SELECT * FROM Modules', callback);
};

exports.getModuleById = (id, callback) => {
  db.query('SELECT * FROM Modules WHERE Module_Id = ?', [id], callback);
};

exports.createModule = (module, callback) => {
  db.query('INSERT INTO Modules SET ?', module, callback);
};

exports.updateModule = (id, module, callback) => {
  db.query('UPDATE Modules SET ? WHERE Module_Id = ?', [module, id], callback);
};

exports.deleteModule = (id, callback) => {
  db.query('DELETE FROM Modules WHERE Module_Id = ?', [id], callback);
};
