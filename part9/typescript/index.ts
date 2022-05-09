/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
// import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi/', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight) {
    return res.status(400).json({ error: 'Malformatted parameters' });
  } else {
    const result = calculateBmi(height, weight);
    return res.status(200).send(result);
  }
});

app.post('/exercises/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const daily_exercises = req.body.daily_exercises;
  const target = Number(req.body.target);

  if (!daily_exercises || !target) {
    if (isNaN(target)) {
      return res.status(400).json({ error: 'Malformatted parameters' });
    }
    return res.status(400).json({ error: 'Missing parameters' });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    return res.status(200).send(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
