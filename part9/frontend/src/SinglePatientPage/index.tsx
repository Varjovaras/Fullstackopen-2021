import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Diagnosis } from '../types';

type Props = {
  diagnoses: Diagnosis[];
};

const SinglePatientPage = (diagnoses: Props) => {
  const { id } = useParams();
  const [{ patients }] = useStateValue();
  const patient = Object.values(patients).find((patient) => patient.id === id);

  const findDiagnoseName = (code: string) => {
    const diagnoseName = diagnoses.diagnoses.find(
      (element) => element.code === code
    );
    return diagnoseName?.name;
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
      <div>
        {patient?.entries?.map((entry) => (
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code} {findDiagnoseName(code)}{' '}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePatientPage;
