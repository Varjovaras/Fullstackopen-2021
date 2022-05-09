import patients from '../../data/patients';
import { Patient, SensitivePatient } from '../types';

const getEntries = (): Array<Patient> => {
  return patients;
};

const getSensitivePatients = (): SensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = () => {
  return null;
};

const findById = (id: string): SensitivePatient | undefined => {
  return patients.find((d) => d.id === id);
};

export default {
  getEntries,
  addPatient,
  getSensitivePatients,
  findById,
};
