import PATIENT_DATA from '../mockData/patientData.json';

export interface PatientData {
    id: number,
    firstName: string;
    lastName: string;
    age: number;
    gender: "male" | "female",
    lastUpdated: string;
    videoUploadStatus: "in-progress" | "completed" | "not-started" | "failed";
    scoliosisPredictionStatus: "in-progress" | "completed" | "not-started" | "failed";
    pointCloudDataURL: string;
}

export interface PatientDataResponse {
    data: PatientData[], 
    nextPage: number | null,
    maxPages: number,
}

// Mock an asynchronous API call to retrieve patient data
export const retrieveAllPatientData = () => {
    // Mock an asynchronous API call
    return new Promise<PatientData[]>((resolve, reject) => {
        setTimeout(() => {
            const data = PATIENT_DATA as PatientData[];
            resolve(data);
            // reject(new Error('Failed to retrieve patient data as server is down.'))
        }, 500);
    }
    );
}

// Mock an asynchronous API call to retrieve patient data by id
export const getPatientById = (id: number) => {
    return new Promise<PatientData>((resolve, reject) => {
        return setTimeout(() => {
            const patient = PATIENT_DATA.find(patient => patient.id == id);
            if(!patient) reject('Patient not found, please try again.');
            resolve(patient as PatientData);
        }, 1500);
    });
}