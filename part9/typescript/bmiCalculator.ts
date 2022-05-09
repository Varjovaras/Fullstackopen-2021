const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi > 18.5 && bmi < 25) {
    return 'Normal (Healthy weight)';
  } else if (bmi < 18.5) {
    return 'Underweight';
  } else return 'Overweight';
};

console.log(calculateBmi(height, weight));

export default calculateBmi;
