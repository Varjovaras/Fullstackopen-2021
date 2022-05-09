interface ExerciseCalculator {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const args = process.argv.slice(3);
const exerciseTarget = Number(args[3]);
const numArgs = args.map((arg) => {
  return Number(arg);
});

const calculateExercises = (hours: number[], exerciseTarget: number) => {
  const days = hours.length;
  let trainingDays = 0;
  let success = false;
  const target = exerciseTarget;
  const average = hours.reduce((a, b) => a + b, 0) / days;
  let ratingDescription = '';
  let rating = 0;

  for (const day of hours) {
    if (day !== 0) {
      trainingDays++;
    }
  }

  if (average > target) {
    success = true;
    ratingDescription = 'You did great!';
    rating = 3;
  } else if (average < 1) {
    ratingDescription = 'You should try harder';
    rating = 1;
  } else {
    ratingDescription = 'Almost at the goal!';
    rating = 2;
  }

  const calculator: ExerciseCalculator = {
    periodLength: days,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };

  return calculator;
};

console.log(calculateExercises(numArgs, exerciseTarget));

export default calculateExercises;
