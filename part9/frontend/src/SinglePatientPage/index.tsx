import { useState } from 'react';
import { addEntry, useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Diagnosis, Entry } from '../types';
import EntryDetails from './EntryDetails';
import { Box, Button } from '@material-ui/core';
import { FormValues } from '../AddEntryModal/AddEntryForm';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import AddEntryModal from '../AddEntryModal';

type Props = {
  diagnoses: Diagnosis[];
};

const SinglePatientPage = ({ diagnoses }: Props) => {
  const [, dispatch] = useStateValue();
  const { id } = useParams();
  const [{ patients }] = useStateValue();
  const patient = Object.values(patients).find((patient) => patient.id === id);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const findDiagnoseName = (code: string) => {
    const diagnoseName = diagnoses.find((element) => element.code === code);
    return diagnoseName?.name;
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: FormValues) => {
    try {
      if (patient) {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          values
        );
        console.log(newEntry);
        dispatch(addEntry(patient.id, newEntry));

        closeModal();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
      }
    }
  };

  return (
    <div>
      <h1>
        {patient?.name}{' '}
        {patient?.gender === 'male' ? (
          <MaleIcon />
        ) : patient?.gender === 'female' ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h1>
      <p>ssn {patient?.ssn}</p>
      <p>occupation {patient?.occupation}</p>
      <h3>Entries</h3>
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        diagnoses={diagnoses}
      />
      <>
        {patient?.entries?.map((entry) => (
          <Box
            sx={{
              my: 2,
              border: 'solid',
              borderRadius: '1em',
              p: 2,
            }}
            position="left"
            key={entry.id}
          >
            <div>
              {entry.date} <EntryDetails entry={entry} />{' '}
            </div>
            <div>{entry.description} </div>
            <div> {}</div>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {findDiagnoseName(code)}
              </li>
            ))}
            <> diagnosed by {entry.specialist}</>
          </Box>
        ))}
      </>
    </div>
  );
};

export default SinglePatientPage;
