/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import {
  Patient,
  PublicPatient,
  NewPatientEntry,
  Entry,
  newEntry,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): Array<Patient> => {
  return patients;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const getSensitivePatients = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
      ssn,
    })
  );
};

const addPatient = (entry: NewPatientEntry): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const idString: string = uuidv4();

  const newPatientEntry = {
    id: idString,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: newEntry, patientId: string): Entry => {
  const id: string = uuidv4();
  const newEntry = { ...entry, id };
  const patient = findById(patientId);
  if (patient) {
    patient.entries.push(newEntry);
  }
  return newEntry;
};

const findById = (id: string): PublicPatient | undefined => {
  return patients.find((d) => d.id === id);
};

export default {
  getEntries,
  addPatient,
  getSensitivePatients,
  findById,
  addEntry,
};
