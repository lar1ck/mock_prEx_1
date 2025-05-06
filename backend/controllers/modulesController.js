const Module = require('../models/moduleModel');

exports.getAllModules = (req, res) => {
  Module.getAllModules((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getModuleById = (req, res) => {
  Module.getModuleById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

exports.createModule = (req, res) => {
  Module.createModule(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.updateModule = (req, res) => {
  Module.updateModule(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: req.params.id, ...req.body });
  });
};

exports.deleteModule = (req, res) => {
  Module.deleteModule(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(204).send();
  });
};
