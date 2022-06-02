import { NewPatientEntry, Gender, Entry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: Entry[];
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: PatientFields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: entries,
  };

  return newEntry;
};

// type EntryFields = {
//   description: unknown;
//   date: unknown;
//   specialist: unknown;
// };

export const toNewEntry = (object: any) => {
  if (!object.description || !object.specialist || !object.date) {
    throw new Error('Incorrect or missing entry');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  } else return object;
};

// export const toNewEntry = ({
//   description,
//   date,
//   specialist,
// }: EntryFields): newEntry => {
//   const newEntry: newEntry = {
//     description: parseDescription(description),
//     date: parseDate(date),
//     specialist: parseSpecialist(specialist),
//   };

//   return newEntry;
// };

// const parseDescription = (description: unknown): string => {
//   if (!description || !isString(description)) {
//     throw new Error('Missing description');
//   }
//   return description;
// };

// const parseSpecialist = (specialist: unknown): string => {
//   if (!specialist || !isString(specialist)) {
//     throw new Error('Missing specialist');
//   }
//   return specialist;
// };

// const isType = (type: unknown): type is Entry => {
//   if (
//     type === 'Hospital' ||
//     type === 'OccupationalHealthcare' ||
//     type === 'HealthCheck'
//   ) {
//     return true;
//   }
//   return false;
// };

export default toNewPatientEntry;
