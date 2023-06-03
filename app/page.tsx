"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { retrieveAllPatientData, PatientData } from './services/patientData';

export default function Home() {
  const [allPatientData, setAllPatientData] = useState<PatientData[] | null>(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setErrorMessage(null);
      setAllPatientData(null);
      try {
        const data = await retrieveAllPatientData();
        setAllPatientData(data);
      } catch (error: any) {
        console.log(error)
        setErrorMessage(error.message);
      }
    };
    fetchData();
  }, [])


  return (
    <div className='flex flex-col mx-10'>
      <div className='max-w-4xl mb-5'>
        <h3 className='text-lg font-bold mb-1'>Current Patients</h3>
        <p>You can view the list of patients registered to you below. Clicking on any patient will allow you to see more information as well as 3D modelling information.
        </p>
      </div>
      {errorMessage && <h1 className="text-red-500 mb-4 text-lg">There was an error trying to retrieve your data: {errorMessage}</h1>}
      {/* {patientData ? <RenderPatientTable /> : <Skeleton count={20} height={30} />} */}
      {allPatientData ? <RenderDataTable data={allPatientData} /> : (
        <>
          <Skeleton count={3} height={25} width={300} />
          <Skeleton count={20} height={30} />
        </>
      )}
    </div>
  )
}

// Renders the data for patients given an array of patient data and handles search, filter, and pagination
const RenderDataTable = ({ data }: { data: PatientData[] }) => {
  // state for search, filter, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [sortBy, setSortBy] = useState<'firstName' | 'lastName' | 'age' | 'id'>('id');

  const router = useRouter();

  const columns = ['ID', 'First Name', 'Last Name', 'Age', 'Gender', 'Video Status', 'Predicition Status']

  // function to handle search input changes
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // function to handle filter input changes
  const handleFilterChange = (event: any) => {
    setFilterGender(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // function to handle soryBy input changes
  const handleSortChange = (event: any) => {
    setSortBy(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  }

  const matchesName = (patient: PatientData) => patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || patient.lastName.toLowerCase().includes(searchTerm.toLowerCase())

  // in-memory filtering
  const filteredData = data
    .filter((patient: PatientData) => {
      return (
        matchesName(patient) &&
        (filterGender === "" || patient.gender === filterGender)
      );
    })
    .sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);

  // in-memory pagination
  // get data for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // calculate number of pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className='flex flex-col max-w-md'>
        <input type="text" placeholder="Search by name" className='bg-gray-100 text-sm p-2.5' onChange={handleSearchChange} />
        <div className='mb-2 mt-2'>
          <select id='sorting' className='bg-gray-100 text-gray-900 text-sm p-2.5 mr-2' onChange={handleSortChange}>
            <option value="id" selected >Sorting by ID</option>
            <option value="firstName">Sorting by First Name</option>
            <option value="lastName">Sorting by Last Name</option>
            <option value="age">Sorting by Age</option>
          </select>
          <select id='filterBy_gender' onChange={handleFilterChange} className='bg-gray-100 text-gray-900 text-sm p-2.5'>
            <option value="" selected>Filter by gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <table>
        <thead className='mb-2'>
          <tr>
            {columns.map((column) => (
              <th key={column} className="pr-5 text-left pb-2">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((patient: PatientData,) => (
            <tr key={patient.id} className='hover:bg-indigo-100 pr-5 h-10 cursor-pointer even:bg-gray-100 capitalize' onClick={() => router.push(`/patient/${patient.id}`)}>
              <td>{patient.id}</td>
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
      <div className='flex justify-start my-1.5'>
        <p className='font-bold text-sm'>Page: {currentPage}/{pageNumbers.length}</p>
      </div>
      <div className='flex justify-start my-1'>
        {(currentPage > 1) && <button className="h-8 px-4 mr-2 bg-gray-300 hover:bg-gray-400" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>}
        {currentPage < pageNumbers.length && <button className="h-8 px-4 text-white bg-indigo-700 hover:bg-indigo-800" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>}
      </div>
    </>
  );
};