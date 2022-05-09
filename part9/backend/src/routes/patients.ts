import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getSensitivePatients());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  const { id, name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = diaryService.addDiary(
    date,
    weather,
    visibility,
    comment
  );
  res.json(newDiaryEntry);
});

//adding a new diary !!!!!!!!!!!
/*  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;*/

export default router;
