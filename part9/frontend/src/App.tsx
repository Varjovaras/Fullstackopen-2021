import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@material-ui/core';

import { apiBaseUrl } from './constants';
import { setPatientList, useStateValue } from './state';
import { Patient, Diagnosis } from './types';

import PatientListPage from './PatientListPage';
import SinglePatientPage from './SinglePatientPage';

const App = () => {
  const [, dispatch] = useStateValue();
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>([
    {
      name: '',
      code: '',
      latin: '',
    },
  ]);
  console.log(diagnoses);

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    const fetchDiagnoses = async () => {
      try {
        await axios
          .get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
          .then((res) => setDiagnoses(res.data));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route
              path="/patients/id/:id"
              element={<SinglePatientPage diagnoses={diagnoses} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
