"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { retrievePatientData, PatientData } from './services/patientData';
import PCDModel from './components/pcdModel';

export default function Home() {
  const [patientData, setPatientData] = useState<PatientData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [isNextPage, setNextPage] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { patientData, nextPage, maxPages } = await retrievePatientData(page);
        setPatientData(patientData);
        setNextPage(nextPage ? true : false);
        setMaxPages(maxPages);
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page])

  const RenderPatientTable = () => {
    const columns = ['ID', 'First Name', 'Last Name', 'Age', 'Gender', 'Video Status', 'Predicition Status']
    return (
      <>
        <table>
          <thead className='mb-2'>
            <tr>
              {columns.map((column) => (
                <th key={column} className="pr-5 text-left pb-2">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patientData?.map((patient: PatientData) => (
              <>
                <tr key={patient.id} className='hover:bg-indigo-100 pr-5 h-10 cursor-pointer even:bg-gray-100' onClick={() => router.push(`/patient/${patient.id}`)}>
                  <td>{patient.id}</td>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.videoUploadStatus}</td>
                  <td>{patient.scoliosisPredictionStatus}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <div className='flex justify-start my-1.5'>
          <p className='font-bold text-sm'>Page: {page}/{maxPages}</p>
        </div>
        <div className='flex justify-start my-1'>
          {(page > 1) && <button className="h-8 px-4 mr-2 bg-gray-300 hover:bg-gray-400" onClick={() => setPage(page - 1)}>Previous</button>}
          {isNextPage && <button className="h-8 px-4 text-white bg-indigo-700 hover:bg-indigo-800" onClick={() => setPage(page + 1)}>Next</button>}
        </div>
      </>
    )
  }

  return (
    <div className='flex flex-col mx-10'>
      <div className='max-w-4xl mb-5'>
        <h3 className='text-lg font-bold mb-1'>Current Patients</h3>
        <p>You can view the list of patients registered to you below.
          Clicking on any patient will allow you to see more information as well as 3D modelling information.
        </p>
      </div>
      {loading && <p>Loading patient data</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {patientData && <RenderPatientTable />}
    </div>
  )
}