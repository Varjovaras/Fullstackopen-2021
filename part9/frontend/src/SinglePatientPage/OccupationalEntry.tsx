import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

interface Props {
  employerName: string | undefined;
}

const OccupationalEntry = (employerName: Props) => {
  return (
    <>
      <WorkOutlineIcon /> <i>{employerName.employerName}</i>
    </>
  );
};

export default OccupationalEntry;
