interface Props {
  name: string;
  exerciseCount: number;
}

const Total = ({ courseParts }: { courseParts: Props[] }) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
