import CoursePart from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'submission':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>
            <i>{part.description}</i>
          </p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>
            <i>{part.description} </i>
          </p>
          <p>required skills: {part.requirements.map((p) => p).join(', ')}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
