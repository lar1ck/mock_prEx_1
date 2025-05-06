const Mark = require('../models/markModel');

exports.getAllMarks = (req, res) => {
  Mark.getAllMarks((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getMarkById = (req, res) => {
  Mark.getMarkById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

exports.createMark = (req, res) => {
  Mark.createMark(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.updateMark = (req, res) => {
  Mark.updateMark(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: req.params.id, ...req.body });
  });
};

exports.deleteMark = (req, res) => {
  Mark.deleteMark(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(204).send();
  });
};
