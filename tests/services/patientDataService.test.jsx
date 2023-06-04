import { retrieveAllPatientData, getPatientById } from '../../app/services/patientData';
import PATIENT_DATA from '../../app/mockData/patientData.json';

describe('Patient Data Service', () => {
    it('retrieveAllPatientData should return all data', async () => {
        const response = await retrieveAllPatientData();
        expect(response).toEqual(PATIENT_DATA);
    });

    it('getPatientById should return patient data for the provided id', async () => {
        const response = await getPatientById(1);
        expect(response).toEqual(PATIENT_DATA.find(patient => patient.id == 1));
    });
});
