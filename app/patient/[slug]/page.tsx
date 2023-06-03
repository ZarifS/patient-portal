"use client"
import { useEffect, useState } from 'react';
import { getPatientById, PatientData } from '../../services/patientData';
import PCDModel from '../../components/pcdModel';

export default function PatientPage({ params }: any) {
    const { slug } = params
    const [loading, setLoading] = useState(false);
    const [patient, setPatient] = useState<PatientData | null>(null);

    useEffect(() => {
        if (slug) {
            getPatientById(slug)
                .then(patientData => setPatient(patientData))
                .catch(error => console.error(error));
        }
    }, [slug]);

    if (!patient) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-10">
            <button
                className="text-indigo-600 font-bold rounded text-sm mb-4"
                onClick={() => window.history.back()}
            >
                View All Patients
            </button>
            <h1 className="text-2xl font-bold mb-4">{patient.firstName} {patient.lastName}</h1>
            <div className="grid grid-cols-2 gap-4 max-w-4xl">
                <div className="font-bold">Age:</div>
                <div>{patient.age}</div>
                <div className="font-bold">Gender:</div>
                <div>{patient.gender}</div>
                <div className="font-bold">Video Upload Status:</div>
                <div>{patient.videoUploadStatus}</div>
                <div className="font-bold">Scoliosis Prediction Status:</div>
                <div>{patient.scoliosisPredictionStatus}</div>
            </div>
            <PCDModel width={400} height={300} />
        </div>
    );
}