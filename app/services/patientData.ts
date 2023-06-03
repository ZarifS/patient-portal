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
    patientData: PatientData[], 
    nextPage: number | null,
    prevPage?: number | null,
}
    
// Mock an asynchronous API call to retrieve patient data
export const retrievePatientData = (page = 1) => {
    // Mimic pagination
    let startIndex = (page - 1) * 10;
    let endIndex = startIndex + 10;
    // Slice the data to return only 10 patients at a time
    let patientData = PATIENT_DATA.slice(startIndex, endIndex) as PatientData[];
    let nextPage = PATIENT_DATA.length > endIndex ? page + 1 : null;
    // Mock an asynchronous API call
    return new Promise<PatientDataResponse>((resolve, reject) => {
        // setTimeout(() => {
        //     resolve(patientData);
        // }, 1500);
        resolve({patientData, nextPage: nextPage, prevPage: page > 1 ? page - 1 : null});
    }
    );
}