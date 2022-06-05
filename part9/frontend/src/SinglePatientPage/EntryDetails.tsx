import { Entry } from '../types';
import HealthCheck from './HealthCheck';
import HospitalEntry from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry />;
    case 'OccupationalHealthcare':
      return <OccupationalEntry employerName={entry.employerName} />;
    case 'HealthCheck':
      return <HealthCheck />;
    default:
      assertNever(entry);
      return <></>;
  }
};

export default EntryDetails;
