const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise');

// Create Exercise entry
router.post('/add', async (req, res) => {
  try {
    const { name, calories } = req.body;
    const newExercise = new Exercise({ name, calories });
    const savedExercise = await newExercise.save();
    res.json(savedExercise);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// Get all Exercise entries
router.get('/all', async (req, res) => {
  try {
    const Exercises = await Exercise.find();
    res.json(Exercises);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
      if (!deletedExercise) {
        return res.status(404).json({ message: 'Exercise entry not found' });
      }
      res.json({ message: 'Exercise entry deleted successfully', deletedExercise });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
