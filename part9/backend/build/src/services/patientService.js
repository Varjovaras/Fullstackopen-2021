"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_1.default;
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const getSensitivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (entry) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const idString = (0, uuid_1.v4)();
    const newPatientEntry = Object.assign({ id: idString }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const findById = (id) => {
    return patients_1.default.find((d) => d.id === id);
};
exports.default = {
    getEntries,
    addPatient,
    getSensitivePatients,
    findById,
};
