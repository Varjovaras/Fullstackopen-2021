import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry } from '../utils';
import { newEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry: newEntry = toNewEntry(req.body);
    const patientId = req.params.id;
    const addedEntry = patientService.addEntry(newEntry, patientId);
    res.json(addedEntry);
  } catch (error: unknown) {
    res.status(400).send(error);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  console.log(patient);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;
