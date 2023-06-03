"use client"
import { useEffect, useState } from 'react'
import { retrievePatientData, PatientData } from './services/patientData';
import PCDModel from './components/pcdModel';

export default function Home() {
  const [patientData, setPatientData] = useState<PatientData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [isNextPage, setNextPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { patientData, nextPage } = await retrievePatientData(page);
        setPatientData(patientData);
        setNextPage(nextPage ? true : false);
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page])

  const renderPatientTable = () => {
    const columns = ['First Name', 'Last Name', 'Age', 'Gender', 'Video Status', 'Predicition Status']
    return (
      <>
        <p>Page:{page}</p>
        <table className=''>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} className="pr-5">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patientData?.map((patient: PatientData) => (
              <tr key={patient.id} className='hover:bg-gray-100 p-5'>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.videoUploadStatus}</td>
                <td>{patient.scoliosisPredictionStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isNextPage && <button className="" onClick={() => setPage(page + 1)}>Next Page</button>}
        {(page > 1) && <button className="" onClick={() => setPage(page - 1)}>Previous Page</button>}
      </>
    )
  }

  return (
    <div className='flex flex-col w-100 items-center'>
      <h3 className='text-lg font-bold my-2'>All Patients</h3>
      {loading && <p>Loading patient data</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {patientData && renderPatientTable()}
      <PCDModel width={300} height={300} />
    </div>
  )
}