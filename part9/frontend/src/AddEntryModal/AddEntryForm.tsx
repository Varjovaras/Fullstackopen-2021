import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';

import { TextField, DiagnosisSelection, SelectField } from './FormField';
import { Diagnosis, Entry } from '../types';

export type FormValues = Omit<Entry, 'id' | 'entries'>;

interface Props {
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[];
}

export type EntryOption = {
  value: string;
  label: string;
};

const entryOptions: EntryOption[] = [
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'OccupationalHealthcare' },
  { value: 'HealthCheck', label: 'HealthCheck' },
];

export const AddEntryForm = ({ onSubmit, onCancel, diagnoses }: Props) => {
  console.log(diagnoses);
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        type: 'Hospital',
      }}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="idiot"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <SelectField label="Type" name="type" options={entryOptions} />

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
