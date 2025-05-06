const Trainee = require('../models/traineeModel');

exports.getAllTrainees = (req, res) => {
  Trainee.getAllTrainees((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getTraineeById = (req, res) => {
  Trainee.getTraineeById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

exports.createTrainee = (req, res) => {
  Trainee.createTrainee(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.updateTrainee = (req, res) => {
  Trainee.updateTrainee(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: req.params.id, ...req.body });
  });
};

exports.deleteTrainee = (req, res) => {
  Trainee.deleteTrainee(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(204).send();
  });
};
