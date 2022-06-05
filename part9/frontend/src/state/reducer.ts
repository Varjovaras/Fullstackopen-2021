import { State } from './state';
import { Entry, Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_ENTRY';
      payload: Entry;
      id: string;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };

    case 'ADD_ENTRY':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.id]: {
            ...state.patients[action.id],
            entries: [...state.patients[action.id].entries, action.payload],
          },
        },
      };

    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList,
  };
};

export const addEntry = (patientId: string, newEntry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: newEntry,
    id: patientId,
  };
};
