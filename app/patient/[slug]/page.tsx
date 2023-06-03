"use client"
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getPatientById, PatientData } from '../../services/patientData';
import PCDModel from '../../components/pcdModel';
import { PageProps } from '../../../.next/types/app/page';

export default function PatientPage({ params }: PageProps) {
    const { slug } = params
    const [refreshingData, setRefreshingData] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [patient, setPatient] = useState<PatientData | null>(null);

    const refreshPatientData = async (id: number) => {
        try {
            setErrorMessage(null);
            setRefreshingData(true);
            let data = await getPatientById(id);
            if (data && patient) {
                patient.videoUploadStatus = 'completed';
                patient.scoliosisPredictionStatus = 'completed';
                patient.pointCloudDataURL = data.pointCloudDataURL;
            }
        } catch (error: any) {
            console.error(error)
            setErrorMessage(error.message)
        }
        finally {
            setRefreshingData(false);
        }
    }

    const fetchPatientData = async (id: number) => {
        try {
            setErrorMessage(null);
            let data = await getPatientById(id);
            if (data) {
                setPatient(data);
            }
        } catch (error: any) {
            console.error(error)
            setErrorMessage(error.message)
        }
    };

    useEffect(() => {
        if (slug) {
            fetchPatientData(slug);
        }
    }, [slug]);

    return (
        <div className="container mx-10 max-w-2xl">
            <button
                className="text-indigo-600 font-bold rounded text-sm mb-4"
                onClick={() => window.history.back()}
            >
                View All Patients
            </button>
            {errorMessage && <h1 className="text-red-500 mb-4 text-lg">There was an error trying to retrieve this patients data: {errorMessage}</h1>}
            {patient ? <h1 className="text-2xl font-bold mb-4">{patient.firstName} {patient.lastName}</h1> : <Skeleton />}
            <button
                className="text-indigo-600 font-bold rounded text-sm mb-4 disabled:opacity-50"
                onClick={() => refreshPatientData(slug)}
                disabled={refreshingData}
            >
                {refreshingData ? 'Fetching Patient Data...' : 'Refresh Patient Data'}
            </button>
            <div>
                <div>
                    {patient ? <h3 className="font-bold h-10 text-md capitalize">Age: {patient.age}</h3> : <Skeleton />}
                    {patient ? <h3 className="font-bold h-10 text-md capitalize">Gender: {patient.gender}</h3> : <Skeleton />}
                    {(patient && !refreshingData) ? <h3 className="font-bold h-10 text-md capitalize">Video Upload Status: {patient.videoUploadStatus}</h3> : <Skeleton />}
                    {(patient && !refreshingData) ? <h3 className="font-bold h-10 text-md capitalize">Scoliosis Prediction Status: {patient.scoliosisPredictionStatus}</h3> : <Skeleton />}
                </div>
                <div>
                    <h2 className='font-bold text-2xl mt-4 mb-1'>Patient 3D Model</h2>
                    <p className='mb-4'>This model was generated based on the patients point cloud data. You can interact with it below.</p>
                    {(patient && !refreshingData) ? <PCDModel width={500} height={500} /> : <Skeleton height={500} width={500} />}
                </div>
            </div>
        </div>
    );
}