import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const SinglePatientPage = () => {
  const { id } = useParams();
  const [{ patients }] = useStateValue();
  const patient = Object.values(patients).find((patient) => patient.id === id);

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
    </div>
  );
};

export default SinglePatientPage;
